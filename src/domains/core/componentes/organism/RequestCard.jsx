import PropTypes from "prop-types";
import RequestCardInfo from "../molecules/RequestCardInfo";
import RequestCardButtons from "../molecules/RequestCardButtons";

export default function RequestCard({ deleteRequest, request }) {
  const handleDelete = () => deleteRequest(request.id);
  return (
    <div className="flex justify-between gap-6 border-1 border-gray-300 p-6 shadow-[0_4px_4px_rgba(0,0,0,0.30)] my-6">
      <RequestCardInfo
        className={"flex flex-col gap-2"}
        title={request.title}
        description={request.description}
        details={`Time estimation: ${request.estimation} hours`}
      />
      <RequestCardButtons
        deleteRequest={handleDelete}
        className={"flex flex-col gap-2"}
      />
    </div>
  );
}

RequestCard.propTypes = {
  deleteRequest: PropTypes.func.isRequired,
  request: PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    estimation: PropTypes.number.isRequired,
  }).isRequired,
};
