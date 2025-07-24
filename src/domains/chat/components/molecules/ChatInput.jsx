import { Button } from "../../../../shared/components/atoms/Button";
import PropTypes from "prop-types";
import { useState } from "react";
import { TextEditor } from "../../../../shared/components/molecules/TextEditor";

export default function ChatInput({ handleSubmit = () => {} }) {
  const [content, setContent] = useState(null);
  const [showToolbar, setShowToolbar] = useState(false);
  const sendMessage = () => {
    const type = "TEXT";
    handleSubmit(content, type);
    setContent(null);
    setShowToolbar(false);
  };
  return (
    <div className="px-10 lg:px-20 py-4 flex items-end">
      <div className="w-full">
        <TextEditor
          value={content}
          onChange={setContent}
          placeholder="Type your message..."
          showToolbar={showToolbar}
        />
      </div>
      <div>
        <Button
          onClick={() => {
            setShowToolbar((prev) => !prev);
          }}
          variant="ghost"
          color="secondary"
        >
          +
        </Button>
      </div>
      <div>
        <Button onClick={sendMessage}>Send</Button>
      </div>
      {/* </div> */}
    </div>
  );
}

ChatInput.propTypes = {
  handleSubmit: PropTypes.func,
};
