import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { describe, expect, test, vi } from "vitest";
import P2PNavbar from "../../../../../src/domains/course/components/molecules/P2PNavbar";

function renderAt(path, save = vi.fn()) {
  const user = userEvent.setup();
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/p2p" element={<P2PNavbar save={save} />}>
          <Route index element={<div>Index</div>} />
          <Route path="posts" element={<div>Posts</div>} />
          <Route path="files" element={<div>Files</div>} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
  return { user, save };
}

describe("P2PNavbar", () => {
  test('calls save("POST") when on /p2p/posts and + is clicked', async () => {
    const { user, save } = renderAt("/p2p/posts");
    const plusBtn = screen.getByRole("button", { name: "+" });

    expect(screen.getByRole("link", { name: "Publications" })).toHaveAttribute(
      "aria-current",
      "page"
    );
    expect(screen.getByRole("link", { name: "Files" })).not.toHaveAttribute(
      "aria-current"
    );

    await user.click(plusBtn);

    expect(save).toHaveBeenCalledTimes(1);
    expect(save).toHaveBeenCalledWith("POST");
  });

  test('calls save("FILE") when on /p2p/files and + is clicked', async () => {
    const { user, save } = renderAt("/p2p/files");
    const plusBtn = screen.getByRole("button", { name: "+" });

    expect(screen.getByRole("link", { name: "Files" })).toHaveAttribute(
      "aria-current",
      "page"
    );
    expect(
      screen.getByRole("link", { name: "Publications" })
    ).not.toHaveAttribute("aria-current");

    await user.click(plusBtn);

    expect(save).toHaveBeenCalledTimes(1);
    expect(save).toHaveBeenCalledWith("FILE");
  });
});
