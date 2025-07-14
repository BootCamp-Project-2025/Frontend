import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CourseCard } from "../../../../src/shared/components/molecules/CourseCard";
import { MemoryRouter } from "react-router-dom";

describe("CourseCard component", () => {
  it("renders all course information", () => {
    render(
      <MemoryRouter>
        <CourseCard
          id="1"
          imageURL="/course-image.jpg"
          name="React for Beginners"
          description="Learn React from scratch"
          rating="4.5"
          author="Jane Doe"
        />
      </MemoryRouter>
    );

    expect(screen.getByAltText("Course Image")).toHaveAttribute(
      "src",
      "/course-image.jpg"
    );
    expect(screen.getByText("React for Beginners")).toBeInTheDocument();
    expect(screen.getByText("Learn React from scratch")).toBeInTheDocument();
    expect(screen.getByText("4.5")).toBeInTheDocument();
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
  });
});
