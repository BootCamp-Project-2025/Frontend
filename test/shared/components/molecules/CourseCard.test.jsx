/* eslint-disable react/prop-types */
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, vi, beforeEach, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { CourseCard } from "../../../../src/shared/components/molecules/CourseCard";

vi.mock("../../../../src/shared/components/atoms/Card", () => ({
  Card: ({ children, ...props }) => <div {...props}>{children}</div>,
}));

vi.mock("../../../../src/shared/components/atoms/Icon", () => ({
  Icon: ({ icon }) => <span data-testid={`icon-${icon}`} />,
}));

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async (mod) => {
  const actual = await mod();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("CourseCard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders course info", () => {
    render(
      <MemoryRouter>
        <CourseCard
          name="Test Course"
          description="This is a test course"
          rating="5.0"
        />
      </MemoryRouter>
    );

    expect(screen.getByText("Test Course")).toBeInTheDocument();
    expect(screen.getByText("This is a test course")).toBeInTheDocument();
    expect(screen.getByText("5.0")).toBeInTheDocument();
    expect(screen.getByTestId("icon-star")).toBeInTheDocument();
  });

  it("navigates when card is clicked", () => {
    render(
      <MemoryRouter>
        <CourseCard id="123" redirecTo="/test-path" name="Test Course" />
      </MemoryRouter>
    );

    const card = screen.getByText("Test Course");
    fireEvent.click(card);

    expect(mockNavigate).toHaveBeenCalledWith("/test-path");
  });

  it("shows drop menu when button is clicked", () => {
    render(
      <MemoryRouter>
        <CourseCard showDropOption={true} />
      </MemoryRouter>
    );

    const toggleButton = screen.getByRole("button", { name: "" });
    fireEvent.click(toggleButton);

    expect(screen.getByText("Drop course")).toBeInTheDocument();
  });

  it("calls onDropCourse when drop is confirmed", () => {
    const mockDrop = vi.fn();

    render(
      <MemoryRouter>
        <CourseCard showDropOption={true} onDropCourse={mockDrop} id="myId" />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: "" }));

    fireEvent.click(screen.getByText("Drop course"));

    expect(mockDrop).toHaveBeenCalledWith("myId");
  });

  it("hides menu when clicking outside", () => {
    render(
      <MemoryRouter>
        <div>
          <button data-testid="outside">Outside</button>
          <CourseCard showDropOption={true} />
        </div>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: "" }));
    expect(screen.getByText("Drop course")).toBeInTheDocument();

    fireEvent.mouseDown(screen.getByTestId("outside"));
    expect(screen.queryByText("Drop course")).not.toBeInTheDocument();
  });
});
