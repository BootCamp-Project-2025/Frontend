import { render, screen, fireEvent } from "@testing-library/react";
import { Toast } from "../../../../src/shared/components/molecules/Toast";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act } from "react";

describe("Toast Component", () => {
  const mockClose = vi.fn();

  const successProps = {
    id: "toast-id-1",
    text: "This is a success toast",
    type: "success",
    closeToast: mockClose,
  };

  const errorProps = {
    id: "toast-id-2",
    text: "This is a error toast",
    type: "error",
    closeToast: mockClose,
  };

  beforeEach(() => {
    vi.useFakeTimers();
    mockClose.mockReset();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders success toast text correctly", () => {
    render(<Toast {...successProps} />);
    expect(screen.getByText("This is a success toast")).toBeInTheDocument();
  });

  it("renders error toast text correctly", () => {
    render(<Toast {...errorProps} />);
    expect(screen.getByText("This is a error toast")).toBeInTheDocument();
  });

  it("calls closeToast after timeout", async () => {
    render(<Toast {...successProps} />);
    await act(async () => {
      vi.advanceTimersByTime(4300);
    });
    expect(mockClose).toHaveBeenCalledWith("toast-id-1");
  });

  it("calls closeToast when close button is clicked", async () => {
    render(<Toast {...successProps} />);
    const closeButton = screen.getByRole("button");
    fireEvent.click(closeButton);
    await act(async () => {
      vi.advanceTimersByTime(300);
    });
    expect(mockClose).toHaveBeenCalledWith("toast-id-1");
  });
});
