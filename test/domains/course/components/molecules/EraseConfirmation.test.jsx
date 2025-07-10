import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import EraseConfirmation from "../../../../../src/domains/course/components/molecules/EraseConfirmation";

describe("SyllabusInfo test component", () => {
  const closePopup = vi.fn();
  const onDelete = vi.fn();

  beforeEach(() => {
    closePopup.mockClear();
    onDelete.mockClear();
  });
  it("renders correctly", () => {
    render(<EraseConfirmation closePopup={closePopup} onDelete={onDelete} />);
    const eraseConfirmation = screen.getByText(
      "Are you sure you want to delete this element"
    );
    expect(eraseConfirmation).toBeInTheDocument();
  });
  it("press cancel correctly", () => {
    render(<EraseConfirmation closePopup={closePopup} onDelete={onDelete} />);
    const buttons = screen.getAllByRole("button");
    buttons[0].click();
    expect(closePopup).toHaveBeenCalled();
  });
  it("press delete correctly", () => {
    render(<EraseConfirmation closePopup={closePopup} onDelete={onDelete} />);
    const buttons = screen.getAllByRole("button");
    buttons[1].click();
    expect(closePopup).toHaveBeenCalled();
    expect(onDelete).toHaveBeenCalled();
  });
});
