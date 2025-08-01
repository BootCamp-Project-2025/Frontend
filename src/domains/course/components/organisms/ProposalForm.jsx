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
  requestTitle = "DefaultTitle",
  initialData = {
    id: "3c88401e-64f9-4643-85fb-c4356a1dd61c",
    userId: "27b60ea3-5bd0-44ba-8ea1-3efcf128c1d3",
    requestId: "127b094b-93ce-4efa-9fd3-f79eba6a9679",
    description: "My awesome description for an awesome proposal 222",
    sessions: [
      {
        title: "First session222",
        datetime: "2026-07-31T03:52:20.461Z",
      },
      {
        title: "Second session222",
        datetime: "2026-08-31T03:52:33.140Z",
      },
      {
        title: "Second session222",
        datetime: "2026-09-31T03:52:33.140Z",
      },
    ],
    createdAt: "2025-07-31T03:40:24.846Z",
    status: "SENT",
  },
  student = false,
  onClose,
}) {
  console.log(initialData.sessions);
  const [formData, dispatch] = useReducer(
    proposalReducer,
    createInitialState(initialData)
  );

  console.log(formData);
  const setDescription = (description) => {
    dispatch({ type: "SET_DESCRIPTION", payload: description });
  };

  const setSessions = (sessions) => {
    console.log(sessions);
    dispatch({ type: "SET_SESSIONS", payload: sessions });
  };

  function handleSend() {
    // data to create or update
    const proposalData = createSendData(formData);
    console.log("Sending proposal data:", proposalData);
    dispatch({ type: "RESET_FORM", payload: createInitialState(initialData) });
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
};
