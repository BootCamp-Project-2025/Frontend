import { useEffect } from "react";
import ChatInput from "../molecules/ChatInput";
import { ChatHeader } from "../organisms/ChatHeader";
import { ChatMessageList } from "../organisms/ChatMessageList";
import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router-dom";
import { useChat } from "../../hooks/useChat";
import { useAuth } from "../../../../shared/hooks/useAuth";

export default function ChatTemplate({ chatIdProp = null }) {
  // const [chatReducer, dispatch] = useReducer(reducer);
  const params = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { userId, chat, setUserId, joinChat, sendMessage, leaveChat } =
    useChat();
  const chatId = chatIdProp ?? params.chatId;

  useEffect(() => {
    if (isAuthenticated) {
      setUserId(user.id);
      joinChat(chatId, user.id);
    }
    if (isAuthenticated && chat) {
      if (!chat.participantsIds.includes(userId)) navigate("..");
    }
    return () => {
      leaveChat(chatId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, chatIdProp]);

  const handleSendMessage = (content, type) => {
    sendMessage(content, type);
  };
  return (
    // Container height to fill screen must be: h-[calc(100vh-<header heigh>)], hide footer
    <div className="h-full flex flex-col overflow-y-hidden">
      {chat ? (
        <>
          <ChatHeader
            participantsIds={chat.participantsIds.filter((id) => id != userId)}
            chatName={chat.name}
          />
          <ChatMessageList ownerId={userId} messages={chat.messages} />
          <ChatInput
            disabled={chat.status == "CLOSED"}
            handleSubmit={handleSendMessage}
          />
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

ChatTemplate.propTypes = {
  chatIdProp: PropTypes.string,
};
