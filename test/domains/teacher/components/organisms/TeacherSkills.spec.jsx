import { render, screen } from "@testing-library/react";
import SkillSection from "../../../../../src/domains/teacher/components/organisms/SkillSection";
import { describe, expect, it } from "vitest";

describe("TeacherSkill Component", () => {
  it("renders teacher skill correctly", () => {
    render(<SkillSection />);
    expect(screen.getByText("Skill")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Add Skill/i })
    ).toBeInTheDocument();
  });
});
