import { Card } from "../../../../shared/components/atoms/Card";
import PropTypes from "prop-types";

const RequestCard = ({ request }) => {
  return (
    <Card className="flex flex-col gap-2 p-3 h-[14rem]">
      <h3 className="font-bold text-xl text-default-700">{request.title}</h3>
      <p className="line-clamp-5">{request.description}</p>
      <div className="w-full flex justify-between items-center">
        <span className="font-light">{request.student}</span>
      </div>
    </Card>
  );
};

RequestCard.propTypes = {
  request: PropTypes.shape({
    title: PropTypes.string.isRequired,
    deadline: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    student: PropTypes.string.isRequired,
  }).isRequired,
};

export default RequestCard;
