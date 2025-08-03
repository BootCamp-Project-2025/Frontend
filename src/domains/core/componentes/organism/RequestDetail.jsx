import RequestDetailHeader from "../molecules/RequestDetailHeader";
import { Title } from "../../../../shared/components/atoms/Title";
import RequestDetailCategory from "../atoms/RequestDetailCategory";
import { useEffect, useState } from "react";
import RequestMessageCard from "../molecules/RequestMessageCard";
import { Alert } from "../../../../shared/components/molecules/Alert";
import { useParams } from "react-router-dom";
import { getRequest } from "../../../../shared/api/getRequest";
import { Loading } from "../../../../shared/components/molecules/Loading";
import { useAuth } from "../../../../shared/hooks/useAuth";

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
const RequestDetail = () => {
  const [chats, setChats] = useState(mockChats);
  const [request, setRequest] = useState({});
  const params = useParams();
  const [userRequest, setUserRequest] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const response = await getRequest(`requests/${params.requestId}`);
        setRequest(response.data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRequest();
  }, [params.requestId]);

  useEffect(() => {
    if (!request?.userId) return;

    const fetchUser = async () => {
      try {
        const response = await getRequest(`users/${request.userId}`);
        setUserRequest(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, [request?.userId]);

  if (!request) {
    return <Loading />;
  }

  return (
    <div className="wrapper flex flex-col gap-4 px-24 pb-16">
      <RequestDetailHeader
        request={request}
        userName={userRequest?.userName || ""}
        requestId={params.requestId}
      />
      <div className="flex gap-4">
        <RequestDetailCategory category={request.category} />
        {request.subCategory !== "none" && (
          <RequestDetailCategory category={request.subCategory} />
        )}
      </div>

      <div className="mt-4">
        <Title size="lg" color="default">
          Description
        </Title>
        <p>{request.description}</p>
        <div className="flex flex-col gap-4 mt-4">
          {user?.id === request.userId && (
            <Title size="lg" color="default">
              Messages
            </Title>
          )}
          {request.userId !== user?.id ? null : chats.length === 0 ? (
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
