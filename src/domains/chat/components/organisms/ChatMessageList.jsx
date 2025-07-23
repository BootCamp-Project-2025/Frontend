// import { useEffect, useState } from "react";
import { ChatMessage } from "../molecules/ChatMessage";
import ScrollToBottom from "react-scroll-to-bottom";
import PropTypes from "prop-types";
import { Title } from "../../../../shared/components/atoms/Title";
import { ChatDateDivider } from "../atoms/ChatDateDivider";
import { formatDateLabel } from "../../../../shared/utils/formatDateLabel";

export function ChatMessageList({ ownerId, messages = [] }) {
  let lastLabel = null;
  return (
    <ScrollToBottom
      initialScrollBehavior={messages.length < 11 ? "smooth" : "auto"}
      className="h-full overflow-x-hidden overflow-y-scroll no-scrollbar"
    >
      <div className="px-10 sm:px-10 md:px-10 lg:px-20 xl:px-30 2xl:px-40 3xl:px-70 py-2">
        {messages.length > 0 ? (
          messages.map((message, index) => {
            const label = formatDateLabel(message.timestamp);
            const showDivider = label !== lastLabel;
            lastLabel = label;
            return (
              <>
                {showDivider && <ChatDateDivider label={label} />}
                <ChatMessage
                  key={index}
                  content={message.content}
                  iconVariant={message.status}
                  time={message.timestamp}
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
              </>
            );
          })
        ) : (
          <div className="text-center">
            <Title color="default" size="sm">
              No messages yet...
            </Title>
          </div>
        )}
      </div>
    </ScrollToBottom>
  );
}

ChatMessageList.propTypes = {
  ownerId: PropTypes.string,
  messages: PropTypes.array,
};
