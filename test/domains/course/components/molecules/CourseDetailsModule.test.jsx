import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { CourseDetailsModule } from "../../../../../src/domains/course/components/molecules/CourseDetailsModule";

describe("CourseDetailsModule", () => {
  const mockLessons = [
    { title: "Lesson 1" },
    { title: "Lesson 2" },
    { title: "Lesson 3" },
  ];

  it("should render title and lesson count", () => {
    render(<CourseDetailsModule title="Module A" lessons={mockLessons} />);
    expect(
      screen.getByText((content, element) => {
        return element?.textContent === "Module A";
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${mockLessons.length} lessons`)
    ).toBeInTheDocument();
  });

  it("should not display lessons initially", () => {
    render(<CourseDetailsModule title="Module A" lessons={mockLessons} />);
    mockLessons.forEach((lesson) => {
      expect(screen.queryByText(lesson)).not.toBeInTheDocument();
    });
  });

  it("should display lessons after clicking the toggle button", () => {
    render(<CourseDetailsModule title="Module A" lessons={mockLessons} />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    screen.debug();
    mockLessons.forEach((lesson) => {
      expect(screen.getByText(lesson.title)).toBeInTheDocument();
    });
  });

  it("should hide lessons after clicking again (toggle)", () => {
    render(<CourseDetailsModule title="Module A" lessons={mockLessons} />);
    const button = screen.getByRole("button");

    fireEvent.click(button);

    mockLessons.forEach((lesson) => {
      expect(screen.queryByText(lesson)).not.toBeInTheDocument();
    });
  });
});
