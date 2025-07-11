/* eslint-disable react/prop-types */
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { CourseHeroSection } from "../../../../../src/domains/course/components/organisms/CourseHeroSection";

vi.mock(
  "../../../../../src/domains/course/components/molecules/CourseDetailsCategory",
  () => ({
    CourseDetailsCategory: ({ category, subCategory }) => (
      <div data-testid="category">
        {category} - {subCategory}
      </div>
    ),
  })
);

vi.mock(
  "../../../../../src/domains/course/components/molecules/CourseDetailsCreatedBy",
  () => ({
    CourseDetailsCreatedBy: ({ teacher }) => (
      <div data-testid="created-by">{teacher}</div>
    ),
  })
);

vi.mock(
  "../../../../../src/domains/course/components/molecules/CourseDetailsLanguage",
  () => ({
    CourseDetailsLanguage: ({ language }) => (
      <div data-testid="language">{language}</div>
    ),
  })
);

vi.mock(
  "../../../../../src/domains/course/components/molecules/CourseDetailsStats",
  () => ({
    CourseDetailsStats: ({ rating, raters, students }) => (
      <div data-testid="stats">{`Rating: ${rating}, Raters: ${raters}, Students: ${students}`}</div>
    ),
  })
);

vi.mock("../../../../../src/shared/components/atoms/Button", () => ({
  Button: ({ children, className }) => (
    <button className={className}>{children}</button>
  ),
}));

describe("CourseHeroSection", () => {
  const props = {
    title: "React Basics",
    teacher: "Jane Smith",
    language: "English",
    category: "Programming",
    subCategory: "Frontend",
    courseImage: "/react.png",
    raters: 100,
    students: 200,
    rating: 4.7,
  };

  it("renders the title and course image", () => {
    render(<CourseHeroSection {...props} />);
    expect(screen.getByText(props.title)).toBeInTheDocument();
    const images = screen.getAllByAltText("course image");
    expect(images.length).toBeGreaterThanOrEqual(1);
    images.forEach((img) => expect(img).toHaveAttribute("src"));
  });

  it("passes props correctly to child components", () => {
    render(<CourseHeroSection {...props} />);
    expect(screen.getByTestId("category")).toHaveTextContent(
      `${props.category} - ${props.subCategory}`
    );
    expect(screen.getByTestId("created-by")).toHaveTextContent(props.teacher);
    expect(screen.getByTestId("language")).toHaveTextContent(props.language);
    expect(screen.getByTestId("stats")).toHaveTextContent(
      `Rating: ${props.rating}, Raters: ${props.raters}, Students: ${props.students}`
    );
  });

  it("renders both enroll buttons", () => {
    render(<CourseHeroSection {...props} />);
    const buttons = screen.getAllByRole("button", { name: /Enroll In/i });
    expect(buttons.length).toBe(2);
  });

  it("renders default props when none are provided", () => {
    render(<CourseHeroSection />);
    expect(screen.getByText("Course Title")).toBeInTheDocument();
    expect(screen.getByTestId("category")).toHaveTextContent(
      "Category - SubCategory"
    );
    expect(screen.getByTestId("created-by")).toHaveTextContent("Teacher Name");
    expect(screen.getByTestId("language")).toHaveTextContent("Language name");
    expect(screen.getByTestId("stats")).toHaveTextContent(
      "Rating: 0, Raters: 0, Students: 0"
    );
  });
});
