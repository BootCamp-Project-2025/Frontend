import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { HeaderButtons } from "../../../../../src/domains/core/componentes/molecules/HeaderButtons";
import { MemoryRouter } from "react-router-dom";

describe("HeaderButtons component", () => {
  const mockSignIn = vi.fn();
  const mockSignUp = vi.fn();
  const mockBecomeTeacher = vi.fn();
  const mockSwitchToTeacher = vi.fn();
  const mockSwitchToStudent = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders Sign In and Sign Up buttons when user is null", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <HeaderButtons
          user={null}
          signIn={mockSignIn}
          signUp={mockSignUp}
          becomeTeacher={mockBecomeTeacher}
          switchToTeacher={mockSwitchToTeacher}
          switchToStudent={mockSwitchToStudent}
        />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Sign In"));
    expect(mockSignIn).toHaveBeenCalled();

    fireEvent.click(screen.getByText("Sign up"));
    expect(mockSignUp).toHaveBeenCalled();
  });

  it("renders Become a Teacher when user is not a teacher and not on /teacher/ route", () => {
    const user = {
      userName: "John",
      avatarURL: "url",
      userEmail: "john@example.com",
      isTeacher: false,
    };

    render(
      <MemoryRouter initialEntries={["/"]}>
        <HeaderButtons
          user={user}
          signIn={mockSignIn}
          signUp={mockSignUp}
          becomeTeacher={mockBecomeTeacher}
          switchToTeacher={mockSwitchToTeacher}
          switchToStudent={mockSwitchToStudent}
        />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Become a Teacher"));
    expect(mockBecomeTeacher).toHaveBeenCalled();
  });

  it("renders Switch to Teacher when user is a teacher and not on /teacher/ route", () => {
    const user = {
      userName: "Jane",
      avatarURL: "url",
      userEmail: "jane@example.com",
      isTeacher: true,
    };

    render(
      <MemoryRouter initialEntries={["/"]}>
        <HeaderButtons
          user={user}
          signIn={mockSignIn}
          signUp={mockSignUp}
          becomeTeacher={mockBecomeTeacher}
          switchToTeacher={mockSwitchToTeacher}
          switchToStudent={mockSwitchToStudent}
        />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Switch to Teacher"));
    expect(mockSwitchToTeacher).toHaveBeenCalled();
  });

  it("renders Switch to Student when on /teacher/ route", () => {
    const user = {
      userName: "Jane",
      avatarURL: "url",
      userEmail: "jane@example.com",
      isTeacher: true,
    };

    render(
      <MemoryRouter initialEntries={["/teacher/dashboard"]}>
        <HeaderButtons
          user={user}
          signIn={mockSignIn}
          signUp={mockSignUp}
          becomeTeacher={mockBecomeTeacher}
          switchToTeacher={mockSwitchToTeacher}
          switchToStudent={mockSwitchToStudent}
        />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Switch to Student"));
    expect(mockSwitchToStudent).toHaveBeenCalled();
  });
});
