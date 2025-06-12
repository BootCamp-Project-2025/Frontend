import { render, screen, fireEvent } from "@testing-library/react";
import CourseForm from "../../../../src/domains/teacher/components/molecules/CourseForm";
import { describe, it, expect, vi } from "vitest";

describe("CourseForm", () => {
  it("renders form fields and button", () => {
    render(<CourseForm onSubmit={vi.fn()} />);
    expect(screen.getByLabelText(/Course Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Course Description/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Create course/i })
    ).toBeInTheDocument();
  });

  it("shows validation errors when fields are empty and form is submitted", async () => {
    render(<CourseForm onSubmit={vi.fn()} />);
    fireEvent.click(
      screen.getByRole("button", {
        name: /Create course/i,
      })
    );
    expect(await screen.findAllByText(/This field is required/i)).toHaveLength(
      2
    );
  });

  it("calls onSubmit with form data when fields are filled", async () => {
    const handleSubmit = vi.fn();
    render(<CourseForm onSubmit={handleSubmit} />);
    fireEvent.change(screen.getByLabelText(/Course Name/i), {
      target: { value: "React 101" },
    });
    fireEvent.change(screen.getByLabelText(/Course Description/i), {
      target: { value: "Intro to React" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Create course/i }));
    await screen.findByRole("button", { name: /Create course/i });
    expect(handleSubmit).toHaveBeenCalledWith(
      { name: "React 101", description: "Intro to React" },
      expect.anything()
    );
  });

  it("shows only the relevant error if only one field is empty", async () => {
    render(<CourseForm onSubmit={vi.fn()} />);
    fireEvent.change(screen.getByLabelText(/Course Name/i), {
      target: { value: "React 101" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Create course/i }));
    expect(await screen.findAllByText(/This field is required/i)).toHaveLength(
      1
    );
    expect(screen.getByLabelText(/Course Name/i)).toHaveValue("React 101");
  });
});
