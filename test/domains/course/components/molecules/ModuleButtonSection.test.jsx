import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import ButtonSection from "../../../../../src/domains/course/components/molecules/ModuleButtonSection";

describe("ModuleButtonSection test component", () => {
  const click1 = vi.fn();
  const click2 = vi.fn();

  beforeEach(() => {
    click1.mockClear();
    click2.mockClear();
  });
  it("renders correctly", () => {
    const buttonProps = [{ text: "testText", onClick: () => click1() }];
    render(<ButtonSection buttonProps={buttonProps} />);
    const button = screen.getByText("testText");
    button.click();
    expect(button).toBeInTheDocument();
    expect(click1).toHaveBeenCalled();
  });
  it("renders multiple buttons correctly", () => {
    const buttonProps = [
      { text: "testText", onClick: () => click1() },
      { text: "testText2", onClick: () => click2() },
    ];
    render(<ButtonSection buttonProps={buttonProps} />);
    const button = screen.getByText("testText");
    const button2 = screen.getByText("testText2");
    button.click();
    button2.click();
    expect(button).toBeInTheDocument();
    expect(button2).toBeInTheDocument();
    expect(click1).toHaveBeenCalled();
    expect(click2).toHaveBeenCalled();
  });
});
