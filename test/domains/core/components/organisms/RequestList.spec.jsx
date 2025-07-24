import { cleanup, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import RequestList from "../../../../../src/domains/core/componentes/organism/RequestList";

vi.mock(
  "../../../../../src/domains/core/componentes/organism/RequestCard",
  () => ({
    default: ({ request }) => <p data-testid="testCard">{request.title}</p>,
  })
);

const handleCreateRequestMock = vi.fn();
const requestList = [
  {
    title: "testTitle",
    despcription: "testDescription",
    estimation: 0,
  },
];

describe("RequestList", () => {
  beforeEach(() => {
    cleanup();
  });
  it("renders", () => {
    render(
      <RequestList
        handleCreateRequest={handleCreateRequestMock}
        requestList={requestList}
      />
    );
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByText("testTitle")).toBeInTheDocument();
  });
  it("button call handleCreateRequestMock function", () => {
    render(
      <RequestList
        handleCreateRequest={handleCreateRequestMock}
        requestList={requestList}
      />
    );
    screen.getByRole("button").click();
    expect(handleCreateRequestMock).toHaveBeenCalled();
  });
  it("renders multiple objects", () => {
    const requestList = [
      {
        title: "testTitle",
        despcription: "testDescription",
        estimation: 0,
      },
      {
        title: "testTitle",
        despcription: "testDescription",
        estimation: 0,
      },
      {
        title: "testTitle",
        despcription: "testDescription",
        estimation: 0,
      },
    ];
    render(
      <RequestList
        handleCreateRequest={handleCreateRequestMock}
        requestList={requestList}
      />
    );
    expect(screen.getAllByTestId("testCard").length).toBe(3);
  });
});
