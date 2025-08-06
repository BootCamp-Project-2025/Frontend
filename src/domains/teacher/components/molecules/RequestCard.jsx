import { Card } from "../../../../shared/components/atoms/Card";
import PropTypes from "prop-types";
import { Button } from "../../../../shared/components/atoms/Button";
import { useNavigate } from "react-router-dom";

const RequestCard = ({ request }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/teacher/requests/${request.id}`);
  };
  return (
    <Card className="flex flex-col gap-2 p-3 h-[15rem] justify-between">
      <div>
        <h3 className="font-bold text-xl text-default-700">{request.title}</h3>
        <p className="line-clamp-4">{request.description}</p>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-gray-400 font-light">
          {new Date(request.createdAt).toLocaleDateString()}
        </span>
        <Button variant="bordered" className="mt-auto" onClick={handleClick}>
          Send an offer
        </Button>
      </div>
    </Card>
  );
};

RequestCard.propTypes = {
  request: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    createdAt: PropTypes.instanceOf(Date).isRequired,
  }).isRequired,
};

export default RequestCard;
