import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import CourseTypeSelection from "../../../../../src/domains/Course/components/organisms/CourseTypeSelection";

describe("CourseTypeSelection", () => {
  it("renders the heading", () => {
    render(<CourseTypeSelection setCourseType={vi.fn()} />);
    expect(
      screen.getByText(/what type of course do you want to create/i)
    ).toBeInTheDocument();
  });

  it("renders both course type buttons", () => {
    render(<CourseTypeSelection setCourseType={vi.fn()} />);
    expect(screen.getByText(/Static Course/i)).toBeInTheDocument();
    expect(screen.getByText(/P2P Course/i)).toBeInTheDocument();
  });

  it("calls setCourseType with 'static' when Static Course is clicked", () => {
    const setCourseType = vi.fn();
    render(<CourseTypeSelection setCourseType={setCourseType} />);
    fireEvent.click(screen.getByText(/Static Course/i));
    expect(setCourseType).toHaveBeenCalledWith("static");
  });

  it("calls setCourseType with 'p2p' when P2P Course is clicked", () => {
    const setCourseType = vi.fn();
    render(<CourseTypeSelection setCourseType={setCourseType} />);
    fireEvent.click(screen.getByText(/P2P Course/i));
    expect(setCourseType).toHaveBeenCalledWith("p2p");
  });
});
