import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import { CourseDetailsCategory } from "../../../../../src/domains/course/components/molecules/CourseDetailsCategory";

const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe("CourseDetailsCategory", () => {
  it("should render category and subcategory", () => {
    renderWithRouter(
      <CourseDetailsCategory category="Programming" subCategory="React" />
    );

    expect(screen.getByText("Programming")).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
  });

  it("should use default props if none are provided", () => {
    renderWithRouter(<CourseDetailsCategory />);
    expect(screen.getByText("Category")).toBeInTheDocument();
    expect(screen.getByText("SubCategory")).toBeInTheDocument();
  });
});
