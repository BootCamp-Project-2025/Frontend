import { useContext, useEffect, useReducer } from "react";
import SocketContext from "../contexts/SocketContext";
import { v4 as uuid } from "uuid";

const initialState = { userId: null, chat: null, activeChats: [] };

const reducer = (state, action) => {
  // console.log("prev-state", state, "\naction", action);

  switch (action.type) {
    case "SET_USERID": {
      const { userId } = action.payload;
      if (userId) return { ...state, userId };
      return state;
    }

    case "FETCH_CHAT": {
      const { chat } = action.payload;
      if (chat) return { ...state, chat };
      return state;
    }
    case "LEAVE_CHAT": {
      return { ...state, chat: null };
    }
    case "RECEIVE_MESSAGE": {
      const { message } = action.payload;
      const isRepeated = state.chat.messages.some((m) => m.id == message.id);
      if (!isRepeated)
        return {
          ...state,
          chat: { ...state.chat, messages: [...state.chat.messages, message] },
        };
      return state;
    }
    case "SEND_MESSAGE": {
      const { message } = action.payload;
      return {
        ...state,
        chat: { ...state.chat, messages: [...state.chat.messages, message] },
      };
    }
    case "UPDATE_MESSAGE": {
      const { message } = action.payload;
      return {
        ...state,
        chat: {
          ...state.chat,
          messages: state.chat.messages.map((m) => {
            if (m.id == message.id) return message;
            return m;
          }),
        },
      };
    }
    case "FETCH_ACTIVE_CHATS": {
      const { chats } = action.payload;
      return { ...state, activeChats: chats };
    }
    case "UPDATE_ACTIVE_CHAT": {
      if (state.activeChats.length > 0) {
        const { message } = action.payload;
        return {
          ...state,
          activeChats: state.activeChats.map((chat) => {
            if (chat.id == message.chatId) {
              return { ...chat, messages: [message] };
            } else return chat;
          }),
        };
      } else return state;
    }
    case "ADD_ACTIVE_CHAT": {
      const { chat } = action.payload;
      if (!state.activeChats.some((c) => c.id == chat.id))
        return { ...state, activeChats: [...state.activeChats, chat] };
      else return state;
    }
    case "UPDATE_MESSAGES_STATUS": {
      return {
        ...state,
        chat: {
          ...state.chat,
          messages: state.chat.messages.map((m) => {
            if (m.senderId == state.userId) return { ...m, status: "READ" };
            else return m;
          }),
        },
      };
    }
    case "UPDATE_CHAT": {
      if (state.chat) {
        const { chat } = action.payload;
        return {
          ...state,
          chat: {
            ...state.chat,
            name: chat.name,
            status: chat.status,
          },
        };
      }
      return state;
    }

    default:
      console.error("Unknown action type - useChat");
  }
};

export const useChat = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    if (socket && state.activeChats) {
      socket.on("notify", (data) => {
        switch (data.code) {
          case "new-message":
            {
              dispatch({
                type: "UPDATE_ACTIVE_CHAT",
                payload: { message: data.data.message },
              });
            }
            break;
          case "saved-message":
            {
              dispatch({
                type: "UPDATE_ACTIVE_CHAT",
                payload: { message: data.data.message },
              });
            }
            break;
          case "new-chat":
            {
              dispatch({
                type: "ADD_ACTIVE_CHAT",
                payload: { chat: data.data.chat },
              });
            }
            break;
          case "update-chat":
            {
              dispatch({
                type: "UPDATE_CHAT",
                payload: { chat: data.data.chat },
              });
            }
            break;

          default:
            break;
        }
      });
    }

    if (!socket || !state.userId || !state.chat) return;

    const handleReceiveMessage = (data) => {
      updateMessageStatus(data.message.chatId, state.userId);
      dispatch({
        type: "RECEIVE_MESSAGE",
        payload: { message: data.message },
      });
    };

    socket.on("receive-message", handleReceiveMessage);

    return () => {
      socket.off("receive-message", handleReceiveMessage);
    };
  }, [socket, state.userId, state.chat]);

  const setUserId = (userId) => {
    dispatch({ type: "SET_USERID", payload: { userId } });
  };

  const createChat = (participantsIds) => {
    // eslint-disable-next-line no-unused-vars
    return new Promise((resolve, reject) => {
      const chat = {
        participantsIds,
      };

      socket.emit("create-chat", { chat, userId: state.userId }, (response) => {
        resolve(response.chat);
      });
    });
  };

  // eslint-disable-next-line no-unused-vars
  const updateMessageStatus = (chatId, userId) => {
    socket.emit("update-messages-status", {
      userId: state.userId,
      chatId: chatId,
    });
  };

  const joinChat = (chatId, userId) => {
    socket.emit("join-chat", { chatId, userId }, (res) => {
      dispatch({ type: "FETCH_CHAT", payload: { chat: res.chat } });

      socket.on("update-messages-status", (data) => {
        const chatId = data.chatId;
        const userId = data.userId;
        dispatch({
          type: "UPDATE_MESSAGES_STATUS",
          payload: { chatId, userId },
        });
      });
    });
  };

  const closeChat = () => {
    socket.emit("close-chat", {
      chat: {
        ...state.chat,
        status: "CLOSED",
        messages: [],
      },
    });
  };

  const fetchActiveChats = (userId) => {
    socket.emit("active-chats", { userId }, (res) => {
      dispatch({ type: "FETCH_ACTIVE_CHATS", payload: { chats: res.chats } });
    });
  };

  const sendMessage = (content, type) => {
    const message = {
      id: uuid(),
      content: content,
      type: type,
      timestamp: new Date().toISOString(),
      senderId: state.userId,
      status: "SENT",
      chatId: state.chat.id,
    };

    dispatch({ type: "SEND_MESSAGE", payload: { message } });
    socket.emit("send-message", { message }, (res) => {
      dispatch({ type: "UPDATE_MESSAGE", payload: res });
    });
  };

  const leaveChat = (chatId) => {
    socket.emit("leave-chat", { chatId });
    socket.off("receive-message");
    dispatch({ type: "LEAVE_CHAT" });
  };

  return {
    ...state,
    setUserId,
    createChat,
    joinChat,
    leaveChat,
    sendMessage,
    fetchActiveChats,
    closeChat,
  };
};
