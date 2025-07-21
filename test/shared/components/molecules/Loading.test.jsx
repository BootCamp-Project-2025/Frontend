import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Loading } from "../../../../src/shared/components/molecules/Loading";

describe("Loader component", () => {
  it("renders default loading text", () => {
    render(<Loading />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders custom loading text", () => {
    render(<Loading text="custom loading text..." />);
    expect(screen.getByText("custom loading text...")).toBeInTheDocument();
  });

  it("renders the spinner element", () => {
    render(<Loading />);
    const spinner = screen.getByRole("status", { hidden: true });
    expect(spinner).toBeInTheDocument();
  });
});
