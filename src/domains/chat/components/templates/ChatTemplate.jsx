import { useEffect, useReducer } from "react";
import ChatInput from "../molecules/ChatInput";
import { ChatHeader } from "../organisms/ChatHeader";
import { ChatMessageList } from "../organisms/ChatMessageList";
import { v4 as uuid } from "uuid";

const userId = "fdb70cf2-5d37-4609-85b6-42607da1d405";
// const userId = "83303737-8ee5-4ba2-b6f4-f19c3f596817";
const reducer = (state, action) => {
  switch (action.type) {
    case "fetch-data":
      return action.data;
    case "add-message":
      console.log(action.message);
      return { ...state, messages: [...state.messages, action.message] };
    case "update-message-status":
      console.log(action.message);
      return {
        ...state,
        messages: [
          ...state.messages.map((message) => {
            if (message.id == action.message.id) return action.message;
            return message;
          }),
        ],
      };

    default:
      break;
  }
};

export default function ChatTemplate() {
  const [chat, dispatch] = useReducer(reducer);
  const fetchJSON = async (url) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Fetch failed (${url})`);
    return res.json();
  };

  const fetchData = () => fetchJSON("/chatMock/chat.json");
  useEffect(() => {
    fetchData().then((data) => dispatch({ type: "fetch-data", data }));
  }, []);

  const buildMessage = (content, type) => {
    return {
      id: uuid(),
      content: content,
      type: type,
      timestamp: new Date().toISOString(),
      senderId: chat.participantsIds[0], //UserId
      status: "SENT",
      chatId: chat.id,
    };
  };

  const handleSendMessage = (content, type) => {
    const message = buildMessage(content, type);
    dispatch({ type: "add-message", message });
    //TODO throw send-message action to socket
    //TODO instead of setTimeout listen to the socket response with callback and update the message status
    setTimeout(() => {
      dispatch({
        type: "update-message-status",
        message: { ...message, status: "DELIVERED" },
      });
      setTimeout(() => {
        dispatch({
          type: "update-message-status",
          message: { ...message, status: "READ" },
        });
      }, 2000);
    }, 2000);
  };
  return (
    // h-[calc(100vh-<header heigh>)], hide footer
    <div className="h-[calc(100vh-5.625rem)] flex flex-col">
      {chat ? (
        <>
          <ChatHeader
            participantsIds={chat.participantsIds.filter((id) => id != userId)}
          />
          <ChatMessageList ownerId={userId} messages={chat.messages} />
          <ChatInput handleSubmit={handleSendMessage} />
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
