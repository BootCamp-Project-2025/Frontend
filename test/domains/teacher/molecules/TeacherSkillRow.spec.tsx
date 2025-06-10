import { render, screen } from "@testing-library/react";
import TeacherSkillRow from "../../../../src/domains/teacher/molecules/TeacherSkillRow";
import { describe, expect, it } from "vitest";

describe("TeacherSkillRow component", () => {
  const defaultProps = {
    skill: "react",
    level: "Beginer",
    edit: () => {
      console.log("edit");
    },
  };
  it("renders teacher skill row correctly", () => {
    render(<TeacherSkillRow {...defaultProps} />);
    expect(screen.getByText("react")).toBeInTheDocument();
    expect(screen.getByText("Beginer")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
