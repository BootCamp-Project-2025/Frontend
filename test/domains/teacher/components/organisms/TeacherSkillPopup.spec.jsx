import { render, screen } from "@testing-library/react";
import TeacherSkillPopup from "../../../../../src/domains/teacher/components/organisms/TeacherSkillPopup";
import { describe, expect, it } from "vitest";

describe("TeacherSkillPopup Component", () => {
  const defaultProps = {
    closePopup: () => console.log("close"),
    addSkill: () => console.log("addSkill"),
    skill: { skill: "react", level: "Beginner" },
  };
  it("renders teacher skill popup correctly", () => {
    render(<TeacherSkillPopup {...defaultProps} />);
    expect(screen.getByText("skill")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument();
  });
});
