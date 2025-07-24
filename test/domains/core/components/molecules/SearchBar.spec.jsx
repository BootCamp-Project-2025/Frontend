import { cleanup, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import SearchBar from "../../../../../src/shared/components/molecules/SearchBar";
import userEvent from "@testing-library/user-event";

describe("SearchBar", () => {
  beforeEach(() => {
    cleanup();
  });
  it("renders", () => {
    render(<SearchBar />);
    const input = screen.getByTestId("searchInput");
    const searchButton = screen.getByRole("button");
    expect(input).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });
  it("input works", async () => {
    render(<SearchBar />);
    const input = screen.getByTestId("searchInput");
    await userEvent.type(input, "exampleTest");
    expect(input.value).toBe("exampleTest");
  });
});
