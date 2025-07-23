import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import LessonContentGroup from "../../../../../src/domains/course/components/organisms/LessonContentGroup";

describe("LessonContentGroup test component", () => {
  it("rednders correctly", () => {
    render(<LessonContentGroup title={"testTitle"} resources={[]} />);
    const list = screen.getByText("testTitle");
    expect(list).toBeInTheDocument();
  });
  it("rednders a list of urls", () => {
    render(
      <LessonContentGroup
        title={"testTitle"}
        resources={["http://home.com", "http://home1.com"]}
      />
    );
    const elem = screen.getByText("http://home.com");
    const elem1 = screen.getByText("http://home1.com");
    expect(elem).toHaveAttribute("href", "http://home.com");
    expect(elem1).toHaveAttribute("href", "http://home1.com");
    expect(elem).toBeInTheDocument();
    expect(elem1).toBeInTheDocument();
  });

  it("rednders a list of names and urls", () => {
    render(
      <LessonContentGroup
        title={"testTitle"}
        resources={[
          { name: "testName", url: "http://home.com" },
          { name: "testName1", url: "http://home1.com" },
        ]}
      />
    );
    const elem = screen.getByText("testName");
    const elem1 = screen.getByText("testName1");
    expect(elem).toHaveAttribute("href", "http://home.com");
    expect(elem1).toHaveAttribute("href", "http://home1.com");
    expect(elem).toBeInTheDocument();
    expect(elem1).toBeInTheDocument();
  });
});
