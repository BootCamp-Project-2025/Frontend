/* eslint-disable react/prop-types */
import { render, fireEvent, waitFor } from "@testing-library/react";
import PopupRoot from "../../../../src/shared/components/atoms/Popup";
import { usePopupContext } from "../../../../src/shared/contexts/PopupContext";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import React from "react";

// Mock usePopupContext
vi.mock("../../../../src/shared/contexts/PopupContext", () => ({
  usePopupContext: vi.fn(),
}));

// Helper: create a modal root in the DOM
function setupModalRoot() {
  const modalRoot = document.createElement("div");
  modalRoot.setAttribute("id", "modal-root");
  document.body.appendChild(modalRoot);
  return modalRoot;
}

function cleanupModalRoot(modalRoot) {
  if (modalRoot && modalRoot.parentNode) {
    modalRoot.parentNode.removeChild(modalRoot);
  }
}

const DummyComponent = ({ closePopup }) => (
  <div data-testid="dummy-component">
    Dummy
    <button onClick={closePopup}>Close</button>
  </div>
);

describe("PopupRoot", () => {
  let modalRoot;

  beforeEach(() => {
    modalRoot = setupModalRoot();
  });

  afterEach(() => {
    cleanupModalRoot(modalRoot);
    vi.clearAllMocks();
  });

  it("renders nothing if isOpen is false", () => {
    usePopupContext.mockReturnValue({
      isOpen: false,
      Component: DummyComponent,
      componentProps: {},
      closePopup: vi.fn(),
      isDismisable: true,
    });
    const { container } = render(<PopupRoot />);
    expect(container.innerHTML).toBe("");
  });

  it("renders nothing if Component is null", () => {
    usePopupContext.mockReturnValue({
      isOpen: true,
      Component: null,
      componentProps: {},
      closePopup: vi.fn(),
      isDismisable: true,
    });
    const { container } = render(<PopupRoot />);
    expect(container.innerHTML).toBe("");
  });

  it("renders popup when isOpen and Component are provided", () => {
    usePopupContext.mockReturnValue({
      isOpen: true,
      Component: DummyComponent,
      componentProps: {},
      closePopup: vi.fn(),
      isDismisable: true,
    });
    const { getByTestId } = render(<PopupRoot />);
    expect(getByTestId("dummy-component")).toBeInTheDocument();
  });

  it("calls closePopup when overlay is clicked and isDismisable", async () => {
    const closePopup = vi.fn();
    usePopupContext.mockReturnValue({
      isOpen: true,
      Component: DummyComponent,
      componentProps: {},
      closePopup,
      isDismisable: true,
    });
    const { getByTestId } = render(<PopupRoot />);
    fireEvent.click(getByTestId("dummy-component").parentElement.parentElement);
    await waitFor(() => expect(closePopup).toHaveBeenCalled());
  });

  it("does not call closePopup when overlay is clicked and not dismisable", () => {
    const closePopup = vi.fn();
    usePopupContext.mockReturnValue({
      isOpen: true,
      Component: DummyComponent,
      componentProps: {},
      closePopup,
      isDismisable: false,
    });
    const { getByTestId } = render(<PopupRoot />);
    fireEvent.click(getByTestId("dummy-component").parentElement.parentElement);
    expect(closePopup).not.toHaveBeenCalled();
  });

  it("calls closePopup when Escape is pressed and isDismisable", async () => {
    const closePopup = vi.fn();
    usePopupContext.mockReturnValue({
      isOpen: true,
      Component: DummyComponent,
      componentProps: {},
      closePopup,
      isDismisable: true,
    });
    const { getByTestId } = render(<PopupRoot />);
    fireEvent.keyDown(
      getByTestId("dummy-component").parentElement.parentElement,
      { key: "Escape" }
    );
    await waitFor(() => expect(closePopup).toHaveBeenCalled());
  });

  it("does not call closePopup when Escape is pressed and not dismisable", () => {
    const closePopup = vi.fn();
    usePopupContext.mockReturnValue({
      isOpen: true,
      Component: DummyComponent,
      componentProps: {},
      closePopup,
      isDismisable: false,
    });
    const { getByTestId } = render(<PopupRoot />);
    fireEvent.keyDown(
      getByTestId("dummy-component").parentElement.parentElement,
      { key: "Escape" }
    );
    expect(closePopup).not.toHaveBeenCalled();
  });

  it("warns if #modal-root is not found", () => {
    cleanupModalRoot(modalRoot);
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    usePopupContext.mockReturnValue({
      isOpen: true,
      Component: DummyComponent,
      componentProps: {},
      closePopup: vi.fn(),
      isDismisable: true,
    });
    render(<PopupRoot />);
    expect(warnSpy).toHaveBeenCalledWith("#modal-root is not found in DOM");
    warnSpy.mockRestore();
  });

  it("passes componentProps and closePopup to Component", () => {
    const closePopup = vi.fn();
    const componentProps = { foo: "bar" };
    const TestComponent = (props) => {
      expect(props.foo).toBe("bar");
      expect(typeof props.closePopup).toBe("function");
      return <div data-testid="test-component" />;
    };
    usePopupContext.mockReturnValue({
      isOpen: true,
      Component: TestComponent,
      componentProps,
      closePopup,
      isDismisable: true,
    });
    render(<PopupRoot />);
  });
});
