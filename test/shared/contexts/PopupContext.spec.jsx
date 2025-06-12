import { describe, it, expect } from "vitest";
import { render, act } from "@testing-library/react";
import {
  PopupProvider,
  usePopupContext,
} from "../../../src/shared/contexts/PopupContext";

function TestComponent() {
  const {
    isOpen,
    Component,
    componentProps,
    openPopup,
    closePopup,
    isDismisable,
  } = usePopupContext();

  return (
    <div>
      <span data-testid="isOpen">{isOpen ? "open" : "closed"}</span>
      <span data-testid="isDismisable">{isDismisable ? "true" : "false"}</span>
      <span data-testid="component">{Component ? "set" : "unset"}</span>
      <span data-testid="componentProps">{JSON.stringify(componentProps)}</span>
      <button
        onClick={() => openPopup(() => <div>Popup</div>, { foo: "bar" }, true)}
      >
        Open
      </button>
      <button onClick={closePopup}>Close</button>
    </div>
  );
}

describe("PopupContext", () => {
  it("provides default values", () => {
    const { getByTestId } = render(
      <PopupProvider>
        <TestComponent />
      </PopupProvider>
    );
    expect(getByTestId("isOpen").textContent).toBe("closed");
    expect(getByTestId("isDismisable").textContent).toBe("false");
    expect(getByTestId("component").textContent).toBe("unset");
    expect(getByTestId("componentProps").textContent).toBe("{}");
  });

  it("openPopup sets state correctly", () => {
    const { getByText, getByTestId } = render(
      <PopupProvider>
        <TestComponent />
      </PopupProvider>
    );
    act(() => {
      getByText("Open").click();
    });
    expect(getByTestId("isOpen").textContent).toBe("open");
    expect(getByTestId("isDismisable").textContent).toBe("true");
    expect(getByTestId("component").textContent).toBe("set");
    expect(getByTestId("componentProps").textContent).toBe(
      JSON.stringify({ foo: "bar" })
    );
  });

  it("closePopup resets state", () => {
    const { getByText, getByTestId } = render(
      <PopupProvider>
        <TestComponent />
      </PopupProvider>
    );
    act(() => {
      getByText("Open").click();
    });
    act(() => {
      getByText("Close").click();
    });
    expect(getByTestId("isOpen").textContent).toBe("closed");
    expect(getByTestId("isDismisable").textContent).toBe("false");
    expect(getByTestId("component").textContent).toBe("unset");
    expect(getByTestId("componentProps").textContent).toBe("{}");
  });
});
