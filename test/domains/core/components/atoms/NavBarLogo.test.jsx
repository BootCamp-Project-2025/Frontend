import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { NavBarLogo } from "../../../../../src/domains/core/componentes/atoms/NavBarLogo";

describe("NavBarLogo component", () => {
  it("renders the logo image with correct alt text", () => {
    render(
      <MemoryRouter>
        <NavBarLogo />
      </MemoryRouter>
    );

    const logo = screen.getByAltText("Logo LTCrowd");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute(
      "src",
      expect.stringContaining("LTCrowdLogo.svg")
    );
  });
});
