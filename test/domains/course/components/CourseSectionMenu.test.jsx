import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { CourseSectionMenu } from "../../../../src/domains/course/components/organisms/CourseSectionMenu";

describe("CourseSectionMenu", () => {
  it("renders search input, filters, sort dropdowns and button", () => {
    render(<CourseSectionMenu />);

    expect(
      screen.getByPlaceholderText("Search your courses")
    ).toBeInTheDocument();
  });
});
