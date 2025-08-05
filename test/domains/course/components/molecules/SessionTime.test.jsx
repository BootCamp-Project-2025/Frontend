import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SessionTime from "../../../../../src/domains/course/components/molecules/SessionTime";

const TIME = "2025-07-30T15:54:00";

const date = new Date(TIME);
describe("SessionTime molecule", () => {
  it("Shows time correctly", async () => {
    render(<SessionTime timestamp={TIME} />);
    const dateText = await screen.findByText(date.toLocaleDateString());
    const timeText = await screen.findByText(
      date.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
      })
    );

    expect(dateText).toBeInTheDocument();
    expect(timeText).toBeInTheDocument();
  });
});
