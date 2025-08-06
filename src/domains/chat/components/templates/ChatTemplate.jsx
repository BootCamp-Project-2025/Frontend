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
import { postRequest } from "../../../../shared/api/postRequest";

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

  const handleSendMessage = async (content, type) => {
    sendMessage(content, type);
    if (type == "PROPOSAL") {
      if (content.status == "ACCEPTED") {
        try {
          const newChat = await createChat({
            name: chat.name,
            participantsIds: chat.participantsIds,
            status: "P2P",
          });

          const newP2PCourseInfo = formatInitialP2P(
            chat,
            user.id,
            content,
            newChat.id
          );

          const p2pResponse = await postRequest("p2pCourses", newP2PCourseInfo);
          const newP2p = p2pResponse.data.data;
          closeChat();
          setTimeout(() => {
            navigate(`../p2p-course/${newP2p.id}/posts`);
          }, 3000);
        } catch (error) {
          console.error(error);
        }
      }
      if (content.status == "REJECTED") closeChat();
    }
  };

  return (
    // Container height to fill screen must be: h-[calc(100vh-<header heigh>)], hide footer
    <div className="h-full flex flex-col overflow-y-hidden">
      {chat ? (
        <>
          <ChatHeader chat={chat} ownerId={user.id} />
          {chat.status == "PROPOSAL" || chat.status == "CLOSED" ? (
            <ProposalChatAlert
              chatInfo={{
                id: chat.id,
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
