import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import UploadVideoUrl from "../../../../../src/domains/course/components/molecules/UploadVideoUrl";

describe("Upload video url test component", () => {
  const closePopup = vi.fn();
  const saveVideo = vi.fn();

  beforeEach(() => {
    closePopup.mockClear();
    saveVideo.mockClear();
  });
  it("renders correctly", () => {
    render(<UploadVideoUrl closePopup={closePopup} saveVideo={saveVideo} />);
    const eraseConfirmation = screen.getByText("Upload video url");
    expect(eraseConfirmation).toBeInTheDocument();
  });
  it("press Cancel correctly", () => {
    render(<UploadVideoUrl closePopup={closePopup} saveVideo={saveVideo} />);
    const button = screen.getByText("Cancel");
    button.click();
    expect(closePopup).toHaveBeenCalled();
  });
  it("press Save correctly", () => {
    render(<UploadVideoUrl closePopup={closePopup} saveVideo={saveVideo} />);
    const buttonCancel = screen.getByText("Cancel");
    buttonCancel.click();
    const buttonSave = screen.getByText("Save");
    buttonSave.click();
    expect(closePopup).toHaveBeenCalled();
    expect(saveVideo).toHaveBeenCalled();
  });
});
