import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { HeaderButtons } from "../../../../../src/domains/core/componentes/molecules/HeaderButtons";

describe("HeaderButtons component", () => {
  const mockSignIn = vi.fn();
  const mockSignUp = vi.fn();
  const mockBecomeTeacher = vi.fn();
  const mockSwitchToTeacher = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders Sign In and Sign Up buttons when user is null", () => {
    render(
      <HeaderButtons
        user={null}
        signIn={mockSignIn}
        signUp={mockSignUp}
        becomeTeacher={mockBecomeTeacher}
        switchToTeacher={mockSwitchToTeacher}
      />
    );

    expect(screen.getByText("Sign In")).toBeInTheDocument();
    expect(screen.getByText("Sign up")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Sign In"));
    expect(mockSignIn).toHaveBeenCalled();

    fireEvent.click(screen.getByText("Sign up"));
    expect(mockSignUp).toHaveBeenCalled();
  });

  it("renders Become a Teacher button when user is not a teacher", () => {
    const user = {
      userName: "John",
      avatarURL: "url",
      userEmail: "john@example.com",
      isTeacher: false,
    };

    render(
      <HeaderButtons
        user={user}
        signIn={mockSignIn}
        signUp={mockSignUp}
        becomeTeacher={mockBecomeTeacher}
        switchToTeacher={mockSwitchToTeacher}
      />
    );

    expect(screen.getByText("Become a Teacher")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Become a Teacher"));
    expect(mockBecomeTeacher).toHaveBeenCalled();
  });

  it("renders Switch to Teacher button when user is a teacher", () => {
    const user = {
      userName: "Jane",
      avatarURL: "url",
      userEmail: "jane@example.com",
      isTeacher: true,
    };

    render(
      <HeaderButtons
        user={user}
        signIn={mockSignIn}
        signUp={mockSignUp}
        becomeTeacher={mockBecomeTeacher}
        switchToTeacher={mockSwitchToTeacher}
      />
    );

    expect(screen.getByText("Switch to Teacher")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Switch to Teacher"));
    expect(mockSwitchToTeacher).toHaveBeenCalled();
  });
});
