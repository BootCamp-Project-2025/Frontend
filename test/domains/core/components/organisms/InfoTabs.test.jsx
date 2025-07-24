import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { InfoTabs } from "../../../../../src/domains/core/componentes/organism/InfoTabs";
import { BrowserRouter } from "react-router-dom";

describe("InfoTabs", () => {
  it("renders with default props and displays the title", () => {
    render(
      <BrowserRouter>
        <InfoTabs title="Test Title" />
      </BrowserRouter>
    );
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("renders Tabs if tabs is true", () => {
    render(
      <BrowserRouter>
        <InfoTabs title="Test Title" tabs={true} />
      </BrowserRouter>
    );
    expect(screen.getByText("Table")).toBeInTheDocument();
    expect(screen.getByText("Graphic")).toBeInTheDocument();
  });

  it("does not render Tabs if tabs is false", () => {
    render(
      <BrowserRouter>
        <InfoTabs title="Test Title" tabs={false} />
      </BrowserRouter>
    );
    expect(screen.queryByText("Table")).not.toBeInTheDocument();
    expect(screen.queryByText("Graphic")).not.toBeInTheDocument();
  });

  it("Link navigates to the correct path", () => {
    render(
      <BrowserRouter>
        <InfoTabs title="Test Title" path="/test-path" />
      </BrowserRouter>
    );
    expect(screen.getByRole("link")).toHaveAttribute("href", "/test-path");
  });
});
