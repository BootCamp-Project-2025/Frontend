import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TeacherCard } from "../../../../src/shared/components/atoms/TeacherCard";

describe("TeacherCard component", () => {
  it("renders name, image, rating, description and skills", () => {
    render(
      <TeacherCard
        id="t1"
        imageURL="/teacher.jpg"
        name="María Lopez"
        rating="4.8"
        description="Experienced full-stack developer."
        skills={["React", "Node.js", "GraphQL"]}
      />
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

    expect(screen.getByText("star")).toBeInTheDocument();
  });

  it("renders default values when props are not provided", () => {
    render(<TeacherCard />);
    expect(screen.getByText("Teacher name")).toBeInTheDocument();
    expect(screen.getByText("0.0")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getAllByText("Ability 1")).toHaveLength(2);
  });
});
