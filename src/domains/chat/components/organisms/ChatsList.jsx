import { useEffect, useMemo } from "react";
import { useChat } from "../../hooks/useChat";
import { useAuth } from "../../../../shared/hooks/useAuth";
import { Title } from "../../../../shared/components/atoms/Title";
import { ChatListItem } from "../molecules/ChatListItem";
import PropTypes from "prop-types";

export function ChatsList({ selectChat, selectedChat }) {
  const { isAuthenticated, user } = useAuth();
  const { activeChats, fetchActiveChats } = useChat();

  useEffect(() => {
    if (isAuthenticated) {
      fetchActiveChats(user.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const sortedChats = useMemo(() => {
    return sortChatsByLastActivity(activeChats);
  }, [activeChats]);

  function sortChatsByLastActivity(chats) {
    return chats.sort((a, b) => {
      const aDate =
        a.messages.length > 0
          ? new Date(a.messages[a.messages.length - 1].timestamp).getTime()
          : new Date(a.createdAt).getTime();

      const bDate =
        b.messages.length > 0
          ? new Date(b.messages[b.messages.length - 1].timestamp).getTime()
          : new Date(b.createdAt).getTime();

      return bDate - aDate;
    });
  }

  return (
    <div className="flex flex-col w-full">
      {activeChats.length > 0 ? (
        sortedChats.map((chat, index) => {
          return (
            <ChatListItem
              ownerId={user.id}
              key={index}
              chat={chat}
              selectChat={() => selectChat(chat.id)}
              isSelected={chat.id == selectedChat}
            />
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
  );
}

ChatsList.propTypes = {
  selectChat: PropTypes.func,
  selectedChat: PropTypes.string,
};
