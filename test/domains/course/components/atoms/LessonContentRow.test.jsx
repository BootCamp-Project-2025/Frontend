import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import LessonContentRow from "../../../../../src/domains/course/components/atoms/LessonContentRow";

describe("LessonContentRow test component", () => {
  it("renders and click the erase button correctly", () => {
    const eraseResource = vi.fn();
    eraseResource.mockResolvedValue();
    render(
      <LessonContentRow
        name={"testName"}
        url={"testUrl"}
        eraseResource={eraseResource}
      />
    );

    const row = screen.getByText("testName");
    const erase = screen.getByRole("button");
    erase.click();
    expect(row).toBeInTheDocument();
    expect(row).toHaveAttribute("href", "testUrl");
    expect(eraseResource).toHaveBeenCalledWith("testName");
  });
});
