import PropTypes from "prop-types";
import { Icon } from "../../../../shared/components/atoms/Icon";
import { useNavigate } from "react-router-dom";
import { Title } from "../../../../shared/components/atoms/Title";
import { Button } from "../../../../shared/components/atoms/Button";
import { useAuth } from "../../../../shared/hooks/useAuth";
import { Loading } from "../../../../shared/components/molecules/Loading";
import { postRequest } from "../../../../shared/api/postRequest";
import { useToastContext } from "../../../../shared/contexts/ToastContext";
import { useChat } from "../../../chat/hooks/useChat";
import { useEffect } from "react";

const RequestDetailHeader = ({ request, userName }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToastContext();
  const { createChat, setUserId } = useChat();

  useEffect(() => {
    if (user) setUserId(user.id);
  }, [user]);

  const handleNavigate = () => {
    navigate(-1);
  };
  const handleClick = async () => {
    try {
      const chat = {
        name: request.title,
        status: "PROPOSAL",
        participantsIds: [user.id, request.userId],
      };

      const newChat = await createChat(chat);

      const proposal = {
        requestId: request.id,
        userId: user.id,
        chatId: newChat.id,
        description: "",
        status: "NEW",
        sessions: [],
      };
      const proposalResponse = await postRequest("proposals", proposal);
      const newProposal = proposalResponse.data.data;

      if (proposalResponse.success) {
        navigate(`/teacher/chats`, { state: { chatId: newProposal.chatId } });
      } else {
        showToast("Error sending message", "error");
        console.error("Error creating chat:", proposalResponse.error);
      }
    } catch (error) {
      showToast("Unexpected error creating chat", "error");
      console.error("Unexpected error:", error);
    }
  };

  if (!user) return <Loading />;
  return (
    <div className="flex flex-col w-full bg-[var(--color-secondary-800)] p-8 text-[color:var(--color-secondary-50)] gap-6">
      <button
        onClick={handleNavigate}
        className="p-2 rounded-full bg-[var(--color-secondary-50)] hover:bg-[var(--color-secondary-200)] max-w-min cursor-pointer"
      >
        <Icon icon={"arrowBack"} />
      </button>
      <div className="flex justify-between">
        <Title size="xl" className="text-[color:var(--color-secondary-50)]">
          {request.title}
        </Title>
        {user.id !== request.userId && (
          <Button onClick={handleClick}>Send a message</Button>
        )}
      </div>

      <p>
        Created by
        <span className="text-[color:var(--color-primary-500)]">
          {` ${userName}`}
        </span>
      </p>
    </div>
  );
};

export default RequestDetailHeader;
RequestDetailHeader.propTypes = {
  request: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string.isRequired,
    userId: PropTypes.string,
    description: PropTypes.string.isRequired,
    chatId: PropTypes.string.isRequired,
  }),
  userName: PropTypes.string.isRequired,
};
