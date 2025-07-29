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
      description: "Learn React",
      imageURL: "/react.jpg",
      name: "React Basics",
    },
    {
      id: "2",
      description: "Learn Vue",
      imageURL: "/vue.jpg",
      name: "Vue Fundamentals",
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
    }
  });
});
