import axios from "axios";
import clsx from "clsx";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Title } from "../../../../shared/components/atoms/Title";
import { formatTime } from "../../../../shared/utils/formatTime";
import DOMPurify from "dompurify";
import { Icon } from "../../../../shared/components/atoms/Icon";
import { formatDateLabel } from "../../../../shared/utils/formatDateLabel";

const API_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

const baseStyle =
  "bg-secondary-50 cursor-pointer hover:opacity-70 py-4 px-6 border-b-2 border-secondary-200 max-h-25 overflow-hidden select-none";

export function ChatListItem({
  ownerId,
  chat,
  selectChat = () => {},
  isSelected = false,
}) {
  const lastMessage = chat ? chat.messages[0] : null;
  const [user, setUser] = useState();
  const [hasBeenSelected, setHasBeenSelected] = useState(false);

  function fetchUserInfo() {
    const userId = chat.participantsIds.filter((id) => id != ownerId)[0];
    axios
      .get(`${API_URL}/users/${userId}`)
      .then((response) => response.data)
      .then((userResponse) => {
        setUser(userResponse);
      })
      .catch((error) => console.error(error));
  }

  const renderSenderName = () => {
    if (lastMessage.senderId == ownerId) return "You";
    else {
      if (user) return user.userName;
      else return "Other";
    }
  };

  const renderContent = () => {
    switch (lastMessage.type) {
      case "TEXT":
        return (
          <div
            className="ms-1"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(lastMessage.content),
            }}
          ></div>
        );

      default:
        return <div className="text-danger-500">Unknown type of message</div>;
    }
  };

  const isUnread = () => {
    if (lastMessage && !hasBeenSelected) {
      return (
        lastMessage.senderId != ownerId && lastMessage.status == "DELIVERED"
      );
    } else return false;
  };

  const getFormatedDateLabel = () => {
    return formatDateLabel(
      lastMessage ? lastMessage.timestamp : chat.createdAt
    );
  };

  useEffect(() => {
    fetchUserInfo();
    setHasBeenSelected(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chat]);

  return (
    <div
      key={chat.id}
      onClick={() => {
        setHasBeenSelected(true);
        selectChat(chat.id);
      }}
      className={clsx(
        baseStyle,
        isSelected ? "" : "",
        isSelected ? "bg-secondary-200" : ""
      )}
    >
      <div>
        <div className="truncate w-full flex justify-between">
          <Title size="md" color="default">
            {chat.name.length > 0 ? chat.name : user ? user.userName : "..."}
          </Title>
          <p className="text-sm self-center">
            {getFormatedDateLabel() == "Today"
              ? formatTime(lastMessage ? lastMessage.timestamp : chat.createdAt)
              : getFormatedDateLabel()}
          </p>
        </div>
        {lastMessage ? (
          <div
            className={clsx(
              "w-full overflow-hidden text-ellipsis whitespace-nowrap flex justify-between",
              isUnread() ? "font-bold" : ""
            )}
          >
            <div className="w-full text-sm flex items-baseline justify-start">
              <p>{renderSenderName()}:</p>
              {renderContent()}
            </div>

            {isUnread() ? (
              <div className="mx-2 flex items-center">
                <Icon className="w-4 h-4" icon="newMessage" />
              </div>
            ) : null}
          </div>
        ) : (
          <div className="opacity-60">
            <p className="truncate w-full text-sm">No messages yet...</p>
          </div>
        )}
      </div>
    </div>
  );
}

ChatListItem.propTypes = {
  ownerId: PropTypes.object,
  chat: PropTypes.object,
  selectChat: PropTypes.func,
  isSelected: PropTypes.bool,
};
