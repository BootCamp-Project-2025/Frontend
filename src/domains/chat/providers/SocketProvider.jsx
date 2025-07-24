import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import SocketContext from "../contexts/SocketContext";
import { useAuth } from "../../../shared/hooks/useAuth";
import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;
const socket = io(SOCKET_URL);

export function SocketProvider({ children }) {
  const { user, isAuthenticated } = useAuth();
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    socket.connect();
    if (isAuthenticated) {
      socket.on("online-users", (data) => {
        setOnlineUsers(data.onlineUsers);
      });
      socket.emit("user-connected", { userId: user.id });
    }
    return () => {
      socket.disconnect();
    };
  }, [isAuthenticated]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
}

SocketProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
