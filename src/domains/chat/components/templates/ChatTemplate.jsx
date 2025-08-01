import { useEffect } from "react";
import ChatInput from "../molecules/ChatInput";
import { ChatHeader } from "../organisms/ChatHeader";
import { ChatMessageList } from "../organisms/ChatMessageList";
import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router-dom";
import { useChat } from "../../hooks/useChat";
import { useAuth } from "../../../../shared/hooks/useAuth";
import { ProposalChatAlert } from "../atoms/ProposalChatAlert";
import { formatInitialP2P } from "../../../../shared/utils/formatInitialP2P";

export default function ChatTemplate({ chatIdProp = null }) {
  const params = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const {
    userId,
    chat,
    setUserId,
    joinChat,
    sendMessage,
    leaveChat,
    closeChat,
    createChat,
  } = useChat();
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
    if (type == "PROPOSAL") {
      if (content.status == "ACCEPTED") {
        createChat(chat.participantsIds).then((newChat) => {
          const newP2PCourse = formatInitialP2P(
            chat,
            user.id,
            content,
            newChat.id
          );
          console.log(newP2PCourse);
          closeChat();
        });
      }
      if (content.status == "REJECTED") closeChat();
    }
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
          {chat.status == "PROPOSAL" || chat.status == "CLOSED" ? (
            <ProposalChatAlert
              chatInfo={{
                id: chat.id,
                proposalTimestamp: new Date(),
                status: chat.status,
                messagesCount: chat.messages.length,
              }}
              userId={user.id}
              handleSendMessage={handleSendMessage}
            />
          ) : null}
          <ChatMessageList
            ownerId={userId}
            messages={chat.messages}
            sendMessage={handleSendMessage}
            chatStatus={chat.status}
          />
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
