/* eslint-disable react/prop-types */
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import { TeacherSidebar } from "../../../../src/shared/components/organisms/TeacherSidebar";

vi.mock("../../../../src/shared/components/molecules/SidebarLogo", () => ({
  SidebarLogo: ({ open }) => (
    <div data-testid="sidebar-logo">{open ? "Open" : "Closed"}</div>
  ),
}));

vi.mock("../../../../src/shared/components/molecules/SidebarRow", () => ({
  SidebarRow: ({ name }) => <div data-testid="sidebar-row">{name}</div>,
}));

const renderSidebar = (initialPath = "/teacher/dashboard") => {
  render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route path="*" element={<TeacherSidebar />} />
      </Routes>
    </MemoryRouter>
  );
};

describe("TeacherSidebar", () => {
  it("renders all static SidebarRows", () => {
    renderSidebar();
    const rows = screen.getAllByTestId("sidebar-row");
    expect(rows.map((r) => r.textContent)).toEqual([
      "Dashboard",
      "Teacher Profile",
      "P2P Courses",
      "Courses",
      "Search Request",
      "My Proposals",
      "Chats",
    ]);
  });

  it("shows SidebarLogo and reacts to hover", () => {
    renderSidebar();
    const aside = screen.getByRole("complementary");

    expect(screen.getByTestId("sidebar-logo")).toHaveTextContent("Closed");

    fireEvent.mouseEnter(aside);
    expect(screen.getByTestId("sidebar-logo")).toHaveTextContent("Open");

    fireEvent.mouseLeave(aside);
    expect(screen.getByTestId("sidebar-logo")).toHaveTextContent("Closed");
  });

  it("shows course menu when on homePage route with course name", () => {
    renderSidebar("/teacher/courses/123/homePage?name=React");
    const aside = screen.getByRole("complementary");
    fireEvent.mouseEnter(aside);
    expect(screen.getByText(/- React/)).toBeInTheDocument();
    expect(screen.getByText("Home page")).toBeInTheDocument();
    expect(screen.getByText("Syllabus")).toBeInTheDocument();
  });

  it("shows default text when course name is missing", () => {
    renderSidebar("/teacher/courses/123/syllabus");
    const aside = screen.getByRole("complementary");
    fireEvent.mouseEnter(aside);
    expect(screen.getByText(/- New course/)).toBeInTheDocument();
  });

  it("does not show course menu on unrelated routes", () => {
    renderSidebar("/teacher/profile");
    const aside = screen.getByRole("complementary");
    fireEvent.mouseEnter(aside);
    expect(screen.queryByText("Home page")).not.toBeInTheDocument();
    expect(screen.queryByText("Syllabus")).not.toBeInTheDocument();
  });
});
