import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import RowSocialLink from "../../../../../src/domains/student/components/atoms/RowSocialLink";

describe("RowSocialLink", () => {
  const onConfirmMock = vi.fn();

  const defaultProps = {
    icon: "facebook",
    title: "FACEBOOK",
    url: "https://facebook.com/elamcano",
    onConfirm: onConfirmMock,
    valueFormat: "Enter your social link",
    isEditingAll: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = (props = {}) =>
    render(
      <MemoryRouter>
        <RowSocialLink {...defaultProps} {...props} />
      </MemoryRouter>
    );

  it("renders icon, title, and link correctly", () => {
    renderComponent();
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "https://facebook.com/elamcano"
    );
  });

  it("enters edit mode when clicked", () => {
    renderComponent();
    fireEvent.click(screen.getByText("https://facebook.com/elamcano"));
    expect(
      screen.getByPlaceholderText("Enter your social link")
    ).toBeInTheDocument();
  });

  it("allows editing and confirming new URL", () => {
    renderComponent();
    fireEvent.click(screen.getByText("https://facebook.com/elamcano"));

    const input = screen.getByPlaceholderText("Enter your social link");
    fireEvent.change(input, {
      target: { value: "https://linkedin.com/in/elamcano" },
    });

    const confirmButton = screen.getAllByRole("button")[1];
    fireEvent.click(confirmButton);

    expect(onConfirmMock).toHaveBeenCalledWith(
      "https://linkedin.com/in/elamcano"
    );
  });

  it("cancels editing and keeps the original URL", () => {
    renderComponent();
    fireEvent.click(screen.getByText("https://facebook.com/elamcano"));

    const input = screen.getByPlaceholderText("Enter your social link");
    fireEvent.change(input, {
      target: { value: "https://linkedin.com/in/elamcano" },
    });

    const cancelButton = screen.getAllByRole("button")[0];
    fireEvent.click(cancelButton);

    expect(onConfirmMock).not.toHaveBeenCalled();
    expect(
      screen.getByText("https://facebook.com/elamcano")
    ).toBeInTheDocument();
  });

  it("renders in edit mode if isEditingAll is true", () => {
    renderComponent({ isEditingAll: true });
    expect(
      screen.getByPlaceholderText("Enter your social link")
    ).toBeInTheDocument();
  });

  it("does not enter edit mode if not editable (missing onConfirm)", () => {
    renderComponent({ onConfirm: undefined });
    fireEvent.click(screen.getByText("https://facebook.com/elamcano"));
    expect(
      screen.queryByPlaceholderText("Enter your social link")
    ).toBeInTheDocument();
  });

  it("renders without border if border is false", () => {
    const { container } = renderComponent({ border: false });
    expect(container.firstChild).not.toHaveClass("border-b");
  });
});
