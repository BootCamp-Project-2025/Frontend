import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Table } from "../../../../../src/domains/core/componentes/molecules/Table";

describe("Table", () => {
  it("renders children correctly", () => {
    render(
      <Table>
        <div>Child 1</div>
        <div>Child 2</div>
      </Table>
    );
    expect(screen.getByText("Child 1")).toBeInTheDocument();
    expect(screen.getByText("Child 2")).toBeInTheDocument();
  });
});
