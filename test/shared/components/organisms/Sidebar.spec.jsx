import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TeacherSidebar } from "../../../../src/shared/components/organisms/TeacherSidebar";
import { MemoryRouter } from "react-router-dom";

describe("TeacherSidebar organism", () => {
  it("renders  TeacherSidebar", () => {
    render(
      <MemoryRouter>
        <TeacherSidebar />
      </MemoryRouter>
    );
    expect(screen.queryByText("dashboard")).not.toBeInTheDocument();
  });

  /*  it("expands TeacherSidebar when button is clicked", () => {
    render(
      <MemoryRouter>
        <TeacherSidebar />
      </MemoryRouter>
    );
    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[0]);
    expect(screen.getByText("Home")).toBeInTheDocument();
  }); */
});
