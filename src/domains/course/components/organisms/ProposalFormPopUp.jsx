import PropTypes from "prop-types";
import { useCallback } from "react";
import usePopup from "../../../../shared/hooks/usePopup";
import { Button } from "../../../../shared/components/atoms/Button";
import ProposalForm from "./ProposalForm";

export default function ProposalFormPopUp({
  initialData = {
    description: "this will be a large description",
    sessions: [],
  },
  requestTitle = "New Request",
}) {
  const { openPopup, closePopup } = usePopup();

  const handleOpenProposalForm = useCallback(() => {
    openPopup(ProposalForm, {
      requestTitle,
      initialData,
      onClose: closePopup,
    });
  }, [openPopup, closePopup, requestTitle]);

  return (
    <div>
      <Button
        onClick={handleOpenProposalForm}
        variant="solid"
        color="primary"
        className={"self-center"}
      >
        Create Proposal
      </Button>
    </div>
  );
}

ProposalFormPopUp.propTypes = {
  initialData: PropTypes.shape({
    description: PropTypes.string.isRequired,
    sessions: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        hour: PropTypes.string.isRequired,
      })
    ).isRequired,
  }),
  requestTitle: PropTypes.string,
};
