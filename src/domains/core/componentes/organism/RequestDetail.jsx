import RequestDetailHeader from "../molecules/RequestDetailHeader";
import { Title } from "../../../../shared/components/atoms/Title";
import RequestDetailCategory from "../atoms/RequestDetailCategory";
import { useState } from "react";
import RequestMessageCard from "../molecules/RequestMessageCard";
import { Alert } from "../../../../shared/components/molecules/Alert";

const mockChats = [
  {
    userName: "User name",
    chatId: "119203u9343",
    profilePicture: "",
    updatedAt: 2,
    lastMessage: "Its everything ok like this?",
  },
  {
    userName: "User name22",
    chatId: "119203u9343",
    profilePicture: "",
    updatedAt: 3,
    lastMessage:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
];
const mockRequest = {
  category: ["Mathematics", "Pshysics", "Calculus"],
  description: "this is a description",
  profilePicture: "",
  userId: "112312312",
  userName: "Jose Ernesto",
  title: "A request for math classes",
};
const RequestDetail = () => {
  const [chats, setChats] = useState(mockChats);
  const [request, setRequest] = useState(mockRequest);
  return (
    <div className="wrapper flex flex-col gap-4 px-24 pb-16">
      <RequestDetailHeader request={request} />
      <div className="flex gap-4">
        {request.category.map((c, i) => (
          <RequestDetailCategory category={c} key={i} />
        ))}
      </div>

      <div className="mt-4">
        <Title size="lg" color="default">
          Description
        </Title>
        <p>{request.description}</p>
        <div className="flex flex-col gap-4 mt-4">
          <Title size="lg" color="default">
            Messages
          </Title>
          {chats.length === 0 ? (
            <Alert type="info" title="Your request has no messages yet" />
          ) : (
            chats.map((chat, index) => (
              <RequestMessageCard chat={chat} key={index} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestDetail;
