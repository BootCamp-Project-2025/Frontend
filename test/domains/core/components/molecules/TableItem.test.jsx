import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { TableItem } from "../../../../../src/domains/core/componentes/molecules/TableItem";

describe("TableItem", () => {
  it("renders title and value", () => {
    render(<TableItem title="My Title" value={42} />);
    expect(screen.getByText("My Title")).toBeInTheDocument();
    expect(screen.getByText("42")).toBeInTheDocument();
  });
});
