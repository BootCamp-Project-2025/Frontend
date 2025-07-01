import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { AvatarIcon } from "../../../../../src/domains/core/componentes/molecules/AvatarIcon";

describe("AvatarIcon component", () => {
  it("renders the avatar image when avatarURL is provided", () => {
    render(<AvatarIcon avatarURL="/avatar.jpg" userName="John" />);
    const image = screen.getByAltText("User avatar");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/avatar.jpg");
  });

  it("renders avatar with user's initial when avatarURL is empty", () => {
    render(<AvatarIcon userName="Alice" />);
    const initial = screen.getByText("A");
    expect(initial).toBeInTheDocument();
  });

  it("calls onClick when the button is clicked", () => {
    const handleClick = vi.fn();
    render(<AvatarIcon onClick={handleClick} userName="Bob" />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalled();
  });

  it("renders default initial when no userName is provided", () => {
    render(<AvatarIcon />);
    const initial = screen.getByText("U");
    expect(initial).toBeInTheDocument();
  });
});
