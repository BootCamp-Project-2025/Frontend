import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, it, vi, beforeEach, expect } from "vitest";
import { AuthProvider, useAuth } from "../../../src/shared/hooks/useAuth";

let mockKeycloak;

vi.mock("keycloak-js", () => {
  return {
    default: vi.fn(() => {
      mockKeycloak = {
        init: vi.fn().mockImplementation(() => {
          // Simula que luego de init se llama onAuthSuccess
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
        tokenParsed: { realm_access: { roles: ["CLIENT"] } },
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
}));

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
  beforeEach(() => {
    mockKeycloak = null;
  });

  it("renders AuthProvider and loads user on success", async () => {
    render(
      <AuthProvider>
        <ConsumerComponent />
      </AuthProvider>
    );

    await waitFor(() =>
      expect(screen.getByTestId("user").textContent).toBe("test@example.com")
    );
  });

  it("calls login function", async () => {
    render(
      <AuthProvider>
        <ConsumerComponent />
      </AuthProvider>
    );

    const loginButton = await screen.findByText("Login");
    fireEvent.click(loginButton);

    expect(mockKeycloak.login).toHaveBeenCalled();
  });

  it("calls logout and clears context", async () => {
    render(
      <AuthProvider>
        <ConsumerComponent />
      </AuthProvider>
    );

    await waitFor(() =>
      expect(screen.getByTestId("user").textContent).toBe("test@example.com")
    );

    const logoutButton = await screen.findByText("Logout");
    fireEvent.click(logoutButton);

    await waitFor(() =>
      expect(screen.getByTestId("user").textContent).toBe("No user")
    );
  });

  it("updates session roles and updates user", async () => {
    let updateSessionRolesFn;

    const Component = () => {
      const { user, updateSessionRoles } = useAuth();
      updateSessionRolesFn = updateSessionRoles;

      return <span data-testid="user">{user?.email || "No user"}</span>;
    };

    render(
      <AuthProvider>
        <Component />
      </AuthProvider>
    );

    // Esperamos a que cargue inicialmente
    await waitFor(() =>
      expect(screen.getByTestId("user").textContent).toBe("test@example.com")
    );

    // Simula nuevos roles
    await updateSessionRolesFn(["CLIENT", "FREELANCER"], "/dashboard");

    expect(mockKeycloak.logout).toHaveBeenCalled();
    expect(mockKeycloak.login).toHaveBeenCalledWith({
      prompt: "none",
      redirectUri: window.location.origin + "/dashboard",
    });

    await waitFor(() =>
      expect(screen.getByTestId("user").textContent).toBe("test@example.com")
    );
  });
});
