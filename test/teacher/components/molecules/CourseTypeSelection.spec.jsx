import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import CourseTypeSelection from "../../../../src/domains/teacher/components/molecules/CourseTypeSelection";

vi.mock("../../../../src/shared/hooks/usePopup", () => {
  return {
    __esModule: true,
    default: vi.fn(),
  };
});

import usePopup from "../../../../src/shared/hooks/usePopup";

describe("CourseTypeSelection", () => {
  let openPopupMock;
  let closePopupMock;

  beforeEach(() => {
    openPopupMock = vi.fn();
    closePopupMock = vi.fn();

    usePopup.mockReturnValue({
      openPopup: openPopupMock,
      closePopup: closePopupMock,
    });
  });

  it("renders both course type buttons", () => {
    render(<CourseTypeSelection addCourse={vi.fn()} />);
    expect(screen.getByText(/Static Course/i)).toBeInTheDocument();
    expect(screen.getByText(/P2P Course/i)).toBeInTheDocument();
  });

  it("calls openPopup with static type when Static Course is clicked", () => {
    const addCourse = vi.fn();
    render(<CourseTypeSelection addCourse={addCourse} />);
    fireEvent.click(screen.getByText(/Static Course/i));

    expect(openPopupMock).toHaveBeenCalled();
    const callArgs = openPopupMock.mock.calls[0];

    expect(callArgs[1].title).toBe("Fill this information");
    expect(callArgs[1].children.props.type).toBe("static");
    expect(callArgs[1].children.props.addCourse).toBe(addCourse);
  });

  it("calls openPopup with p2p type when P2P Course is clicked", () => {
    const addCourse = vi.fn();
    render(<CourseTypeSelection addCourse={addCourse} />);
    fireEvent.click(screen.getByText(/P2P Course/i));

    expect(openPopupMock).toHaveBeenCalled();
    const callArgs = openPopupMock.mock.calls[0];

    expect(callArgs[1].children.props.type).toBe("p2p");
  });
});
