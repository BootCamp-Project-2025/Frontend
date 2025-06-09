import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import CourseFormModal from "../../../../../src/domains/Course/components/templates/CourseFormModal";

vi.mock(
  "../../../../../src/domains/Course/components/organisms/CourseForm",
  () => ({
    __esModule: true,
    default: ({ onSubmit }) => (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit({ name: "Test Course" });
        }}
      >
        <button type="submit">Submit Course</button>
      </form>
    ),
  })
);

vi.mock(
  "../../../../../src/domains/Course/components/organisms/CourseTypeSelection",
  () => ({
    __esModule: true,
    default: ({ setCourseType }) => (
      <button onClick={() => setCourseType("online")}>
        Select Course Type
      </button>
    ),
  })
);

describe("CourseFormModal", () => {
  it("renders CourseTypeSelection initially", () => {
    render(<CourseFormModal closePopup={vi.fn()} />);
    expect(screen.getByText("Select Course Type")).toBeInTheDocument();
  });

  it("shows CourseForm after selecting a course type", () => {
    render(<CourseFormModal closePopup={vi.fn()} />);
    fireEvent.click(screen.getByText("Select Course Type"));
    expect(screen.getByText("Submit Course")).toBeInTheDocument();
  });

  it("calls closePopup after submitting the form", () => {
    const closePopup = vi.fn();
    render(<CourseFormModal closePopup={closePopup} />);
    fireEvent.click(screen.getByText("Select Course Type"));
    fireEvent.click(screen.getByText("Submit Course"));
    expect(closePopup).toHaveBeenCalled();
  });
});
