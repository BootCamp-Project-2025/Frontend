/* eslint-disable react/prop-types */
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { CourseHeroSection } from "../../../../../src/domains/course/components/organisms/CourseHeroSection";

// Mocks
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
  Button: ({ children, className, onClick }) => (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  ),
}));

vi.mock("../../../../../src/shared/components/molecules/Loading", () => ({
  Loading: () => <div data-testid="loading-spinner">Loading...</div>,
}));

describe("CourseHeroSection", () => {
  const props = {
    name: "React Basics",
    userName: "Jane Smith",
    language: "English",
    category: "Programming",
    subCategory: "Frontend",
    imgSrc: "/react.png",
    raters: 100,
    students: 200,
    rating: 4.7,
    isEnrolled: false,
    loadingIsEnrolled: false,
    loadingEnrollIn: false,
    handleEnroll: vi.fn(),
  };

  it("renders the name and course image", () => {
    render(<CourseHeroSection {...props} />);
    expect(screen.getByText(props.name)).toBeInTheDocument();

    const images = screen.getAllByAltText("course image");
    expect(images.length).toBeGreaterThanOrEqual(1);
    images.forEach((img) => {
      expect(img).toHaveAttribute("src", props.imgSrc);
    });
  });

  it("passes props correctly to child components", () => {
    render(<CourseHeroSection {...props} />);
    expect(screen.getByTestId("category")).toHaveTextContent(
      `${props.category} - ${props.subCategory}`
    );
    expect(screen.getByTestId("created-by")).toHaveTextContent(props.userName);
    expect(screen.getByTestId("language")).toHaveTextContent(props.language);
    expect(screen.getByTestId("stats")).toHaveTextContent(
      `Rating: ${props.rating}, Raters: ${props.raters}, Students: ${props.students}`
    );
  });

  it('shows "Enroll In" when user is not enrolled and not loading', () => {
    render(<CourseHeroSection {...props} />);
    const buttons = screen.getAllByRole("button", { name: "Enroll In" });
    expect(buttons.length).toBe(2);
  });

  it('shows "Go to Course" when user is enrolled', () => {
    render(<CourseHeroSection {...props} isEnrolled={true} />);
    const buttons = screen.getAllByRole("button", { name: "Go to Course" });
    expect(buttons.length).toBe(2);
  });

  it("shows loading spinner when loading states are true", () => {
    render(
      <CourseHeroSection
        {...props}
        loadingIsEnrolled={true}
        loadingEnrollIn={true}
      />
    );
    expect(screen.getAllByTestId("loading-spinner").length).toBeGreaterThan(0);
  });

  it("calls handleEnroll when button is clicked", () => {
    render(<CourseHeroSection {...props} />);
    const buttons = screen.getAllByRole("button", { name: "Enroll In" });
    buttons.forEach((btn) => {
      fireEvent.click(btn);
    });
    expect(props.handleEnroll).toHaveBeenCalledTimes(2);
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
