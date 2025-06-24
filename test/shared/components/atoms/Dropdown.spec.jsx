import { Dropdown } from "../../../../src/shared/components/atoms/Dropdown";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

describe("Dropdown atom", () => {
  const mockOptions = [
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3" },
  ];

  it("Dropdown renders with text", () => {
    render(<Dropdown label="Hello world"></Dropdown>);
    expect(screen.getByText("Hello world")).toBeInTheDocument();
  });

  it("Dropdown renders provided options", () => {
    const handleClick = vi.fn();
    render(
      <Dropdown
        label="Hello world"
        onSelect={handleClick}
        options={mockOptions}
      />
    );
    fireEvent.click(screen.getByText("Hello world"));
    expect(screen.getByText("Option 1")).toBeInTheDocument();
  });

  it("Dropdown shows No data when empty data is provided", () => {
    render(<Dropdown label="Dropdown" options={[]} />);
    fireEvent.click(screen.getByText("Dropdown"));
    expect(screen.getByText("No options are available")).toBeInTheDocument();
  });

  it("Dropdown returns selected option on select", () => {
    const handleClick = vi.fn();
    render(
      <Dropdown
        label="Hello world"
        onSelect={handleClick}
        options={mockOptions}
      />
    );
    fireEvent.click(screen.getByText("Hello world"));
    fireEvent.click(screen.getByText("Option 1"));
    expect(handleClick).toBeCalledWith({ label: "Option 1", value: "1" });
  });
});
