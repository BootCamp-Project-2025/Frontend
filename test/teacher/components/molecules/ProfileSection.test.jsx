import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProfileSection } from "../../../../src/domains/teacher/components/molecules/ProfileSection";

describe("ProfileSection", () => {
  it("renders the title and children correctly", () => {
    render(
      <ProfileSection title="Profile Info">
        <p>content</p>
      </ProfileSection>
    );
    expect(screen.getByText("Profile Info")).toBeInTheDocument();
    expect(screen.getByText("content")).toBeInTheDocument();
  });
});
