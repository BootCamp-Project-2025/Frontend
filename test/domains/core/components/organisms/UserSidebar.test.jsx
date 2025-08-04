import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { UserSidebar } from "../../../../../src/domains/core/componentes/organism/UserSidebar";
import { AuthProvider } from "../../../../../src/shared/providers/AuthProvider";

// Mock useLocation
vi.mock("react-router-dom", () => ({
  useLocation: () => ({ pathname: "/teacher/" }),
}));

vi.mock("../../../../../src/shared/providers/AuthProvider", () => ({
  AuthProvider: ({ children }) => children,
  AuthContext: {
    Provider: ({ children }) => children,
  },
}));

vi.mock("react", async () => {
  const actual = await vi.importActual("react");
  return {
    ...actual,
    useContext: () => ({
      user: { name: "User", email: "user@example.com" },
      isLoading: false,
    }),
  };
});

describe("UserSidebar", () => {
  it("renders AvatarIcon with correct props", () => {
    render(
      <AuthProvider>
        <UserSidebar />
      </AuthProvider>
    );
    const avatarButton = screen.getByRole("button");
    expect(avatarButton).toHaveTextContent("U");
  });
});
