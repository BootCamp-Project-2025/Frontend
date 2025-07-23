/* eslint-disable react/prop-types */
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import { SidebarRow } from "../../../../src/shared/components/molecules/SidebarRow";

vi.mock("../../../../src/shared/components/atoms/Icon", () => ({
  Icon: ({ icon, className }) => (
    <div data-testid="icon" className={className}>
      {icon}
    </div>
  ),
}));

const renderWithRouter = (ui, { route = "/" } = {}) => {
  window.history.pushState({}, "Test page", route);
  return render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route path="*" element={ui} />
      </Routes>
    </MemoryRouter>
  );
};

describe("SidebarRow", () => {
  it("renders the name", () => {
    renderWithRouter(<SidebarRow name="Dashboard" route="/dashboard" />);
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });

  it("renders the icon when provided", () => {
    renderWithRouter(<SidebarRow name="Home" route="/home" icon="home-icon" />);
    const icon = screen.getByTestId("icon");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveTextContent("home-icon");
  });

  it("uses the correct route in NavLink", () => {
    renderWithRouter(<SidebarRow name="Courses" route="/courses" />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/courses");
  });

  it("applies active class when route matches", () => {
    renderWithRouter(<SidebarRow name="Active" route="/" />);
    const link = screen.getByRole("link");
    expect(link.className).toMatch(/bg-\[#2e6df53a\]/);
    expect(link.className).toMatch(/border-l-primary-500/);
  });

  it("applies hover class when not active", () => {
    renderWithRouter(<SidebarRow name="Other" route="/other" />, {
      route: "/different",
    });
    const link = screen.getByRole("link");
    expect(link.className).toMatch(/hover:bg-gray-100/);
    expect(link.className).toMatch(/border-l-transparent/);
  });
});
