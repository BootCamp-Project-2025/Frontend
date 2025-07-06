import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CourseForm from "../../../../src/domains/teacher/components/molecules/CourseForm";
import { describe, it, expect, vi } from "vitest";

describe("CourseForm", () => {
  const closePopup = vi.fn();
  const addCourse = vi.fn();

  it("renders form fields and buttons", () => {
    render(<CourseForm closePopup={closePopup} addCourse={addCourse} />);
    expect(screen.getByLabelText(/Course Name:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description:/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Save/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Cancel/i })).toBeInTheDocument();
  });

  it("shows validation errors when fields are empty and form is submitted", async () => {
    render(<CourseForm closePopup={closePopup} addCourse={addCourse} />);
    fireEvent.click(screen.getByRole("button", { name: /Save/i }));

    expect(
      await screen.findByText(/Course name is required/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/Description is required/i)
    ).toBeInTheDocument();
  });

  it("calls onSubmit (externalSubmit) with form data when fields are filled", async () => {
    const handleSubmit = vi.fn();
    render(
      <CourseForm
        closePopup={closePopup}
        onSubmit={handleSubmit}
        addCourse={addCourse}
      />
    );

    fireEvent.change(screen.getByLabelText(/Course Name:/i), {
      target: { value: "React 101" },
    });
    fireEvent.change(screen.getByLabelText(/Description:/i), {
      target: { value: "Intro to React" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Save/i }));

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith({
        name: "React 101",
        description: "Intro to React",
      });
    });
  });

  it("shows only the relevant error if only one field is empty", async () => {
    render(<CourseForm closePopup={closePopup} addCourse={addCourse} />);
    fireEvent.change(screen.getByLabelText(/Course Name:/i), {
      target: { value: "React 101" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Save/i }));

    expect(
      await screen.findByText(/Description is required/i)
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/Course name is required/i)
    ).not.toBeInTheDocument();
    expect(screen.getByLabelText(/Course Name:/i)).toHaveValue("React 101");
  });
});
