import { render, screen, fireEvent } from "@testing-library/react";
import { Toast } from "../../../../src/shared/components/molecules/Toast";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act } from "react";

describe("Toast Component", () => {
  const mockClose = vi.fn();

  const defaultProps = {
    id: "toast-id-1",
    text: "This is a test toast",
    type: "success",
    closeToast: mockClose,
  };

  beforeEach(() => {
    vi.useFakeTimers();
    mockClose.mockReset();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders toast text correctly", () => {
    render(<Toast {...defaultProps} />);
    expect(screen.getByText("This is a test toast")).toBeInTheDocument();
  });

  it("calls closeToast after timeout", async () => {
    render(<Toast {...defaultProps} />);
    await act(async () => {
      vi.advanceTimersByTime(4300);
    });
    expect(mockClose).toHaveBeenCalledWith("toast-id-1");
  });

  it("calls closeToast when close button is clicked", async () => {
    render(<Toast {...defaultProps} />);
    const closeButton = screen.getByRole("button");
    fireEvent.click(closeButton);
    await act(async () => {
      vi.advanceTimersByTime(300);
    });
    expect(mockClose).toHaveBeenCalledWith("toast-id-1");
  });
});
