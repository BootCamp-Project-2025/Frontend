// import { useEffect, useState } from "react";
import { ChatMessage } from "../molecules/ChatMessage";
import ScrollToBottom from "react-scroll-to-bottom";
import PropTypes from "prop-types";

export function ChatMessageList({ ownerId, messages = [] }) {
  return (
    <ScrollToBottom className="h-full overflow-x-hidden overflow-y-scroll no-scrollbar">
      <div className="px-10 sm:px-20 md:px-30 lg:px-40 xl:px-80 py-2">
        {messages.map((message, index) => {
          return (
            <ChatMessage
              key={index}
              content={message.content}
              iconVariant={message.status}
              time={new Date(message.timestamp)}
              type={message.type}
              variant={message.senderId == ownerId ? "sent" : "received"}
              displayStatus={
                index == messages.length - 1 || message.status == "ERROR"
              }
              marginBottom={
                index == messages.length - 1 ||
                message.senderId != messages[index + 1].senderId
              }
            />
          );
        })}
      </div>
    </ScrollToBottom>
  );
}

ChatMessageList.propTypes = {
  ownerId: PropTypes.string,
  messages: PropTypes.array,
};
