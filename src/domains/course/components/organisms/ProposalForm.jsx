import { Button } from "../../../../shared/components/atoms/Button";
import { Title } from "../../../../shared/components/atoms/Title";
import { Icon } from "../../../../shared/components/atoms/Icon";
import { DescriptionField } from "../molecules/DescriptionField";
import { SessionsSchedule } from "../molecules/SessionsSchedule";
import { useReducer } from "react";
import PropTypes from "prop-types";

const proposalReducer = (state, action) => {
  switch (action.type) {
    case "SET_DESCRIPTION":
      return { ...state, description: action.payload };
    case "SET_SESSIONS":
      return { ...state, sessions: action.payload };
    case "RESET_FORM":
      return action.payload;
    default:
      return state;
  }
};

export default function ProposalForm({
  requestTitle = "DefoultTitle",
  initialData = {
    description: "",
    sessions: [],
  },
  student = false,
  onClose,
}) {
  console.log(initialData);
  const [formData, dispatch] = useReducer(
    proposalReducer,
    initialData,
    (init) => ({
      ...init,
    })
  );

  const setDescription = (description) => {
    dispatch({ type: "SET_DESCRIPTION", payload: description });
  };

  const setSessions = (sessions) => {
    console.log(sessions);
    dispatch({ type: "SET_SESSIONS", payload: sessions });
  };

  function handleSend() {
    console.log("Sending proposal data:", formData);
    dispatch({ type: "RESET_FORM", payload: initialData });
  }

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

      {formData && (
        <div className="px-6">
          <div className="mb-4">
            <span className="text-base text-gray-600">Request: </span>
            <span className="text-base font-medium">{`"${requestTitle}"`}</span>
          </div>

          <DescriptionField
            value={formData.description}
            onChange={setDescription}
            student={student}
          />

          <SessionsSchedule
            sessions={formData.sessions}
            onSessionsChange={setSessions}
            student={student}
          />
        </div>
      )}

      <div className="flex gap-8 justify-center pt-4">
        <Button onClick={onClose} color="default">
          Cancel
        </Button>
        <Button onClick={handleSend} color="primary" variant="solid">
          Send
        </Button>
      </div>
    </div>
  );
}

ProposalForm.propTypes = {
  requestTitle: PropTypes.string,
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
  student: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
};
