import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import RequestCard from "../../../../../src/domains/core/componentes/organism/RequestCard";
import { MemoryRouter } from "react-router-dom";
vi.mock(
  "../../../../../src/domains/core/componentes/molecules/RequestCardButtons",
  () => ({
    default: () => <span data-testid="cardButtons">buttons</span>,
  })
);

vi.mock(
  "../../../../../src/domains/core/componentes/molecules/RequestCardInfo",
  () => ({
    default: () => <span data-testid="cardInfo">info</span>,
  })
);

const request = {
  title: "testTitle",
  description: "testDescription",
  estimation: 0,
};

describe("RequestCard", () => {
  it("renders", () => {
    render(
      <MemoryRouter>
        <RequestCard
          deleteRequest={vi.fn()}
          editRequest={vi.fn()}
          request={request}
        />
      </MemoryRouter>
    );
    const buttons = screen.getByTestId("cardButtons");
    const info = screen.getByTestId("cardInfo");
    expect(buttons).toBeInTheDocument();
    expect(info).toBeInTheDocument();
  });
});
