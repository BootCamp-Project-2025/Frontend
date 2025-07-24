import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PendingMessages } from "../../../../../src/domains/core/componentes/organism/PendingMessages";
import { BrowserRouter } from "react-router-dom";

describe("PendingMessages", () => {
  it("renders pending messages list", () => {
    render(
      <BrowserRouter>
        <PendingMessages />
      </BrowserRouter>
    );
    expect(screen.getByText("Pending messages")).toBeInTheDocument();
  });
});
