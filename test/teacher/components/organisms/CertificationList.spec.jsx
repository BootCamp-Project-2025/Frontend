import { render, screen, fireEvent } from "@testing-library/react";
import CertificationList from "../../../../src/domains/teacher/components/organisms/CertificationList";
import * as usePopupModule from "../../../../src/shared/hooks/usePopup";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { act } from "react-dom/test-utils";

vi.mock(
  "../../../../src/domains/teacher/components/molecules/CertificationCard",
  () => ({
    default: ({ certification, onEdit }) => (
      <div data-testid="cert-card">
        <span>{certification.name}</span>
        {onEdit && <button onClick={() => onEdit(certification)}>Edit</button>}
      </div>
    ),
  })
);

vi.mock("../../../../src/shared/components/atoms/Button", () => ({
  // eslint-disable-next-line react/prop-types
  Button: ({ children, ...props }) => <button {...props}>{children}</button>,
}));

vi.mock(
  "../../../../src/domains/teacher/components/molecules/CertificationForm",
  () => ({
    default: () => <div>CertificationForm</div>,
  })
);

describe("CertificationList", () => {
  let openPopupMock, closePopupMock;

  beforeEach(() => {
    openPopupMock = vi.fn();
    closePopupMock = vi.fn();
    vi.spyOn(usePopupModule, "default").mockReturnValue({
      openPopup: openPopupMock,
      closePopup: closePopupMock,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders the list of certifications", () => {
    render(<CertificationList />);
    expect(screen.getByText("Certifications")).toBeInTheDocument();
    expect(screen.getAllByTestId("cert-card")).toHaveLength(3);
    expect(screen.getByText("Certification 1")).toBeInTheDocument();
    expect(screen.getByText("Certification 2")).toBeInTheDocument();
    expect(screen.getByText("Certification 3")).toBeInTheDocument();
  });

  it("opens add certification popup when Add Certification button is clicked", () => {
    render(<CertificationList />);
    fireEvent.click(screen.getByText(/Add Certification/i));
    expect(openPopupMock).toHaveBeenCalledWith(
      expect.any(Function),
      expect.objectContaining({
        closePopup: closePopupMock,
        onSubmit: expect.any(Function),
        certification: undefined,
      }),
      true
    );
  });

  it("opens edit certification popup when Edit is clicked", () => {
    render(<CertificationList />);
    fireEvent.click(screen.getAllByText("Edit")[0]);
    expect(openPopupMock).toHaveBeenCalledWith(
      expect.any(Function),
      expect.objectContaining({
        closePopup: closePopupMock,
        onSubmit: expect.any(Function),
        onDelete: expect.any(Function),
        certification: expect.objectContaining({ name: "Certification 1" }),
      }),
      true
    );
  });

  it("adds a new certification when onAddCertification is called", () => {
    render(<CertificationList />);
    fireEvent.click(screen.getByText(/Add Certification/i));
    const onSubmit = openPopupMock.mock.calls[0][1].onSubmit;
    act(() => {
      onSubmit({ name: "New Cert", institution: "XYZ", year: 2020 });
    });
    expect(
      screen.getByText((text) => text.includes("New Cert"))
    ).toBeInTheDocument();
    expect(screen.getAllByTestId("cert-card")).toHaveLength(4);
  });

  it("edits a certification when onEditCertification is called", () => {
    render(<CertificationList />);
    fireEvent.click(screen.getAllByText("Edit")[0]);
    const onSubmit = openPopupMock.mock.calls[0][1].onSubmit;
    act(() => {
      onSubmit({
        id: "1",
        name: "Updated Cert",
        institution: "ABC",
        year: 2015,
      });
    });
    expect(
      screen.getByText((text) => text.includes("Updated Cert"))
    ).toBeInTheDocument();
    expect(screen.queryByText("Certification 1")).not.toBeInTheDocument();
  });

  it("deletes a certification when onDeleteCertification is called", async () => {
    render(<CertificationList />);
    fireEvent.click(screen.getAllByText("Edit")[0]);
    const onDelete = openPopupMock.mock.calls[0][1].onDelete;
    await act(() => onDelete("1"));
    expect(screen.queryByText("Certification 1")).not.toBeInTheDocument();
    expect(screen.getAllByTestId("cert-card")).toHaveLength(2);
  });
});
