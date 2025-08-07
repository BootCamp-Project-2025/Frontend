import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PendingMessages } from "../../../../../src/domains/core/componentes/organism/PendingMessages";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../../../../../src/shared/providers/AuthProvider";

describe("PendingMessages", () => {
  it("renders pending messages list", () => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <PendingMessages />
        </BrowserRouter>
      </AuthProvider>
    );
    expect(screen.findByText("Pending messages"));
  });
});
