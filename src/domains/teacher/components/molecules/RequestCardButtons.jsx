import { Button } from "../../../../shared/components/atoms/Button";
import PropTypes from "prop-types";

export default function RequestCardButtons({
  openRequest,
  editRequest,
  deleteRequest,
  ...props
}) {
  return (
    <div {...props}>
      <Button
        onClick={openRequest}
        data-testid="openButton"
        contentClassName={"m-auto w-fit whitespace-nowrap"}
        variant="bordered"
      >
        Open request
      </Button>
      <Button
        onClick={editRequest}
        data-testid="editButton"
        contentClassName={"m-auto w-fit"}
        variant="bordered"
      >
        Edit
      </Button>
      <Button
        onClick={deleteRequest}
        data-testid="deleteButton"
        contentClassName={"m-auto w-fit"}
        variant="bordered"
      >
        Delete
      </Button>
    </div>
  );
}

RequestCardButtons.propTypes = {
  openRequest: PropTypes.func.isRequired,
  editRequest: PropTypes.func.isRequired,
  deleteRequest: PropTypes.func.isRequired,
};
