import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AvatarMenuCard } from "../../../../../src/domains/core/componentes/molecules/AvatarMenuCard";

describe("AvatarMenuCard component", () => {
  it("renders user name and email", () => {
    render(
      <AvatarMenuCard
        userName="Alice Johnson"
        userEmail="alice@example.com"
        avatarURL="/avatar.jpg"
      />
    );

    expect(screen.getByText("Alice Johnson")).toBeInTheDocument();
    expect(screen.getByText("alice@example.com")).toBeInTheDocument();
  });

  it("renders AvatarIcon wiWth the correct props", () => {
    render(
      <AvatarMenuCard
        userName="Bob"
        userEmail="bob@example.com"
        avatarURL="/bob.jpg"
      />
    );

    const avatar = screen.getByAltText("User avatar");
    expect(avatar).toBeInTheDocument();
  });

  it("uses default props when none are provided", () => {
    render(<AvatarMenuCard />);
    expect(screen.getByText("User Name")).toBeInTheDocument();
    expect(screen.getByText("user@gmail.com")).toBeInTheDocument();
  });
});
