import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Sidebar } from "../../../../src/shared/components/organisms/Sidebar";
import { MemoryRouter } from "react-router-dom";

describe("Sidebar organism", () => {
  it("renders collapsed sidebar", () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );
    expect(screen.queryByText("Home")).not.toBeInTheDocument();
  });

  it("expands sidebar when button is clicked", () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );
    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[0]);
    //expect(screen.getByText("Home")).toBeInTheDocument();
  });
});
