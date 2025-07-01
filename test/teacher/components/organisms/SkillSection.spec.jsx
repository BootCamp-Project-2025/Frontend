import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SkillSection from "../../../../src/domains/teacher/components/organisms/SkillSection";

describe("SkillSection Component", () => {
  it("renders teacher skill correctly", () => {
    render(<SkillSection />);
    expect(screen.getByText("Skills")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Add Skill/i })
    ).toBeInTheDocument();
  });
});
