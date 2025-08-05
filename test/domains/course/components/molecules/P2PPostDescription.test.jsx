import { cleanup, render, screen } from "@testing-library/react";
import { beforeAll, describe, expect, it } from "vitest";
import P2PPostDescription from "../../../../../src/domains/course/components/molecules/P2PPostDescription";

describe("P2PPostDescription component", () => {
  beforeAll(() => {
    cleanup();
  });
  it("Renders correctly", () => {
    render(<P2PPostDescription text={"testText"} />);
    expect(screen.queryByText("testText")).toBeInTheDocument();
    expect(screen.queryByText("Description")).toBeInTheDocument();
  });
  it("Does not render if no text was passed", () => {
    render(<P2PPostDescription text={undefined} />);
    expect(screen.queryByText("Description")).not.toBeInTheDocument();
  });
});
