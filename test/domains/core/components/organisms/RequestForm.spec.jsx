import { cleanup, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import RequestForm from "../../../../../src/domains/core/componentes/organism/RequestForm";
import userEvent from "@testing-library/user-event";

vi.mock(
  "../../../../../src/domains/course/components/organisms/DropdownSection",
  () => ({
    default: () => <span data-testid="dropDown">dropDown</span>,
  })
);

describe("RequestForm", () => {
  beforeEach(() => {
    cleanup();
  });
  it("renders", () => {
    render(<RequestForm />);
    expect(screen.getByText("Create your request")).toBeInTheDocument();
    expect(screen.getByText("Request title:")).toBeInTheDocument();
    expect(screen.getByText("Description:")).toBeInTheDocument();
    expect(screen.getByText("Basic information:")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Publish your request")).toBeInTheDocument();
  });
  it("calls popUp correctly", () => {
    const closePopupMock = vi.fn();
    render(<RequestForm closePopup={closePopupMock} />);
    screen.getByText("Cancel").click();
    expect(closePopupMock).toHaveBeenCalled();
  });
  it("name input works correctly", async () => {
    render(<RequestForm />);
    const nameInput = screen.getByPlaceholderText(/Enter a title/i);
    await userEvent.type(nameInput, "testText");
    expect(nameInput.value).toBe("testText");
  });
  it("description input works correctly", async () => {
    render(<RequestForm />);
    const descriptionInput =
      screen.getByPlaceholderText(/Enter a description/i);
    await userEvent.type(descriptionInput, "testText");
    expect(descriptionInput.value).toBe("testText");
  });
});
