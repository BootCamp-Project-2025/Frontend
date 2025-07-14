import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { CourseDetailsModule } from "../../../../../src/domains/course/components/molecules/CourseDetailsModule";

describe("CourseDetailsModule", () => {
  const mockLessons = ["Lesson 1", "Lesson 2", "Lesson 3"];

  it("should render title and lesson count", () => {
    render(
      <CourseDetailsModule titleModule="Module A" lessons={mockLessons} />
    );
    expect(screen.getByText("Module A")).toBeInTheDocument();
    expect(
      screen.getByText(`${mockLessons.length} lessons`)
    ).toBeInTheDocument();
  });

  it("should not display lessons initially", () => {
    render(
      <CourseDetailsModule titleModule="Module A" lessons={mockLessons} />
    );
    mockLessons.forEach((lesson) => {
      expect(screen.queryByText(lesson)).not.toBeInTheDocument();
    });
  });

  it("should display lessons after clicking the toggle button", () => {
    render(
      <CourseDetailsModule titleModule="Module A" lessons={mockLessons} />
    );
    const button = screen.getByRole("button");
    fireEvent.click(button);

    mockLessons.forEach((lesson) => {
      expect(screen.getByText(lesson)).toBeInTheDocument();
    });
  });

  it("should hide lessons after clicking again (toggle)", () => {
    render(
      <CourseDetailsModule titleModule="Module A" lessons={mockLessons} />
    );
    const button = screen.getByRole("button");

    fireEvent.click(button);
    fireEvent.click(button);

    mockLessons.forEach((lesson) => {
      expect(screen.queryByText(lesson)).not.toBeInTheDocument();
    });
  });
});
