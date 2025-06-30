import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeaderOption } from "../../../../../src/domains/core/componentes/atoms/HeaderOption";
import { MemoryRouter } from "react-router";

describe("HeaderOption component", () => {
  it("renders the link with children text", () => {
    render(
      <MemoryRouter initialEntries={["/home"]}>
        <HeaderOption to="/home">Home</HeaderOption>
      </MemoryRouter>
    );

    const linkElement = screen.getByText("Home");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/home");
  });
  it("applies active color style when pathname matches 'to'", () => {
    render(
      <MemoryRouter initialEntries={["/dashboard"]}>
        <HeaderOption to="/dashboard">Dashboard</HeaderOption>
      </MemoryRouter>
    );

    const linkElement = screen.getByText("Dashboard");
    expect(linkElement).toHaveStyle("color: var(--color-blue-500)");
  });

  it("does not apply active color style when pathname does not match", () => {
    render(
      <MemoryRouter initialEntries={["/profile"]}>
        <HeaderOption to="/dashboard">Dashboard</HeaderOption>
      </MemoryRouter>
    );

    const linkElement = screen.getByText("Dashboard");
    expect(linkElement).not.toHaveStyle("color: var(--color-blue-500)");
  });
});
