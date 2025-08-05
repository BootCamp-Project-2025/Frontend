import PropTypes from "prop-types";
import { Icon } from "../../../../shared/components/atoms/Icon";
import { useNavigate } from "react-router-dom";
import { Title } from "../../../../shared/components/atoms/Title";
import { Button } from "../../../../shared/components/atoms/Button";
import { useAuth } from "../../../../shared/hooks/useAuth";
import { Loading } from "../../../../shared/components/molecules/Loading";
import { postRequest } from "../../../../shared/api/postRequest";
import { useToastContext } from "../../../../shared/contexts/ToastContext";

const RequestDetailHeader = ({ request, userName, requestId }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToastContext();

  const handleNavigate = () => {
    navigate(-1);
  };
  const handleClick = async () => {
    try {
      const body = {
        name: `Chat for request ${request.title}`,
        status: "PROPOSAL",
        participantsIds: [user.id, request.userId],
      };

      const response = await postRequest("chats", body);

      if (response.success) {
        navigate(`/chats/${response.data.id}`);
      } else {
        showToast("Error sending message", "error");
        console.error("Error creating chat:", response.error);
      }
      // console.log("studentId: ", request.userId);
      // console.log("teacherId: ", user.id);
      // console.log("requestId: ", requestId);
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
    title: PropTypes.string.isRequired,
    userId: PropTypes.string,
    description: PropTypes.string.isRequired,
    chatId: PropTypes.string.isRequired,
  }),
  userName: PropTypes.string.isRequired,
  requestId: PropTypes.string.isRequired,
};
