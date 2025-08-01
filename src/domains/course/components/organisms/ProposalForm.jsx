import { Button } from "../../../../shared/components/atoms/Button";
import { Title } from "../../../../shared/components/atoms/Title";
import { Icon } from "../../../../shared/components/atoms/Icon";
import { DescriptionField } from "../molecules/DescriptionField";
import { SessionsSchedule } from "../molecules/SessionsSchedule";
import { useReducer, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

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

function createInitialState(initialData) {
  const sessions = initialData.sessions.map((session) => {
    const { date, hour } = getDateInfo(session.datetime);
    return {
      id: session.datetime,
      name: session.title,
      date,
      hour,
    };
  });
  return { ...initialData, sessions };
}

export default function ProposalForm({
  initialData = {
    id: "",
    userId: "",
    requestId: "",
    description: "",
    sessions: [],
    createdAt: "",
    status: "",
  },
  student = false,
  onClose = () => {},
  handleSendProposal,
  showOptions = true,
  showCloseButton = true,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, dispatch] = useReducer(
    proposalReducer,
    createInitialState(initialData)
  );

  const setDescription = (description) => {
    dispatch({ type: "SET_DESCRIPTION", payload: description });
  };

  const setSessions = (sessions) => {
    dispatch({ type: "SET_SESSIONS", payload: sessions });
  };

  function handleSend() {
    handleSubmit("SENT");
  }

  function handleAccept() {
    handleSubmit("ACCEPTED");
  }

  function handleSubmit(status) {
    setIsLoading(true);
    const proposalData = createSendData(formData);
    const proposal = { ...proposalData, status: status };
    axios
      .put(`${API_URL}/proposals/${initialData.id}`, proposal)
      .then((response) => response.data.data)
      .then((proposalResponse) => {
        handleSendProposal(proposalResponse);
        dispatch({
          type: "RESET_FORM",
          payload: createInitialState(proposalResponse),
        });
        setIsLoading(false);
        onClose();
      })
      .catch((error) =>
        console.error("Something went wrong updating proposal", error)
      );
  }

  return (
    <div className="flex flex-col relative gap-4 max-w-lg">
      {showCloseButton ? (
        <Button
          aria-label="Close form"
          color="default"
          radius="full"
          onClick={onClose}
          square
          className={"absolute top-1 right-1 bg-default-100"}
        >
          <Icon icon="close" />
        </Button>
      ) : null}

      <Title color="default" className="pt-6 text-center">
        Proposal
      </Title>

      {formData && (
        <div className="px-6">
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
      {showOptions ? (
        <div className="flex gap-8 justify-center pt-4">
          {student ? (
            <Button
              onClick={handleAccept}
              color="primary"
              variant="solid"
              isSpinning={isLoading}
              disabled={isLoading}
            >
              Accept proposal
            </Button>
          ) : (
            <>
              <Button onClick={onClose} color="default">
                Cancel
              </Button>
              <Button
                onClick={handleSend}
                color="primary"
                variant="solid"
                isSpinning={isLoading}
                disabled={isLoading}
              >
                Send
              </Button>
            </>
          )}
        </div>
      ) : null}
    </div>
  );
}

const createSendData = (formData) => {
  const sessions = formData.sessions.map((session) => {
    const datetime = setDateInfo(session.date, session.hour);
    return {
      title: session.name,
      datetime,
    };
  });
  return { ...formData, sessions };
};

const getDateInfo = (dateInput = "2026-07-31T03:52:20.461Z") => {
  const auxDate = new Date(dateInput);
  const year = auxDate.getUTCFullYear();
  const month = auxDate.getUTCMonth() + 1;
  const day = auxDate.getUTCDate();
  const hours = auxDate.getUTCHours();
  const minutes = auxDate.getUTCMinutes();
  const date = `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
  const hour = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

  return { date, hour };
};

const setDateInfo = (date, hours) => {
  return `${date}T${hours}:00.000Z`;
};

ProposalForm.propTypes = {
  requestTitle: PropTypes.string,
  initialData: PropTypes.shape({
    id: PropTypes.string,
    userId: PropTypes.string,
    requestId: PropTypes.string,
    description: PropTypes.string.isRequired,
    status: PropTypes.string,
    createdAt: PropTypes.string,
    sessions: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        datetime: PropTypes.string.isRequired,
      })
    ).isRequired,
  }),
  student: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  handleSendProposal: PropTypes.func,
  handleAcceptProposal: PropTypes.func,
  showOptions: PropTypes.bool,
  showCloseButton: PropTypes.bool,
};
