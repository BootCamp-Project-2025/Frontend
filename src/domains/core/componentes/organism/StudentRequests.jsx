import { useCallback, useEffect, useState } from "react";
import SearchBar from "../../../../shared/components/molecules/SearchBar";
import usePopup from "../../../../shared/hooks/usePopup";
import StudentEmptyRequestsMessage from "../molecules/StudentEmptyRequestsMessage";
import RequestList from "./RequestList";
import RequestForm from "./RequestForm";
import { getRequest } from "../../../../shared/api/getRequest";
import { postRequest } from "../../../../shared/api/postRequest";
import { useToastContext } from "../../../../shared/contexts/ToastContext";
import { deleteRequest } from "../../../../shared/api/deleteRequest";
import DeleteCardPopup from "../../../teacher/components/atoms/DeleteCardPopup";

export default function StudentRequests() {
  const { showToast } = useToastContext();
  const { openPopup, closePopup } = usePopup();
  const [requestList, setRequestList] = useState([]);

  const loadData = useCallback(async () => {
    const response = await getRequest("/requests/validUserRequests");
    if (response.success) {
      setRequestList(response.data.data);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const manageToast = useCallback(
    (success) => {
      if (success) {
        showToast("Successfully", "success");
        loadData();
      } else {
        showToast("Error deleting", "error");
      }
    },
    [loadData, showToast]
  );

  const saveRequest = useCallback(
    async (data) => {
      const response = await postRequest("/requests", {
        ...data,
        status: "AVAILABLE",
      });
      manageToast(response.success);
      return response;
    },
    [manageToast]
  );

  const deleteUserRequest = useCallback(
    async (requestId) => {
      const response = await deleteRequest(`/requests/${requestId}`);
      manageToast(response.success);
    },
    [manageToast]
  );

  const handleDeleteRequestPopUp = useCallback(
    (requestId) => {
      openPopup(
        DeleteCardPopup,
        {
          title: "Delete Card",
          msg: "This action is irreversible. Please confirm to proceed.",
          closePopup,
          deleteAction: () => deleteUserRequest(requestId),
        },
        false
      );
    },
    [openPopup, closePopup, deleteUserRequest]
  );

  const handleCreateRequest = useCallback(() => {
    openPopup(
      RequestForm,
      { saveRequest: saveRequest, closePopup: closePopup },
      false
    );
  }, [openPopup, saveRequest, closePopup]);

  return (
    <div className="max-w-[90rem] w-full px-8 py-4 mx-auto">
      <SearchBar placeholder="Find a specific request" />
      {requestList.length === 0 ? (
        <StudentEmptyRequestsMessage
          handleCreateRequest={handleCreateRequest}
        />
      ) : (
        <RequestList
          deleteRequest={handleDeleteRequestPopUp}
          handleCreateRequest={handleCreateRequest}
          requestList={requestList}
        />
      )}
    </div>
  );
}
