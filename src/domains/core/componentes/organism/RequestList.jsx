import PropTypes from "prop-types";
import RequestCard from "./RequestCard";
import { Button } from "../../../../shared/components/atoms/Button";

export default function RequestList({
  deleteRequest,
  requestList,
  handleCreateRequest,
}) {
  return (
    <div className=" mt-10 flex flex-col">
      <Button
        onClick={handleCreateRequest}
        variant="bordered"
        className={"self-center"}
      >
        Create a new request
      </Button>
      {requestList.map((request, id) => (
        <RequestCard deleteRequest={deleteRequest} key={id} request={request} />
      ))}
    </div>
  );
}

RequestList.propTypes = {
  requestList: PropTypes.array.isRequired,
  handleCreateRequest: PropTypes.func.isRequired,
  deleteRequest: PropTypes.func.isRequired,
};
