import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { CourseDetailsLanguage } from "../../../../../src/domains/course/components/molecules/CourseDetailsLanguage";

describe("CourseDetailsLanguage", () => {
  it("should render the language text", () => {
    render(<CourseDetailsLanguage language="English" />);
    expect(screen.getByText("English")).toBeInTheDocument();
  });

  it("should render the language icon as an SVG", () => {
    const { container } = render(<CourseDetailsLanguage />);
    const svgIcon = container.querySelector("svg");
    expect(svgIcon).toBeInTheDocument();
  });

  it("should use default language if none is provided", () => {
    render(<CourseDetailsLanguage />);
    expect(screen.getByText("laguageName")).toBeInTheDocument();
  });
});
