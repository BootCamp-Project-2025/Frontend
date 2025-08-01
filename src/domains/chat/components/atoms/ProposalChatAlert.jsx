import { useEffect, useState } from "react";
import { Button } from "../../../../shared/components/atoms/Button";
import axios from "axios";
import PropTypes from "prop-types";
import clsx from "clsx";

export default ProposalChatAlert;

const baseStyle = "p-4 flex justify-between";
// chatInfo = {chatId: string, proposalTimestamp: Date, status: ChatStatusEnum}
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
export function ProposalChatAlert({ chatInfo, userId, handleCancelProposal }) {
  const [proposal, setProposal] = useState(null);
  function fetchProposalInfo() {
    axios
      .get(`${API_URL}/chats/${chatInfo.id}/proposals`)
      .then((response) => response.data.data)
      .then((proposalResponse) => {
        setProposal(proposalResponse);
      })
      .catch((error) => console.error(error));
  }
  useEffect(() => {
    fetchProposalInfo();
  }, [chatInfo]);

  const isOwnProposal = () => {
    return proposal.userId == userId;
  };

  const getOptions = (status) => {
    switch (status) {
      case "NEW":
        return (
          <>
            {isOwnProposal() ? (
              <Button size="sm">Create proposal</Button>
            ) : null}
            <Button
              size="sm"
              variant="bordered"
              color="secondary"
              onClick={handleCancelProposal}
            >
              Close chat
            </Button>
          </>
        );
      case "SENT":
        return (
          <>
            {isOwnProposal() ? (
              <Button size="sm">Edit proposal</Button>
            ) : (
              <Button size="sm">Review proposal</Button>
            )}

            <Button
              size="sm"
              variant="bordered"
              color="secondary"
              onClick={handleCancelProposal}
            >
              Close chat
            </Button>
          </>
        );
      case "ACCEPTED":
        return (
          <>
            <Button size="sm" color="success" variant="faded">
              Go to P2P course
            </Button>
          </>
        );
      case "REJECTED":
        return <></>;

      default:
        break;
    }
  };

  const getColor = () => {
    switch (chatInfo.status) {
      case "CLOSED":
        if (proposal.status == "ACCEPTED") return "bg-success-100";
        if (proposal.status == "REJECTED") return "bg-danger-100";
        break;
      case "PROPOSAL":
        if (isOwnProposal()) return "bg-primary-100";
        if (!isOwnProposal()) return "bg-secondary-100";
    }
  };

  const getLeyend = () => {
    if (chatInfo.status == "PROPOSAL")
      return "This chat has been created by a proposal ";
    if (proposal.status == "ACCEPTED") return "The proposal has been accepted";
    if (proposal.status == "REJECTED") return "The proposal has been rejected";
  };

  return proposal ? (
    <div className={clsx(baseStyle, getColor())}>
      <p className="self-center text-sm text-default-600">{getLeyend()}</p>
      <div className="flex gap-2">{getOptions(proposal.status)}</div>
    </div>
  ) : null;
}

ProposalChatAlert.propTypes = {
  chatInfo: PropTypes.object,
  userId: PropTypes.string,
  handleCancelProposal: PropTypes.func,
};
