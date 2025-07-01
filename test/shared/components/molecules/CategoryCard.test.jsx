import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CategoryCard } from "../../../../src/shared/components/molecules/CategoryCard";

describe("CategoryCard component", () => {
  it("renders category name and image", () => {
    render(<CategoryCard id="1" category="Technology" imageURL="/tech.jpg" />);

    const image = screen.getByAltText("Category Image");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/tech.jpg");

    const categoryText = screen.getByText("Technology");
    expect(categoryText).toBeInTheDocument();
  });

  it("renders with default category name if not provided", () => {
    render(<CategoryCard />);
    expect(screen.getByText("Category")).toBeInTheDocument();
  });
});
