import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import RequestCardInfo from "../../../../../src/domains/core/componentes/molecules/RequestCardInfo";

describe("RequestCardInfo", () => {
  it("renders", () => {
    render(
      <RequestCardInfo title={"testTitle"} description={"testDescription"} />
    );
    expect(screen.getByText("testTitle")).toBeInTheDocument();
    expect(screen.getByText("testDescription")).toBeInTheDocument();
  });
});
