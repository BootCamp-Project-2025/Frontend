import { Button } from "../../../../shared/components/atoms/Button";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { TextEditor } from "../../../../shared/components/molecules/TextEditor";
import { Icon } from "../../../../shared/components/atoms/Icon";
import "./chatinput.css";
import clsx from "clsx";

export default function ChatInput({ handleSubmit = () => {} }) {
  const [content, setContent] = useState(null);
  const [showToolbar, setShowToolbar] = useState(false);
  const editorRef = useRef(null);

  const sendMessage = () => {
    if (!content) return;
    const type = "TEXT";
    const cleanedContent = content.replace(/<p><br\s*\/?><\/p>\s*$/i, "");
    if (cleanedContent.trim() === "") return;
    handleSubmit(cleanedContent, type);
    setContent(null);
    setShowToolbar(false);
  };

  useEffect(() => {
    const refCurrent = editorRef.current;
    if (!refCurrent) return;

    const handleKeyDown = (e) => {
      if (e.key === "Enter" && !e.shiftKey && !showToolbar) {
        e.preventDefault();
        sendMessage();
      }
    };

    refCurrent.addEventListener("keydown", handleKeyDown);
    return () => {
      refCurrent.removeEventListener("keydown", handleKeyDown);
    };
  }, [content]);

  return (
    <div className="px-10 lg:px-20 py-4">
      <div className="flex items-end border-1 border-secondary-300 rounded-2xl chat-input">
        <div className="w-full" ref={editorRef}>
          <TextEditor
            value={content}
            onChange={setContent}
            placeholder="Type your message..."
            showToolbar={showToolbar}
          />
        </div>
        <div
          className={clsx(
            "border-x-1 border-secondary-300",
            !showToolbar ? "self-center" : "self-end mb-1"
          )}
        >
          <Button
            onClick={() => {
              setShowToolbar((prev) => !prev);
            }}
            square
            variant="ghost"
            color="secondary"
            size="sm"
          >
            {showToolbar ? "-" : "+"}
          </Button>
        </div>
        <Button onClick={sendMessage} variant="ghost" className={"self-end"}>
          <Icon icon="send" className={"h-8"} />
        </Button>
      </div>
    </div>
  );
}

ChatInput.propTypes = {
  handleSubmit: PropTypes.func,
};
