import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TeacherCard } from "../../../../src/shared/components/atoms/TeacherCard";
import { MemoryRouter } from "react-router-dom";

describe("TeacherCard component", () => {
  it("renders name, image, rating, description and skills", () => {
    render(
      <MemoryRouter>
        <TeacherCard
          id="t1"
          imageURL="/teacher.jpg"
          name="María Lopez"
          rating="4.8"
          description="Experienced full-stack developer."
          skills={["React", "Node.js", "GraphQL"]}
        />
      </MemoryRouter>
    );

    const image = screen.getByAltText("User image");
    expect(image).toHaveAttribute("src", "/teacher.jpg");

    expect(screen.getByText("María Lopez")).toBeInTheDocument();
    expect(screen.getByText("4.8")).toBeInTheDocument();
    expect(
      screen.getByText("Experienced full-stack developer.")
    ).toBeInTheDocument();

    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Node.js")).toBeInTheDocument();
    expect(screen.getByText("GraphQL")).toBeInTheDocument();
  });

  it("renders default values when props are not provided", () => {
    render(
      <MemoryRouter>
        <TeacherCard />
      </MemoryRouter>
    );

    expect(screen.getByText("Teacher name")).toBeInTheDocument();
    expect(screen.getByText("0.0")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getAllByText("Ability 1")).toHaveLength(2);
  });
});
