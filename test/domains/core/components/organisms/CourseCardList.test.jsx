/* eslint-disable react/prop-types */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { CourseCardList } from "../../../../../src/domains/core/componentes/organism/CourseCardList";
import * as api from "../../../../../src/shared/api/getRequest";

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
    vi.spyOn(api, "getRequest").mockResolvedValue({
      success: true,
      data: { data: mockCourses },
    });
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

    for (const course of mockCourses) {
      const nameEl = await screen.findByText((content) =>
        content.includes(course.name)
      );
      expect(nameEl).toBeInTheDocument();

      const descEl = await screen.findByText((content) =>
        content.includes(course.description)
      );
      expect(descEl).toBeInTheDocument();

      const authorEl = await screen.findByText((content) =>
        content.includes(course.author)
      );
      expect(authorEl).toBeInTheDocument();

      const ratingEl = await screen.findByText((content) =>
        content.includes(course.rating.toString())
      );
      expect(ratingEl).toBeInTheDocument();
    }
  });
});
