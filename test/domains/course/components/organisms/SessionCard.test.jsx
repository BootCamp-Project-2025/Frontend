import { render, screen, fireEvent } from "@testing-library/react";
import SessionCard from "../../../../../src/domains/course/components/organisms/SessionCard";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock(
  "../../../../../src/domains/course/components/molecules/P2PCardButtons",
  () => ({
    default: ({ erase, edit, complete }) => (
      <div>
        <button onClick={erase}>erase</button>
        <button onClick={edit}>edit</button>
        <button onClick={complete}>complete</button>
      </div>
    ),
  })
);

describe("SessionCard", () => {
  const mockSession = {
    id: "123",
    url: "https://example.com",
    dateOfTheSession: new Date(),
    status: "PENDING",
  };

  const mockErase = vi.fn();
  const mockEdit = vi.fn();
  const mockComplete = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders completed status when session is completed", () => {
    render(
      <SessionCard
        session={{ ...mockSession, status: "COMPLETED" }}
        erase={mockErase}
        edit={mockEdit}
        complete={mockComplete}
        className="test-class"
      />
    );

    expect(screen.getByText(/completed/i)).toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("renders action buttons when session is not completed", () => {
    render(
      <SessionCard
        session={mockSession}
        erase={mockErase}
        edit={mockEdit}
        complete={mockComplete}
        className="test-class"
      />
    );

    expect(screen.getByRole("button", { name: /edit/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /erase/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /complete/i })
    ).toBeInTheDocument();
  });

  it("calls edit with 'SESSION' and session when edit button is clicked", () => {
    render(
      <SessionCard
        session={mockSession}
        erase={mockErase}
        edit={mockEdit}
        complete={mockComplete}
        className="test-class"
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /edit/i }));
    expect(mockEdit).toHaveBeenCalledWith("SESSION", mockSession);
  });

  it("calls erase with 'SESSION' and session.id when erase button is clicked", () => {
    render(
      <SessionCard
        session={mockSession}
        erase={mockErase}
        edit={mockEdit}
        complete={mockComplete}
        className="test-class"
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /erase/i }));
    expect(mockErase).toHaveBeenCalledWith("SESSION", mockSession.id);
  });

  it("calls complete with session.id when complete button is clicked", () => {
    render(
      <SessionCard
        session={mockSession}
        erase={mockErase}
        edit={mockEdit}
        complete={mockComplete}
        className="test-class"
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /complete/i }));
    expect(mockComplete).toHaveBeenCalledWith(mockSession.id);
  });

  it("renders the session link correctly", () => {
    render(
      <SessionCard
        session={mockSession}
        erase={mockErase}
        edit={mockEdit}
        complete={mockComplete}
        className="test-class"
      />
    );

    const link = screen.getByRole("link", { name: mockSession.url });
    expect(link).toHaveAttribute("href", mockSession.url);
    expect(link).toHaveAttribute("target", "_blank");
  });
});
