import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import P2PCardButtons from "../../../../../src/domains/course/components/molecules/P2PCardButtons";

describe("P2PCardButtons molecule", () => {
  const erase = vi.fn();
  const edit = vi.fn();
  const complete = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });
  it("renders all the buttons", async () => {
    render(<P2PCardButtons erase={erase} edit={edit} complete={complete} />);
    const buttons = await screen.findAllByRole("button");
    expect(buttons.length).toBe(3);
  });
  it("rendes only complete button", async () => {
    render(<P2PCardButtons complete={complete} />);
    const completeButton = await screen.queryByTestId("complete");
    completeButton.click();
    const eraseButton = await screen.queryByTestId("erase");
    const editButton = await screen.queryByTestId("edit");
    expect(completeButton).toBeInTheDocument();
    expect(complete).toHaveBeenCalled();
    expect(eraseButton).toBeNull();
    expect(editButton).toBeNull();
  });

  it("rendes only erase button", async () => {
    render(<P2PCardButtons erase={erase} />);
    const eraseButton = await screen.queryByTestId("erase");
    const completeButton = await screen.queryByTestId("complete");
    const editButton = await screen.queryByTestId("edit");
    eraseButton.click();
    expect(eraseButton).toBeInTheDocument();
    expect(erase).toHaveBeenCalled();
    expect(completeButton).toBeNull();
    expect(editButton).toBeNull();
  });

  it("rendes only edit button", async () => {
    render(<P2PCardButtons edit={edit} />);
    const completeButton = await screen.queryByTestId("complete");
    const eraseButton = await screen.queryByTestId("erase");
    const editButton = await screen.queryByTestId("edit");
    editButton.click();
    expect(editButton).toBeInTheDocument();
    expect(edit).toHaveBeenCalled();
    expect(eraseButton).toBeNull();
    expect(completeButton).toBeNull();
  });
});
