import PropTypes from "prop-types";
import { useCallback } from "react";
import usePopup from "../../../../shared/hooks/usePopup";
import { Button } from "../../../../shared/components/atoms/Button";
import ProposalForm from "./ProposalForm";

export default function ProposalFormPopUp({
  initialData,
  requestTitle = "New Request",
  handleSendProposal,
  buttonLabel = "Create proposal",
  readOnly = false,
}) {
  const { openPopup, closePopup } = usePopup();

  const handleOpenProposalForm = useCallback(() => {
    openPopup(ProposalForm, {
      requestTitle,
      initialData,
      onClose: closePopup,
      handleSendProposal,
      student: readOnly,
    });
  }, [openPopup, closePopup, requestTitle, initialData]);

  return (
    <div>
      <Button
        onClick={handleOpenProposalForm}
        variant="solid"
        color="primary"
        size="sm"
        className={"self-center"}
      >
        {buttonLabel}
      </Button>
    </div>
  );
}

ProposalFormPopUp.propTypes = {
  initialData: PropTypes.shape({
    description: PropTypes.string.isRequired,
    sessions: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        datetime: PropTypes.string.isRequired,
      })
    ).isRequired,
  }),
  requestTitle: PropTypes.string,
  handleSendProposal: PropTypes.func,
  buttonLabel: PropTypes.string,
  readOnly: PropTypes.bool,
};
