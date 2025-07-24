import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ProfileDetailCard from "../../../../../src/domains/student/components/organisms/ProfileDetailCard";

describe("ProfileDetailCard", () => {
  it("renders the title and children", () => {
    render(
      <ProfileDetailCard title="Test Title">
        <p>Test Content</p>
      </ProfileDetailCard>
    );

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("renders the edit button by default and triggers onClickEdit", () => {
    const handleClick = vi.fn();

    render(
      <ProfileDetailCard title="Edit Test" onClickEdit={handleClick}>
        <p>Content</p>
      </ProfileDetailCard>
    );

    const editButton = screen.getByRole("button");
    expect(editButton).toBeInTheDocument();

    fireEvent.click(editButton);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not render the edit button if isEditable is false", () => {
    render(
      <ProfileDetailCard title="Non Editable" isEditable={false}>
        <p>Content</p>
      </ProfileDetailCard>
    );

    const buttons = screen.queryAllByRole("button");
    expect(buttons.length).toBe(0);
  });
});
