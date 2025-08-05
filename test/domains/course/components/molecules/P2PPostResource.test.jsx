import { cleanup, render, screen } from "@testing-library/react";
import { beforeAll, describe, expect, it } from "vitest";
import P2PPostResource from "../../../../../src/domains/course/components/molecules/P2PPostResource";

describe("P2PPostResource component", () => {
  beforeAll(() => {
    cleanup();
  });
  it("Renders correctly", () => {
    render(<P2PPostResource url={"testUrl.com"} />);
    expect(screen.queryByText("testUrl.com")).toBeInTheDocument();
    expect(screen.queryByText("Resource")).toBeInTheDocument();
  });
  it("Does not render if no text was passed", () => {
    render(<P2PPostResource url={undefined} />);
    expect(screen.queryByText("Resource")).not.toBeInTheDocument();
  });
});
