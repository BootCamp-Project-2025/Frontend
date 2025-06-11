import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { TextAreaInput } from "../../../src/shared/components/molecules/TextAreaInput";

describe("TextAreaInput", () => {
  it("renders with label and placeholder", () => {
    render(
      <TextAreaInput
        label="Description"
        id="textAreaTest"
        placeholder="Type here..."
        rows={1}
      />
    );

    const textarea = screen.getByPlaceholderText("Type here...");
    expect(screen.getByLabelText("Description")).toBeInTheDocument();
    expect(textarea).toHaveAttribute("rows", "1");
  });

  it("displays an error message if errorMessage is provided", () => {
    render(
      <TextAreaInput
        label="Description"
        id="desc"
        errorMessage="Required field"
      />
    );

    expect(screen.getByText("Required field")).toBeInTheDocument();
  });
});
