import { deleteFreelancerResource } from "../api/freelancers/deleteFreelancerResource";
import { postFreelancerResource } from "../api/freelancers/postFreelancerResource";
import { putFreelancerResource } from "../api/freelancers/putFreelancerResource";
import { useToastContext } from "../contexts/ToastContext";
import { singularize } from "../utils/singularize";

export const useFreelancerResources = ({
  freelancerId,
  resourceType,
  setRecordList,
  closePopup,
}) => {
  const { showToast } = useToastContext();

  const addCard = async (record) => {
    const response = await postFreelancerResource(
      freelancerId,
      resourceType,
      record
    );
    if (response.success == 0) {
      setRecordList((prev) => [...prev, response.data.data]);
      showToast(`${singularize(resourceType)} added successfully`, "success");
      closePopup();
    } else {
      showToast(`error adding ${singularize(resourceType)}`, "error");
      console.error(`Error when try to add ${resourceType}:`, response.error);
    }
  };

  const updateCard = async (record) => {
    const response = await putFreelancerResource(
      freelancerId,
      resourceType,
      record.id,
      record
    );
    if (response.success) {
      setRecordList((prev) =>
        prev.map((element) =>
          element.id === record.id ? response.data.data : element
        )
      );
      showToast(`${singularize(resourceType)} saved successfully`, "success");
      closePopup();
    } else {
      showToast(`error updating ${singularize(resourceType)}`, "error");
      console.error(`Error when update ${resourceType}:`, response.error);
    }
  };

  const deleteCard = async (cardId) => {
    const response = await deleteFreelancerResource(
      freelancerId,
      resourceType,
      cardId
    );
    if (response.success) {
      setRecordList((prev) => prev.filter((e) => e.id !== cardId));
      showToast(`${singularize(resourceType)} deleted successfully`, "success");
      closePopup();
    } else {
      showToast(`error deleting ${singularize(resourceType)}`, "error");
      console.error(`Error at delete ${resourceType}:`, response.error);
    }
  };

  return {
    addCard,
    updateCard,
    deleteCard,
  };
};
