import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import SyllabusInfo from "../../../../../src/domains/course/components/molecules/SyllabusInfo";

describe("SyllabusInfo test component", () => {
  it("renders correctly", () => {
    render(<SyllabusInfo />);

    expect(screen.getByTestId("SyllabusInfo")).toBeInTheDocument();
  });
});
