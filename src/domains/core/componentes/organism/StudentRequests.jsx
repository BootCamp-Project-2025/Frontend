import { useCallback, useContext, useEffect, useState } from "react";
import SearchBar from "../../../../shared/components/molecules/SearchBar";
import usePopup from "../../../../shared/hooks/usePopup";
import StudentEmptyRequestsMessage from "../molecules/StudentEmptyRequestsMessage";
import RequestList from "./RequestList";
import RequestForm from "./RequestForm";
import { getRequest } from "../../../../shared/api/getRequest";
import { postRequest } from "../../../../shared/api/postRequest";
import { useToastContext } from "../../../../shared/contexts/ToastContext";
import { deleteRequest } from "../../../../shared/api/deleteRequest";

export default function StudentRequests() {
  const { openPopup, closePopup } = usePopup();
  const [requestList, setRequestList] = useState([]);
  const { showToast } = useToastContext();

  const loadData = useCallback(async () => {
    const response = await getRequest("/requests/validUserRequests");
    if (response.success) {
      setRequestList(response.data.data);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const saveRequest = useContext(async (data) => {
    const response = await postRequest("/requests", {
      ...data,
      status: "AVAILABLE",
    });
    manageToast(response.success);
    return response;
  }, []);

  const deleteUserRequest = useCallback(
    async (requestId) => {
      const response = await deleteRequest(`/requests/${requestId}`);
      manageToast(response.success);
    },
    [manageToast]
  );

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

  const handleCreateRequest = useCallback(() => {
    openPopup(
      RequestForm,
      { saveRequest: saveRequest, closePopup: closePopup },
      false
    );
  }, [openPopup, saveRequest, closePopup]);

  return (
    <div>
      <SearchBar placeholder="Find a specific request" />
      {requestList.length === 0 ? (
        <StudentEmptyRequestsMessage
          handleCreateRequest={handleCreateRequest}
        />
      ) : (
        <RequestList
          deleteRequest={deleteUserRequest}
          handleCreateRequest={handleCreateRequest}
          requestList={requestList}
        />
      )}
    </div>
  );
}
