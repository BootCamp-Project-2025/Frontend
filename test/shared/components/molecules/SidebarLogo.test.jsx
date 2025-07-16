import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import { SidebarLogo } from "../../../../src/shared/components/molecules/SidebarLogo";

const renderWithRouter = (ui) => {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
};

describe("SidebarLogo", () => {
  it("renders the LT logo always", () => {
    renderWithRouter(<SidebarLogo open={false} />);
    const ltLogo = screen.getByAltText("ltcrowdLogoLt");
    expect(ltLogo).toBeInTheDocument();
  });

  it("hides the 'Crowd' logo when open is false", () => {
    renderWithRouter(<SidebarLogo open={false} />);
    const crowdLogo = screen.getByAltText("ltcrowdLogoCrowd");
    expect(crowdLogo).toHaveClass("opacity-0");
  });

  it("shows the 'Crowd' logo when open is true", () => {
    renderWithRouter(<SidebarLogo open={true} />);
    const crowdLogo = screen.getByAltText("ltcrowdLogoCrowd");
    expect(crowdLogo).toHaveClass("opacity-100");
  });

  it("navigates to the correct route", () => {
    renderWithRouter(<SidebarLogo route="/home" />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/home");
  });
});
