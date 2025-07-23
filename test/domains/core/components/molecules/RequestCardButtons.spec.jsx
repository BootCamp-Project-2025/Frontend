import { screen } from "@testing-library/dom";
import { cleanup, render } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import RequestCardButtons from "../../../../../src/domains/core/componentes/molecules/RequestCardButtons";

beforeEach(() => {
  cleanup();
});

describe("RequestCardButtons", () => {
  const openRequestFunction = vi.fn();
  const editRequestFunction = vi.fn();
  const deleteRequestFunction = vi.fn();

  it("renders correctly", () => {
    render(
      <RequestCardButtons
        deleteRequest={deleteRequestFunction}
        editRequest={editRequestFunction}
        openRequest={openRequestFunction}
      />
    );
    const openButton = screen.getByTestId("openButton");
    const EditButton = screen.getByTestId("editButton");
    const deleteButton = screen.getByTestId("deleteButton");
    expect(openButton).toBeInTheDocument();
    expect(EditButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
  });
  it("calls the open button function", () => {
    render(
      <RequestCardButtons
        deleteRequest={deleteRequestFunction}
        editRequest={editRequestFunction}
        openRequest={openRequestFunction}
      />
    );
    const openButton = screen.getByTestId("openButton");
    openButton.click();
    expect(openRequestFunction).toHaveBeenCalled();
  });
  it("calls the edit button function", () => {
    render(
      <RequestCardButtons
        deleteRequest={deleteRequestFunction}
        editRequest={editRequestFunction}
        openRequest={openRequestFunction}
      />
    );
    const EditButton = screen.getByTestId("editButton");
    EditButton.click();
    expect(editRequestFunction).toHaveBeenCalled();
  });
  it("calls the delete button function", () => {
    render(
      <RequestCardButtons
        deleteRequest={deleteRequestFunction}
        editRequest={editRequestFunction}
        openRequest={openRequestFunction}
      />
    );
    const deleteButton = screen.getByTestId("deleteButton");
    deleteButton.click();
    expect(deleteRequestFunction).toHaveBeenCalled();
  });
});
