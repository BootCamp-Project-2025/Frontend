import { render, screen } from "@testing-library/react";
import TeacherSkills from "../../../../src/domains/teacher/components/organisms/TeacherSkills";
import { describe, expect, it } from "vitest";

describe("TeacherSkill Component", () => {
  it("renders teacher skill correctly", () => {
    render(<TeacherSkills />);
    expect(screen.getByText("Skills")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Add Skill/i })
    ).toBeInTheDocument();
  });
});
