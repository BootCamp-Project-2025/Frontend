import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { CourseDetailsCreatedBy } from "../../../../../src/domains/course/components/molecules/CourseDetailsCreatedBy";

describe("CourseDetailsCreatedBy", () => {
  it("should render the label 'Created By'", () => {
    render(<CourseDetailsCreatedBy teacher="John Doe" />);
    expect(screen.getByText("Created By")).toBeInTheDocument();
  });

  it("should render the teacher's name as a link", () => {
    render(<CourseDetailsCreatedBy teacher="John Doe" />);
    const teacherLink = screen.getByText("John Doe");
    expect(teacherLink).toBeInTheDocument();
    expect(teacherLink.tagName).toBe("A");
    expect(teacherLink).toHaveAttribute("href", "#teacherSection");
  });

  it("should use default prop when teacher is not provided", () => {
    render(<CourseDetailsCreatedBy />);
    expect(screen.getByText("teacherName")).toBeInTheDocument();
  });
});
