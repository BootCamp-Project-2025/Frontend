import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { UserSidebar } from "../../../../../src/domains/core/componentes/organism/UserSidebar";
import { AuthProvider } from "../../../../../src/shared/providers/AuthProvider";

// Mock useLocation
vi.mock("react-router-dom", () => ({
  useLocation: () => ({ pathname: "/teacher/" }),
}));

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
