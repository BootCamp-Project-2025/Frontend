import { render, screen } from "@testing-library/react";
import { beforeAll, describe, expect, it, vi } from "vitest";
import PostForm from "../../../../../src/domains/course/components/organisms/PostForm";
import userEvent from "@testing-library/user-event";

vi.mock("../../../../../src/shared/components/molecules/TextEditor", () => ({
  // eslint-disable-next-line react/prop-types
  TextEditor: ({ value, onChange, placeholder }) => (
    <textarea
      aria-label="Description"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  ),
}));

describe("PostForm organism", () => {
  beforeAll(() => {
    vi.clearAllMocks();
  });
  const saveOrEditMock = vi.fn();
  const closePopupMock = vi.fn();
  const testPost = {
    id: "testId",
    title: "Example title",
    description: "This is a description",
    url: "https://youtube.com",
    creationDate: new Date(),
  };
  it("Renders correctly", async () => {
    render(<PostForm />);
    const title = await screen.findByText("Post");
    expect(title).toBeInTheDocument();
  });

  it("Renders with data if a post was send", async () => {
    render(<PostForm post={testPost} />);
    const title = await screen.findByDisplayValue("Example title");
    const description = await screen.findByText("This is a description");
    const url = await screen.findByDisplayValue("https://youtube.com");
    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(url).toBeInTheDocument();
  });

  it("Submits the form correctly", async () => {
    render(
      <PostForm
        post={testPost}
        saveOrEdit={saveOrEditMock}
        closePopup={closePopupMock}
      />
    );
    const saveButton = await screen.findByText("Save");
    await userEvent.click(saveButton);
    expect(saveOrEditMock).toHaveBeenCalled();
    expect(closePopupMock).toHaveBeenCalled();
  });

  it("Show error if url is not valid", async () => {
    render(<PostForm />);
    const urlInput = await screen.findByPlaceholderText(
      "Add an aditional link"
    );
    const saveButton = await screen.findByText("Save");
    await userEvent.type(urlInput, "bad url");
    await userEvent.click(saveButton);
    const error = await screen.findByText("Not a valid url");
    expect(error).toBeInTheDocument();
  });

  it("Show error if description is to short", async () => {
    render(<PostForm />);
    const descriptionInput = await screen.findByPlaceholderText(
      "Enter a description"
    );
    const saveButton = await screen.findByText("Save");
    await userEvent.type(descriptionInput, "123");
    await userEvent.click(saveButton);
    const error = await screen.findByText(
      "Description should be more than 10 characters"
    );
    expect(error).toBeInTheDocument();
  });

  it("Show error if the title is missing", async () => {
    render(<PostForm />);
    const saveButton = await screen.findByText("Save");
    await userEvent.click(saveButton);
    const error = await screen.findByText("Title is required");
    expect(error).toBeInTheDocument();
  });

  it("Show error if the title is to short", async () => {
    render(<PostForm />);
    const titleInput = await screen.findByPlaceholderText(
      "Add a title to the post"
    );
    const saveButton = await screen.findByText("Save");
    await userEvent.type(titleInput, "123");
    await userEvent.click(saveButton);
    const error = await screen.findByText(
      "Title should be more than 5 characters"
    );
    expect(error).toBeInTheDocument();
  });

  it("Show error if there is no description or resource url", async () => {
    render(<PostForm />);
    const titleInput = await screen.findByPlaceholderText(
      "Add a title to the post"
    );
    const saveButton = await screen.findByText("Save");
    await userEvent.type(titleInput, "test title");
    await userEvent.click(saveButton);
    const error = await screen.findByText(
      "A description or resource is needed"
    );
    expect(error).toBeInTheDocument();
  });
});
