import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import UploadVideoUrl from "../../../../../src/domains/course/components/molecules/UploadVideoUrl";
import userEvent from "@testing-library/user-event";

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
  it("press Save correctly", async () => {
    render(<UploadVideoUrl closePopup={closePopup} saveVideo={saveVideo} />);
    const urlInput = screen.getByPlaceholderText("video url");
    await userEvent.type(urlInput, "https://www.figma.com");
    const buttonSave = screen.getByText("Save");
    buttonSave.click();
    expect(saveVideo).toHaveBeenCalled();
    expect(closePopup).toHaveBeenCalled();
  });
  it("press show error when url is invalid", async () => {
    render(<UploadVideoUrl closePopup={closePopup} saveVideo={saveVideo} />);
    const urlInput = screen.getByPlaceholderText("video url");
    await userEvent.type(urlInput, "not a url");
    const buttonSave = screen.getByText("Save");
    buttonSave.click();
    render().rerender();
    expect(screen.getByText("its not an url")).toBeInTheDocument();
  });
  it("press cancel calls to closePopup", async () => {
    render(<UploadVideoUrl closePopup={closePopup} saveVideo={saveVideo} />);
    const buttonCancel = screen.getByText("Cancel");
    buttonCancel.click();
    expect(closePopup).toHaveBeenCalled();
  });
});
