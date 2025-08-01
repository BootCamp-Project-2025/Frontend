import { Button } from "../../../../shared/components/atoms/Button";
import PropTypes from "prop-types";
import profileDefault from "../../../../assets/profile.png";
import { Title } from "../../../../shared/components/atoms/Title";
import { useNavigate } from "react-router-dom";

const RequestMessageCard = ({ chat }) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/chats/${chat.chatId}`);
  };
  return (
    <div className="flex justify-between shadow-md rounded-sm p-4 hover:shadow-lg transition-shadow border border-gray-300 hover:border-gray-400">
      <div className="flex gap-8">
        <img src={profileDefault} alt={chat.userName} />
        <div className="flex flex-col gap-1 text-[color:var(--color-secondary-500)]">
          <Title size="md" color="primary">
            {chat.userName}
          </Title>
          <p className="text-sm">Updated at: {chat.updatedAt} days ago</p>
          <p className="max-h-12 overflow-auto mt-2">{chat.lastMessage}</p>
        </div>
      </div>
      <div>
        <Button
          onClick={handleNavigate}
          contentClassName={"m-auto w-fit whitespace-nowrap"}
          variant="bordered"
        >
          Open Chat
        </Button>
      </div>
    </div>
  );
};

export default RequestMessageCard;
RequestMessageCard.propTypes = {
  chat: PropTypes.shape({
    userName: PropTypes.string.isRequired,
    profilePicture: PropTypes.string.isRequired,
    chatId: PropTypes.string.isRequired,
    lastMessage: PropTypes.string,
    updatedAt: PropTypes.string,
  }),
};
