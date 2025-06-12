import { render, screen, fireEvent } from "@testing-library/react";
import {
  ToastProvider,
  useToastContext,
} from "../../../src/shared/contexts/ToastContext";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act } from "react";

function TestComponent() {
  const { showToast } = useToastContext();

  return (
    <button onClick={() => showToast("Context Toast!", "success")}>
      Trigger Toast
    </button>
  );
}

describe("ToastContext", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("displays toast via context and removes it after timeout", async () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText("Trigger Toast"));

    await act(async () => {
      vi.advanceTimersByTime(100);
    });

    expect(screen.getByText(/context toast!/i)).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(4300);
    });

    expect(screen.queryByText(/context toast!/i)).not.toBeInTheDocument();
  });
});
