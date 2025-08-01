import PropTypes from "prop-types";
import RequestCardInfo from "../molecules/RequestCardInfo";
import RequestCardButtons from "../molecules/RequestCardButtons";
import { useNavigate } from "react-router-dom";

export default function RequestCard({ deleteRequest, editRequest, request }) {
  const navigate = useNavigate();
  const handleEdit = () => editRequest(); //here is missing
  const handleOpen = () => navigate(`/student/requests/${request.id}`);
  const handleDelete = () => deleteRequest(request.id);
  return (
    <div className="flex justify-between gap-6 shadow-md rounded-sm p-4 hover:shadow-lg transition-shadow border border-gray-300 hover:border-gray-400 my-4">
      <RequestCardInfo
        className={"flex flex-col gap-2"}
        title={request.title}
        description={request.description}
        details={`Time estimation: ${request.estimation} hours`}
      />
      <RequestCardButtons
        editRequest={handleEdit}
        openRequest={handleOpen}
        deleteRequest={handleDelete}
        className={"flex flex-col gap-2"}
      />
    </div>
  );
}

RequestCard.propTypes = {
  deleteRequest: PropTypes.func.isRequired,
  editRequest: PropTypes.func.isRequired,
  request: PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    estimation: PropTypes.number.isRequired,
  }).isRequired,
};
