import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import React from "react";
import { DialogContainer } from "../../../src/shared/components/atoms/DialogContainer";

describe("DialogContainer", () => {
  beforeEach(() => {
    document.querySelector("html").style.overflowY = "auto";
  });

  afterEach(() => {
    cleanup();
    document.querySelector("html").style.overflowY = "auto";
  });

  it("it is visible when isOpen is true", () => {
    render(<DialogContainer isOpen={true}>Contenido</DialogContainer>);
    expect(screen.getByText("Contenido")).toBeInTheDocument();
  });

  it("it isn't visible when  isOpen is false", () => {
    render(<DialogContainer isOpen={false}>Contenido</DialogContainer>);
    const container = screen.getByText("Contenido").parentElement;
    expect(container).toHaveClass("hidden");
  });

  it("calls onClose when double-clicking outside the content", () => {
    const onClose = vi.fn();
    render(
      <DialogContainer isOpen={true} onClose={onClose}>
        <p>Contenido</p>
      </DialogContainer>
    );
    fireEvent.dblClick(
      screen.getByText("Contenido").parentElement.parentElement
    );
    expect(onClose).toHaveBeenCalled();
  });

  it("does not call onClose when double-clicking inside the content", () => {
    const onClose = vi.fn();
    render(
      <DialogContainer isOpen={true} onClose={onClose}>
        <p>Contenido</p>
      </DialogContainer>
    );
    fireEvent.dblClick(screen.getByText("Contenido").parentElement);
    expect(onClose).not.toHaveBeenCalled();
  });

  it("change the HTML overflowY on open and restore it on close", () => {
    const { rerender, unmount } = render(
      <DialogContainer isOpen={true}>Contenido</DialogContainer>
    );
    expect(document.querySelector("html").style.overflowY).toBe("hidden");

    rerender(<DialogContainer isOpen={false}>Contenido</DialogContainer>);
    expect(document.querySelector("html").style.overflowY).toBe("auto");

    unmount();
    expect(document.querySelector("html").style.overflowY).toBe("auto");
  });
});
