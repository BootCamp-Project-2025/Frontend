import PropTypes from "prop-types";
import { Button } from "../../../../shared/components/atoms/Button";
import { getStatusColor } from "../../../../shared/utils/getStatusColor";
import { capitalize } from "../../../../shared/utils/capitalize";
import { Link } from "react-router-dom";

const ProposalCard = ({ proposal }) => {
  return (
    <Link
      to={`/teacher/requests/${proposal.requestId}`}
      className="flex flex-col justify-center gap-2 shadow-md rounded-sm p-4 hover:shadow-lg transition-shadow border border-gray-300 hover:border-gray-400 my-2"
    >
      <div className="flex justify-between">
        <h2 className="font-bold">{proposal.requestTitle}</h2>
        <div className="flex gap-16">
          <p
            className="self-center font-medium"
            style={{ color: getStatusColor(proposal.status) }}
          >
            {capitalize(proposal.status.toLowerCase())}
          </p>
          <Link to={`/teacher/chats/${proposal.chatId}`}>
            <Button
              contentClassName={"m-auto w-fit whitespace-nowrap"}
              variant="bordered"
            >
              Open chat
            </Button>
          </Link>
        </div>
      </div>
      <p>{proposal.description}</p>
    </Link>
  );
};

export default ProposalCard;

ProposalCard.propTypes = {
  proposal: PropTypes.shape({
    requestTitle: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    chatId: PropTypes.string.isRequired,
    requestId: PropTypes.string.isRequired,
  }),
};
