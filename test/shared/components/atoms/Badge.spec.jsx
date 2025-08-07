import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Badge from "../../../../src/shared/components/atoms/Badge";

describe("Badge component", () => {
  it("renders with default gray color", () => {
    render(<Badge>Default Badge</Badge>);
    const badge = screen.getByText("Default Badge");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("bg-gray-100");
  });

  it("renders with custom color", () => {
    render(<Badge color="red">Red Badge</Badge>);
    const badge = screen.getByText("Red Badge");
    expect(badge).toHaveClass("bg-red-100");
  });

  it("renders children correctly", () => {
    render(<Badge>Badge Content</Badge>);
    expect(screen.getByText("Badge Content")).toBeTruthy();
  });

  it("adds additional className", () => {
    render(
      <Badge className="custom-class" data-testid="badge">
        Custom Class Badge
      </Badge>
    );
    const badge = screen.getByTestId("badge");
    expect(badge).toHaveClass("custom-class");
  });

  it("defaults to gray if invalid color is passed", () => {
    render(<Badge color="invalid">Fallback Badge</Badge>);
    const badge = screen.getByText("Fallback Badge");
    expect(badge).toHaveClass("bg-gray-100");
  });
});
