import { render, screen } from "@testing-library/react";
import TeacherSkillPopup from "../../../../src/domains/teacher/organisms/TeacherSkillPopup";
import { describe, expect, it } from "vitest";

describe("TeacherSkillPopup Component", () => {
  const defaultProps = {
    closePopup: () => console.log("close"),
    addSkill: () => console.log("addSkill"),
    skill: { skill: "", level: "Beginner" },
  };
  it("renders teacher skill popup correctly", () => {
    render(<TeacherSkillPopup {...defaultProps} />);
    expect(screen.getByText("Skill Form")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /delete/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument();
  });
});
