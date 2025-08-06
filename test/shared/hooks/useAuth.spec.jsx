import {
  render,
  screen,
  waitFor,
  fireEvent,
  cleanup,
} from "@testing-library/react";
import { describe, it, vi, beforeEach, expect, afterEach } from "vitest";
import { useAuth } from "../../../src/shared/hooks/useAuth";
import { AuthProvider } from "../../../src/shared/providers/AuthProvider.jsx";

let mockKeycloak;

vi.mock("keycloak-js", () => {
  return {
    default: vi.fn(() => {
      mockKeycloak = {
        init: vi.fn().mockImplementation(() => {
          setTimeout(() => {
            if (mockKeycloak.onAuthSuccess) {
              mockKeycloak.onAuthSuccess();
            }
          }, 0);
          return Promise.resolve(true);
        }),
        login: vi.fn(() => Promise.resolve()),
        logout: vi.fn(() => Promise.resolve()),
        register: vi.fn(() => Promise.resolve()),
        updateToken: vi.fn(() => Promise.resolve(true)),
        token: "mock-token",
        refreshToken: "mock-refresh-token",
        tokenParsed: {
          realm_access: { roles: ["CLIENT"] },
          exp: Math.floor(Date.now() / 1000) + 300,
        },
        refreshTokenParsed: { exp: Math.floor(Date.now() / 1000) + 300 },
        authenticated: true,
        onAuthSuccess: null,
        onAuthLogout: null,
      };
      return mockKeycloak;
    }),
  };
});

vi.mock("../../../src/shared/api/AuthApi", () => ({
  syncUser: vi.fn(() =>
    Promise.resolve({ id: "user-id", email: "test@example.com" })
  ),
}));

vi.mock("../../../src/shared/api/axios/AxiosConnection", () => ({
  setAuthToken: vi.fn(),
  setupAuthInterceptor: vi.fn(),
}));

beforeEach(() => {
  mockKeycloak = null;
  localStorage.clear();
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

const ConsumerComponent = () => {
  const { user, handleLogin, handleLogout } = useAuth();
  return (
    <>
      <span data-testid="user">{user?.email || "No user"}</span>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
};

describe("AuthProvider", () => {
  it("renders and loads user", async () => {
    render(
      <AuthProvider>
        <ConsumerComponent />
      </AuthProvider>
    );

    await waitFor(() =>
      expect(screen.getByTestId("user").textContent).toBe("test@example.com")
    );
  });

  it("calls login", async () => {
    render(
      <AuthProvider>
        <ConsumerComponent />
      </AuthProvider>
    );

    const btn = await screen.findByText("Login");
    fireEvent.click(btn);
    expect(mockKeycloak.login).toHaveBeenCalled();
  });

  it("calls logout and resets user", async () => {
    render(
      <AuthProvider>
        <ConsumerComponent />
      </AuthProvider>
    );

    await waitFor(() =>
      expect(screen.getByTestId("user").textContent).toBe("test@example.com")
    );

    const btn = await screen.findByText("Logout");
    fireEvent.click(btn);

    await waitFor(() =>
      expect(screen.getByTestId("user").textContent).toBe("No user")
    );
  });

  describe("updateSessionRoles", () => {
    let updateSessionRolesFn;

    const Consumer = () => {
      const { user, updateSessionRoles } = useAuth();
      updateSessionRolesFn = updateSessionRoles;
      return <span data-testid="user">{user?.email || "No user"}</span>;
    };

    it("updates roles correctly", async () => {
      render(
        <AuthProvider>
          <Consumer />
        </AuthProvider>
      );

      await waitFor(() =>
        expect(screen.getByTestId("user").textContent).toBe("test@example.com")
      );

      mockKeycloak.tokenParsed = {
        realm_access: { roles: ["FREELANCER"] },
        exp: Math.floor(Date.now() / 1000) + 300,
      };
      mockKeycloak.token = "new-token";
      await updateSessionRolesFn();

      expect(mockKeycloak.updateToken).toHaveBeenCalledWith(-1);
      expect(screen.getByTestId("user").textContent).toBe("test@example.com");
    });

    it("handles updateToken error", async () => {
      render(
        <AuthProvider>
          <Consumer />
        </AuthProvider>
      );

      await waitFor(() =>
        expect(screen.getByTestId("user").textContent).toBe("test@example.com")
      );

      mockKeycloak.updateToken.mockRejectedValueOnce(new Error("fail"));

      await updateSessionRolesFn();

      await waitFor(() =>
        expect(screen.getByTestId("user").textContent).toBe("test@example.com")
      );
    });
  });
});
