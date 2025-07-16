import PropTypes from "prop-types";
import RequestCard from "./RequestCard";
import { Button } from "../../../../shared/components/atoms/Button";

export default function RequestList({ requestList }) {
  return (
    <div className=" mt-10 flex flex-col">
      <Button variant="bordered" className={"self-center"}>
        Create a new request
      </Button>
      {requestList.map((request, id) => (
        <RequestCard key={id} request={request} />
      ))}
    </div>
  );
}

RequestList.propTypes = {
  requestList: PropTypes.array.isRequired,
};
