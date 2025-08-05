/* eslint-disable react/prop-types */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { CourseCardList } from "../../../../../src/domains/core/componentes/organism/CourseCardList";

// Corregimos la propiedad imageURL -> imgSrc para que coincida con el componente real
vi.mock("../../../../../src/shared/components/molecules/CourseCard", () => ({
  CourseCard: ({ author, description, imgSrc, name, rating }) => (
    <div data-testid="course-card">
      <img src={imgSrc} alt="Course Image" />
      <p>{name}</p>
      <p>{description}</p>
      <p>{author}</p>
      <p>{rating}</p>
    </div>
  ),
}));

describe("CourseCardList component", () => {
  const mockCourses = [
    {
      id: "1",
      description: "Learn React",
      imgSrc: "/react.jpg",
      name: "React Basics",
      author: "John Doe",
      rating: 4.5,
    },
    {
      id: "2",
      description: "Learn Vue",
      imgSrc: "/vue.jpg",
      name: "Vue Fundamentals",
      author: "Jane Smith",
      rating: 4.8,
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("renders course cards when data is provided", async () => {
    render(<CourseCardList data={mockCourses} />);

    const cards = await screen.findAllByTestId("course-card");
    expect(cards).toHaveLength(mockCourses.length);

    for (const course of mockCourses) {
      expect(screen.getByText(course.name)).toBeInTheDocument();
      expect(screen.getByText(course.description)).toBeInTheDocument();
    }
  });

  it("renders 'Courses not found' when data is empty", () => {
    render(<CourseCardList data={[]} />);
    expect(screen.getByText("Courses not found")).toBeInTheDocument();
  });
});
