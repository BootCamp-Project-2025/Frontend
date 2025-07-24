// import { useParams } from "react-router-dom";
import { Title } from "../../../../shared/components/atoms/Title";
import { ChatsList } from "../organisms/ChatsList";
import ChatTemplate from "../templates/ChatTemplate";
import { useState } from "react";
// import CreateChatButtonTest from "../molecules/CreateChatButtonTest";

export function ChatPage() {
  //   const { chatId } = useParams();
  const [currentChat, setCurrentChat] = useState(null);
  return (
    <div className="grid grid-cols-12 h-[calc(100vh-5.625rem)]">
      <div className="col-span-3 h-full overflow-y-scroll">
        {/* <CreateChatButtonTest /> */}
        <ChatsList selectChat={setCurrentChat} selectedChat={currentChat} />
      </div>
      <div className="col-span-9 overflow-y-hidden">
        {currentChat ? (
          <ChatTemplate chatIdProp={currentChat} />
        ) : (
          <div className="h-full w-full opacity-40 bg-no-repeat bg-center flex flex-col justify-center items-center">
            <img
              className="max-w-2/6"
              src="/src/assets/chats.png"
              alt="chats image"
            />
            <div className="text-center select-none">
              <Title size="xl">Chat for LTCrowd</Title>
              <Title size="sm" color="default">
                To start chatting open select a chat from the list at the side
              </Title>
            </div>
          </div>
        )}
      </div>
      {/* <div className="col-span-3 h-full overflow-y-scroll">
        <ChatsList selectChat={setCurrentChat} selectedChat={currentChat} />
      </div> */}
    </div>
  );
}
