import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SessionTime from "../../../../../src/domains/course/components/molecules/SessionTime";

const TIME = 1753905286346;

describe("SessionTime molecule", () => {
  it("Shows time correctly", async () => {
    render(<SessionTime timestamp={TIME} />);
    const date = await screen.findByText("30/7/2025");
    const time = await screen.findByText("03:54 p.m.");

    expect(date).toBeInTheDocument();
    expect(time).toBeInTheDocument();
  });
});
