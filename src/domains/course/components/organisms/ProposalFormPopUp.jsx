import { useReducer, useCallback } from "react";
import usePopup from "../../../../shared/hooks/usePopup";
import { Button } from "../../../../shared/components/atoms/Button";
import ProposalForm from "./ProposalForm";

// Reducer para manejar el estado del formulario
const proposalReducer = (state, action) => {
  switch (action.type) {
    case "SET_DESCRIPTION":
      return { ...state, description: action.payload };
    case "SET_SESSIONS":
      return { ...state, sessions: action.payload };
    case "SET_START_DATE":
      return { ...state, startDate: action.payload };
    case "RESET_FORM":
      return action.payload;
    default:
      return state;
  }
};

export default function ProposalFormPopUp({
  // Props opcionales con valores por defecto
  initialData = {
    description: "this will be a large description",
    sessions: [],
    startDate: new Date(),
  },
  requestTitle = "New Request",
  onSendSuccess,
}) {
  const { openPopup, closePopup } = usePopup();

  // Estado inicial del formulario
  const [formData, dispatch] = useReducer(proposalReducer, initialData);

  // Funciones para actualizar el estado
  const setDescription = (description) => {
    dispatch({ type: "SET_DESCRIPTION", payload: description });
  };

  const setSessions = (sessions) => {
    dispatch({ type: "SET_SESSIONS", payload: sessions });
  };

  const setStartDate = (startDate) => {
    dispatch({ type: "SET_START_DATE", payload: startDate });
  };

  const handleOpenProposalForm = useCallback(() => {
    openPopup(
      ProposalForm,
      {
        requestTitle,
        description: formData.description,
        setDescription,
        sessions: formData.sessions,
        setSessions,
        startDate: formData.startDate,
        setStartDate,
        onClose: closePopup,
        onSend: handleSend,
      },
      {
        closeOnBackdropClick: true,
        size: "lg",
      }
    );
  }, [openPopup, closePopup, formData, requestTitle]);

  function handleSend() {
    console.log("Sending proposal data:", formData);

    // Callback opcional cuando se envía exitosamente
    if (onSendSuccess) {
      onSendSuccess(formData);
    }

    // Resetear el formulario después del envío
    dispatch({ type: "RESET_FORM", payload: initialData });

    closePopup();
  }

  return (
    <div>
      <Button
        onClick={handleOpenProposalForm}
        variant="bordered"
        className={"self-center"}
      >
        Create Proposal
      </Button>
    </div>
  );
}
