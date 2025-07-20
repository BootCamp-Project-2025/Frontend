import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { putRequest } from "../../../../../src/shared/api/putRequest";
import GridPersonalDetail from "../../../../../src/domains/student/components/molecules/GridPersonalDetail";

vi.mock("../../../../../src/shared/api/putRequest", () => ({
  putRequest: vi.fn(),
}));

vi.mock("../../../../../src/shared/contexts/ToastContext", () => ({
  useToastContext: () => ({
    showToast: () => {},
  }),
}));

vi.mock("../../../../../src/shared/utils/formatDate", () => ({
  formatDate: (date) => `FormattedDate(${date})`,
}));
vi.mock("../../../../../src/shared/utils/capitalize.js", () => ({
  capitalize: (str) => (str ? str.charAt(0).toUpperCase() + str.slice(1) : ""),
}));

describe("GridPersonalDetail simple test", () => {
  const mockClient = {
    id: 1,
    dateOfBirth: "1990-01-01",
    gender: "female",
    country: "Bolivia",
    city: "La Paz",
    phoneNumber: "+54 911 1234-5678",
  };

  const setClient = vi.fn();

  beforeEach(() => {
    putRequest.mockReset();
    setClient.mockReset();
  });

  it("renders fields correctly", () => {
    render(<GridPersonalDetail client={mockClient} setClient={setClient} />);

    expect(screen.getByText("Date of Birth:")).toBeInTheDocument();
    expect(screen.getByText("FormattedDate(1990-01-01)")).toBeInTheDocument();

    expect(screen.getByText("Gender:")).toBeInTheDocument();
    expect(screen.getByText("Female")).toBeInTheDocument();

    expect(screen.getByText("Country:")).toBeInTheDocument();
    expect(screen.getByText("Bolivia")).toBeInTheDocument();

    expect(screen.getByText("City:")).toBeInTheDocument();
    expect(screen.getByText("La Paz")).toBeInTheDocument();

    expect(screen.getByText("Phone number:")).toBeInTheDocument();
    expect(screen.getByText("+54 911 1234-5678")).toBeInTheDocument();
  });

  it("calls putRequest and setClient on confirm edit", async () => {
    putRequest.mockResolvedValue({ success: true });

    render(<GridPersonalDetail client={mockClient} setClient={setClient} />);

    fireEvent.click(screen.getByText("FormattedDate(1990-01-01)"));

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "2000-12-31" } });

    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[1]);
    await waitFor(() => {
      expect(putRequest).toHaveBeenCalledWith(
        "clients/1",
        expect.objectContaining({ dateOfBirth: "2000-12-31" })
      );
      expect(setClient).toHaveBeenCalled();
    });
  });
});
