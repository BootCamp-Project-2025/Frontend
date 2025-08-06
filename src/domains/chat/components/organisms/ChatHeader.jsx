import { useContext, useEffect, useMemo, useState } from "react";
import { Icon } from "../../../../shared/components/atoms/Icon";
import PropTypes from "prop-types";
import axios from "axios";
import SocketContext from "../../contexts/SocketContext";
import { AvatarIcon } from "../../../core/componentes/molecules/AvatarIcon";
import { ChatName } from "../atoms/ChatName";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
export function ChatHeader({ chat, ownerId }) {
  //TODO Implement logic to handle multiple participants
  const { onlineUsers } = useContext(SocketContext);
  const [user, setUser] = useState();

  const participantId = useMemo(() => {
    return chat.participantsIds.filter((p) => p.id != ownerId)[0];
  }, [chat.participantsIds]);

  function fetchUserInfo() {
    axios
      .get(`${API_URL}/users/${participantId}`)
      .then((response) => response.data)
      .then((userResponse) => setUser(userResponse))
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    if (participantId) fetchUserInfo();
  }, [chat.participantsIds]);

  const isOnline = (participantId) => {
    return onlineUsers.includes(participantId);
  };

  return (
    <div className="bg-secondary-50 border-b-1 border-secondary-500 w-full h-16 flex align-middle px-4 py-2 gap-3">
      <div className="aspect-square">
        <AvatarIcon avatarURL={user?.avatarURL} userName={user?.userName} />
      </div>
      <div className="flex flex-col justify-center w-full">
        {chat.name ? (
          <>
            <ChatName
              chat={chat}
              showUserName={false}
              userName={user?.userName}
            />
            {user ? (
              <div className="text-md flex gap-0.5">
                <Icon
                  icon={isOnline(user.id) ? "userOnline" : "userOffline"}
                  className="w-3 h-3 self-center"
                />
                <p>{user.userName}</p>
              </div>
            ) : null}
          </>
        ) : user ? (
          <div className="text-2xl flex gap-1">
            <Icon
              icon={isOnline(user.id) ? "userOnline" : "userOffline"}
              className="w-5 h-5 self-center"
            />
            <p>{user.userName}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

ChatHeader.propTypes = {
  chat: PropTypes.shape({
    name: PropTypes.string,
    participantsIds: PropTypes.arrayOf(PropTypes.string),
    status: PropTypes.oneOf(["ACTIVE", "CLOSED", "P2P", "PROPOSAL"]),
  }),
  ownerId: PropTypes.string,
};
