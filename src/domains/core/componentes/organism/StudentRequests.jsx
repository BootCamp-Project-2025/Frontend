import { useCallback, useEffect, useRef, useState } from "react";
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
import { putRequest } from "../../../../shared/api/putRequest";

export default function StudentRequests() {
  const { showToast } = useToastContext();
  const { openPopup, closePopup } = usePopup();
  const [requestList, setRequestList] = useState([]);
  const inputRef = useRef(null);

  const loadData = useCallback(async (title = "") => {
    const response = await getRequest(
      `/requests/validUserRequests?title=${title}`
    );
    if (response.success) {
      setRequestList(response.data.data);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const search = useCallback(() => {
    loadData(inputRef.current.value);
  }, [loadData]);

  const manageToast = useCallback(
    (success, operationType) => {
      if (success) {
        showToast(`Successful ${operationType}`, "success");
        loadData();
      } else {
        showToast(`Error at ${operationType}`, "error");
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
      manageToast(response.success, "create");
      return response;
    },
    [manageToast]
  );

  const updateRequest = useCallback(
    async (requestId, data) => {
      const response = await putRequest(`/requests/${requestId}`, {
        ...data,
        status: "AVAILABLE",
      });
      manageToast(response.success, "update");
      return response;
    },
    [manageToast]
  );

  const deleteUserRequest = useCallback(
    async (requestId) => {
      const response = await deleteRequest(`/requests/${requestId}`);
      manageToast(response.success, "delete");
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
  const handleEditRequestPopUp = useCallback(
    (request) => {
      openPopup(
        RequestForm,
        {
          initialValues: request,
          saveRequest: (data) => updateRequest(request.id, data),
          closePopup,
        },
        false
      );
    },
    [openPopup, updateRequest, closePopup]
  );

  const handleCreateRequest = useCallback(() => {
    openPopup(RequestForm, { saveRequest, closePopup }, false);
  }, [openPopup, saveRequest, closePopup]);

  return (
    <div className="max-w-[90rem] w-full px-8 py-4 mx-auto">
      <SearchBar seach={search} ref={inputRef} placeholder="Find by title" />
      {requestList.length === 0 ? (
        <StudentEmptyRequestsMessage
          handleCreateRequest={handleCreateRequest}
        />
      ) : (
        <RequestList
          deleteRequest={handleDeleteRequestPopUp}
          handleCreateRequest={handleCreateRequest}
          editRequest={handleEditRequestPopUp}
          requestList={requestList}
        />
      )}
    </div>
  );
}
