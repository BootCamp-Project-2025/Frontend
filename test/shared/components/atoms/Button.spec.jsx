import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Button } from "../../../../src/shared/components/atoms/Button";

describe("Button atom", () => {
  it("Button render with text", () => {
    render(<Button>Hello world</Button>);
    expect(screen.getByText("Hello world")).toBeInTheDocument();
  });

  it("fires onClick", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Hello world</Button>);
    fireEvent.click(screen.getByText("Hello world"));
    expect(handleClick).toHaveBeenCalled();
  });
});
