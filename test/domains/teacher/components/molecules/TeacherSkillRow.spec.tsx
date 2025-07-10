import { render, screen } from "@testing-library/react";
import SkillCard from "../../../../../src/domains/teacher/components/molecules/SkillCard";
import { describe, expect, it } from "vitest";

describe("SkillCard component", () => {
  const defaultProps = {
    id: "1",
    name: "react",
    level: "Beginer",
    editCard: () => {
      console.log("edit");
    },
    deleteCard: () => {},
  };
  it("renders teacher skill row correctly", () => {
    render(<SkillCard {...defaultProps} />);
    expect(screen.getByText("react")).toBeInTheDocument();
    expect(screen.getByText("Beginer")).toBeInTheDocument();
    expect(screen.getAllByRole("button").length).toBeGreaterThan(0);
  });
});
