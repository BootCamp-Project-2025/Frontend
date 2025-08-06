import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom";
import RequestDetailCategory from "../../../../../src/domains/core/componentes/atoms/RequestDetailCategory";

describe("RequestDetailCategory", () => {
  it("renders the category text correctly", () => {
    const categoryText = "Urgent";
    render(<RequestDetailCategory category={categoryText} />);

    const categoryElement = screen.getByText(categoryText);
    expect(categoryElement).toBeInTheDocument();
    expect(categoryElement).toHaveTextContent("Urgent");
  });

  it("applies correct styles", () => {
    render(<RequestDetailCategory category="Info" />);
    const element = screen.getByText("Info");

    expect(element).toHaveClass("py-3");
    expect(element).toHaveClass("px-6");
    expect(element).toHaveClass("rounded-3xl");
    expect(element).toHaveClass("text-sm");
  });
});
