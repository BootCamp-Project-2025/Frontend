import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Toggle } from "../../../../src/shared/components/atoms/Toggle";

describe("Toggle component", () => {
  it("renders with default label", () => {
    render(<Toggle />);
    expect(screen.getByText("Toggle")).toBeInTheDocument();
  });

  it("renders with custom label", () => {
    render(<Toggle label="My Toggle" />);
    expect(screen.getByText("My Toggle")).toBeInTheDocument();
  });

  it("calls onToggle with toggled value on click", () => {
    const onToggle = vi.fn();
    render(<Toggle enabled={false} onToggle={onToggle} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(onToggle).toHaveBeenCalledWith(true);
  });

  it("applies correct styles when enabled", () => {
    const { container, rerender } = render(<Toggle enabled={false} />);
    const button = container.querySelector("button");
    expect(button).toHaveClass("bg-gray-300");
    rerender(<Toggle enabled={true} />);
    expect(button).toHaveClass("bg-primary-500");
  });
});
