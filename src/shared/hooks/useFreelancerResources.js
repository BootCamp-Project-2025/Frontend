import { deleteFreelancerResource } from "../api/freelancers/deleteFreelancerResource";
import { postFreelancerResource } from "../api/freelancers/postFreelancerResource";
import { putFreelancerResource } from "../api/freelancers/putFreelancerResource";

export const useFreelancerResources = ({
  freelancerId,
  resourceType,
  setRecordList,
  closePopup,
}) => {
  const addCard = async (record) => {
    const response = await postFreelancerResource(
      freelancerId,
      resourceType,
      record
    );
    if (response.success) {
      setRecordList((prev) => [...prev, response.data.data]);
      closePopup();
    } else {
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
      closePopup();
    } else {
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
      closePopup();
    } else {
      console.error(`Error at delete ${resourceType}:`, response.error);
    }
  };

  return {
    addCard,
    updateCard,
    deleteCard,
  };
};
