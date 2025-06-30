import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { AvatarMenuDropDown } from "../../../../../src/domains/core/componentes/molecules/AvatarMenuDropDown";

describe("AvatarMenuDropDown component", () => {
  it("does not show dropdown by default", () => {
    render(
      <AvatarMenuDropDown userName="Test User">Menu Content</AvatarMenuDropDown>
    );
    expect(screen.queryByText("Menu Content")).not.toBeInTheDocument();
  });

  it("shows dropdown when avatar is clicked", () => {
    render(
      <AvatarMenuDropDown userName="Test User" avatarURL="/avatar.png">
        Menu Content
      </AvatarMenuDropDown>
    );
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByText("Menu Content")).toBeInTheDocument();
  });
});
