import { Button } from "../../../../shared/components/atoms/Button";
import PropTypes from "prop-types";
import profileDefault from "../../../../assets/profile.png";
import { Title } from "../../../../shared/components/atoms/Title";
import { useNavigate } from "react-router-dom";
import { Image } from "../../../../shared/components/atoms/Image";
import { formatDateLabel } from "../../../../shared/utils/formatDateLabel";
import { getStatusColor } from "../../../../shared/utils/getStatusColor";

const RequestMessageCard = ({ proposal }) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/chats/${proposal.chatId}`);
  };

  return (
    <div className="flex justify-between shadow-md rounded-sm p-4 hover:shadow-lg transition-shadow border border-gray-300 hover:border-gray-400">
      <div className="flex gap-8">
        <Image
          src={proposal.profilePicture || profileDefault}
          alt={proposal.userName}
          width="w-28 2xl:w-36"
          height="h-28 2xl:h-36"
          styleType="profile"
          classname="object-cover"
        />
        <div className="flex flex-col gap-1 text-[color:var(--color-secondary-500)]">
          <Title size="md" color="primary">
            {proposal.userName}
          </Title>
          <p className="text-sm">
            Updated at:{" "}
            {formatDateLabel(proposal.updatedAt || proposal.createdAt)}
          </p>
          <p className="max-h-12 overflow-auto mt-2">{proposal.lastMessage}</p>
        </div>
      </div>
      <div>
        <div
          className="flex gap-4 font-semibold items-center"
          style={{ color: getStatusColor(proposal.status) }}
        >
          <p>{proposal.status}</p>
          <Button
            onClick={handleNavigate}
            contentClassName={"m-auto w-fit whitespace-nowrap"}
            variant="bordered"
          >
            Open Chat
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RequestMessageCard;
RequestMessageCard.propTypes = {
  proposal: PropTypes.shape({
    userName: PropTypes.string.isRequired,
    profilePicture: PropTypes.string.isRequired,
    chatId: PropTypes.string.isRequired,
    lastMessage: PropTypes.string,
    updatedAt: PropTypes.string,
    createdAt: PropTypes.string,
    status: PropTypes.string,
  }),
};
