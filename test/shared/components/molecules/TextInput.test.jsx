// TextInput.test.jsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { TextInput } from "../../../../src/shared/components/molecules/TextInput";

describe("TextInput", () => {
  it("renders correctly with label and placeholder", () => {
    render(
      <TextInput
        label="Name"
        id="name"
        placeholder="Enter your name"
        maxLength={50}
      />
    );
    const input = screen.getByPlaceholderText("Enter your name");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "text");
    expect(input).toHaveAttribute("maxLength", "50");
    expect(screen.getByLabelText("Name")).toBe(input);
  });

  it("displays an error message if errorMessage is passed", () => {
    render(<TextInput label="Name" id="name" errorMessage="Required field" />);
    expect(screen.getByText("Required field")).toBeInTheDocument();
  });
});
