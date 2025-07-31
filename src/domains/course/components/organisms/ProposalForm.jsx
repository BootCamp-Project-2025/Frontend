import { Button } from "../../../../shared/components/atoms/Button";
import { Title } from "../../../../shared/components/atoms/Title";
import { Icon } from "../../../../shared/components/atoms/Icon";
import { DescriptionField } from "../molecules/DescriptionField";
import { SessionsSchedule } from "../molecules/SessionsSchedule";
import { StartDateField } from "../molecules/StartDateField";
import PropTypes from "prop-types";

export default function ProposalForm({
  requestTitle = "DefoultTitle",
  description = "this will be a large description",
  setDescription,
  sessions = [],
  setSessions,
  startDate,
  setStartDate,
  onClose,
  onSend,
}) {
  return (
    <div className="flex flex-col relative gap-4">
      <Button
        aria-label="Close form"
        color="default"
        radius="full"
        onClick={onClose}
        square
        className={"absolute top-1 right-1 bg-[color:var(--color-default-300)]"}
      >
        <Icon icon="close" />
      </Button>

      <Title color="default" className="pt-6 text-center">
        Proposal
      </Title>

      <div className="px-6">
        <div className="mb-4">
          <span className="text-sm text-gray-600">Request: </span>
          <span className="text-sm font-medium">"{requestTitle}"</span>
        </div>

        <DescriptionField value={description} onChange={setDescription} />

        <SessionsSchedule sessions={sessions} onSessionsChange={setSessions} />

        <StartDateField value={startDate} onChange={setStartDate} />
      </div>

      <div className="flex gap-8 justify-center pt-4">
        <Button onClick={onClose} color="default">
          Cancel
        </Button>
        <Button onClick={onSend} color="primary" variant="solid">
          Send
        </Button>
      </div>
    </div>
  );
}

ProposalForm.propTypes = {
  requestTitle: PropTypes.string,
  description: PropTypes.string,
  setDescription: PropTypes.func.isRequired,
  sessions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      hour: PropTypes.string.isRequired,
    })
  ),
  setSessions: PropTypes.func.isRequired,
  startDate: PropTypes.string.isRequired,
  setStartDate: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onSend: PropTypes.func.isRequired,
};
