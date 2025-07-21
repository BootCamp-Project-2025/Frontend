/* eslint-disable react/prop-types */
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Alert } from "../../../../src/shared/components/molecules/Alert";

vi.mock("../../../../src/shared/components/atoms/Icon", () => ({
  Icon: ({ icon, className }) => (
    <svg data-testid={`icon-${icon}`} className={className}></svg>
  ),
}));

describe("Alert component", () => {
  it("renders with title and description", () => {
    render(<Alert title="Test Title" description="This is a description" />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("This is a description")).toBeInTheDocument();
  });

  it("renders list items correctly", () => {
    const list = ["Item 1", "Item 2"];
    render(<Alert title="List Test" list={list} />);
    list.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  it("renders with correct icon based on type", () => {
    render(<Alert type="success" title="Success!" />);
    expect(screen.getByTestId("icon-checkCircle")).toBeInTheDocument();
  });

  it("renders children content if provided", () => {
    render(
      <Alert>
        <span>Extra Content</span>
      </Alert>
    );
    expect(screen.getByText("Extra Content")).toBeInTheDocument();
  });
});
