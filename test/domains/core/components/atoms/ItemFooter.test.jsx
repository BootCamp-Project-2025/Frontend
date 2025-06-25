import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ItemFooter } from "../../../../../src/domains/core/componentes/atoms/ItemFooter";

describe("ItemFooter component", () => {
  it("renders link with the provided children", () => {
    render(
      <MemoryRouter>
        <ItemFooter to="/terms">about us</ItemFooter>
      </MemoryRouter>
    );

    const linkElement = screen.getByText("about us");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/terms");
  });
});
