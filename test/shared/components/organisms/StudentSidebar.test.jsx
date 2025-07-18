/* eslint-disable react/prop-types */
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import { StudentSidebar } from "../../../../src/shared/components/organisms/StudentSidebar";

vi.mock("../../../../src/shared/components/atoms/Icon", () => ({
  Icon: ({ icon }) => <div data-testid="icon">{icon}</div>,
}));

vi.mock("../../../../src/shared/components/molecules/SidebarRow", () => ({
  SidebarRow: ({ name }) => <div data-testid="sidebar-row">{name}</div>,
}));

vi.mock("../../../../src/shared/components/molecules/SidebarLogo", () => ({
  SidebarLogo: ({ open }) => (
    <div data-testid="sidebar-logo">{open ? "Open" : "Closed"}</div>
  ),
}));

const renderSidebar = () => {
  render(
    <MemoryRouter>
      <StudentSidebar />
    </MemoryRouter>
  );
};

describe("StudentSidebar", () => {
  it("renders all SidebarRow components", () => {
    renderSidebar();
    const rows = screen.getAllByTestId("sidebar-row");
    expect(rows).toHaveLength(5);
    expect(rows.map((el) => el.textContent)).toEqual([
      "Dashboard",
      "Student Profile",
      "Courses",
      "Requests",
      "Chats",
    ]);
  });

  it("renders SidebarLogo with initial state 'closed'", () => {
    renderSidebar();
    const logo = screen.getByTestId("sidebar-logo");
    expect(logo).toHaveTextContent("Closed");
  });

  it("expands sidebar on mouse enter and collapses on mouse leave", () => {
    renderSidebar();
    const aside = screen.getByRole("complementary");

    fireEvent.mouseEnter(aside);
    expect(screen.getByTestId("sidebar-logo")).toHaveTextContent("Open");

    fireEvent.mouseLeave(aside);
    expect(screen.getByTestId("sidebar-logo")).toHaveTextContent("Closed");
  });

  it("shows only icon when sidebar is collapsed", () => {
    renderSidebar();
    const logoutLinks = screen.getAllByRole("link");

    expect(
      logoutLinks.some((link) => link.textContent.includes("Go Back Home"))
    ).toBe(false);
  });

  it("shows icon and text when sidebar is expanded", () => {
    renderSidebar();
    const aside = screen.getByRole("complementary");
    fireEvent.mouseEnter(aside);
    expect(screen.getByText("Go Back Home")).toBeInTheDocument();
  });
});
