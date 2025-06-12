import { render, screen } from "@testing-library/react";
import TeacherSkillForm from "../../../../src/domains/teacher/components/organisms/TeacherSkillForm";
import { describe, expect, it } from "vitest";

describe("TeacherSkillForm Component", () => {
  const defaultProps = {
    skill: { skill: "express", level: "Beginner" },
    update: () => {},
  };
  it("renders teacher skill from correctly", () => {
    render(<TeacherSkillForm {...defaultProps} />);
    expect(screen.getByDisplayValue("Beginner")).toBeInTheDocument();
    expect(screen.getByDisplayValue("express")).toBeInTheDocument();
  });
});
