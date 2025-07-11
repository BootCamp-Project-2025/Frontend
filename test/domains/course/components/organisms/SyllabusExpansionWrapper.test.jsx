import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, vi, expect, beforeEach } from "vitest";
import SyllabusExpansionWrapper from "../../../../../src/domains/course/components/organisms/SyllabusExpansionWrapper";

describe("SyllabusExpansionWrapper", () => {
  let mockSave;
  let mockSaveTitle;
  let mockErase;
  let mockCheckRepeatTitle;

  beforeEach(() => {
    mockSave = vi.fn();
    mockSaveTitle = vi.fn();
    mockErase = vi.fn();
    mockCheckRepeatTitle = vi.fn().mockReturnValue(false);
  });

  const renderComponent = (props = {}) =>
    render(
      <SyllabusExpansionWrapper
        title=""
        sectionTitle="Section 1"
        save={mockSave}
        saveTitle={mockSaveTitle}
        erase={mockErase}
        checkRepeatTitle={mockCheckRepeatTitle}
        {...props}
      >
        <div data-testid="children">Child content</div>
      </SyllabusExpansionWrapper>
    );

  it("should render input when title is empty", () => {
    renderComponent();
    expect(screen.getByTestId("inputTitle")).toBeVisible();
  });

  it("shows error on invalid title length (< 5)", async () => {
    renderComponent();
    const input = screen.getByTestId("inputTitle");

    await userEvent.clear(input);
    await userEvent.type(input, "abc");

    expect(
      screen.getByText("Title cannot be less than 5 characters")
    ).toBeInTheDocument();
  });

  it("shows error on too long title (> 20)", async () => {
    renderComponent();
    const input = screen.getByTestId("inputTitle");

    await userEvent.clear(input);
    await userEvent.type(input, "a".repeat(21));

    expect(
      screen.getByText("Title cannot exceed 20 characters")
    ).toBeInTheDocument();
  });

  it("shows error if duplicate title is detected", async () => {
    mockCheckRepeatTitle.mockReturnValue(true);
    renderComponent();
    const input = screen.getByTestId("inputTitle");

    await userEvent.clear(input);
    await userEvent.type(input, "DuplicateTitle");

    expect(screen.getByText("Title already exists")).toBeInTheDocument();
  });

  it("calls saveTitle when clicking save title button with valid input", async () => {
    renderComponent();
    const input = screen.getByTestId("inputTitle");
    const saveTitleButton = screen.getByTestId("saveTitleButton");

    await userEvent.clear(input);
    await userEvent.type(input, "Valid Title");
    await userEvent.click(saveTitleButton);

    expect(mockSaveTitle).toHaveBeenCalledWith("Valid Title");
  });

  it("does not call save if title is still being edited", async () => {
    renderComponent();
    const saveButton = screen.getByTestId("saveButton");

    await userEvent.click(saveButton);
    expect(mockSave).not.toHaveBeenCalled();
    expect(screen.getByText("you need to save the title")).toBeInTheDocument();
  });

  it("calls erase when clicking erase button", async () => {
    renderComponent();
    const eraseButton = screen.getByTestId("eraseButton");

    await userEvent.click(eraseButton);
    expect(mockErase).toHaveBeenCalled();
  });
});
