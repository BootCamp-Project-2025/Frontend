import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Tabs } from "../../../../../src/domains/core/componentes/molecules/Tabs";

describe("Tabs", () => {
  it("renders both tab buttons", () => {
    render(<Tabs selected="table" onClick={() => {}} />);
    expect(screen.getByText("Table")).toBeInTheDocument();
    expect(screen.getByText("Graphic")).toBeInTheDocument();
  });

  it("calls onClick with correct argument when Table is clicked", () => {
    const onClick = vi.fn();
    render(<Tabs selected="graphic" onClick={onClick} />);
    fireEvent.click(screen.getByText("Table"));
    expect(onClick).toHaveBeenCalledWith("table");
  });

  it("calls onClick with correct argument when Graphic is clicked", () => {
    const onClick = vi.fn();
    render(<Tabs selected="table" onClick={onClick} />);
    fireEvent.click(screen.getByText("Graphic"));
    expect(onClick).toHaveBeenCalledWith("graphic");
  });
});
