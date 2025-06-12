import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MonthInput } from "../../../src/shared/components/molecules/MonthInput";

describe("MonthInput", () => {
  it("renders input  with a label ", () => {
    render(<MonthInput label="Start month" id="start-month" />);
    expect(screen.getByLabelText("Start month")).toBeInTheDocument();
    expect(screen.getByLabelText("Start month")).toHaveAttribute(
      "type",
      "month"
    );
  });

  it("displays an error message if errorMessage is passed", () => {
    render(
      <MonthInput label="Month" id="month" errorMessage="Required field" />
    );
    expect(screen.getByText("Required field")).toBeInTheDocument();
  });
});
