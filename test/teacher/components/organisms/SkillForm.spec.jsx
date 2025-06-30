import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SkillForm } from "../../../../src/domains/teacher/components/organisms/SkillForm";

describe("SkillForm Component", () => {
  const defaultProps = {
    closePopup: () => console.log("close"),
    addCard: () => console.log("addSkill"),
    updateCard: () => console.log("addSkill"),
    skillObject: { skill: "react", level: "Beginner" },
  };
  it("renders teacher skill popup correctly", () => {
    render(<SkillForm {...defaultProps} />);
    expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument();
  });
});
