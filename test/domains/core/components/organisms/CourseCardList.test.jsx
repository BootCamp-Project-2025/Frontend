/* eslint-disable react/prop-types */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { CourseCardList } from "../../../../../src/domains/core/componentes/organism/CourseCardList";

vi.mock("../../../../../src/shared/components/molecules/CourseCard", () => ({
  CourseCard: ({ author, description, imageURL, name, rating }) => (
    <div data-testid="course-card">
      <img src={imageURL} alt="Course Image" />
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
      author: "Jane Doe",
      description: "Learn React",
      imageURL: "/react.jpg",
      name: "React Basics",
      rating: "4.5",
    },
    {
      id: "2",
      author: "John Smith",
      description: "Learn Vue",
      imageURL: "/vue.jpg",
      name: "Vue Fundamentals",
      rating: "4.7",
    },
  ];

  beforeEach(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockCourses),
      })
    );
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("fetches and renders course cards", async () => {
    render(<CourseCardList />);

    await waitFor(() => {
      expect(screen.getAllByTestId("course-card")).toHaveLength(
        mockCourses.length
      );
    });

    mockCourses.forEach((course) => {
      expect(screen.getByText(course.name)).toBeInTheDocument();
      expect(screen.getByText(course.description)).toBeInTheDocument();
      expect(screen.getByText(course.author)).toBeInTheDocument();
      expect(screen.getByText(course.rating)).toBeInTheDocument();
    });
  });
});
