import { DialogContainer } from "../../../../shared/components/atoms/DialogContainer";
import { Button } from "../../../../shared/components/atoms/Button";
import PropTypes from "prop-types";

export const ConfirmDeleteCourse = ({
  isOpen,
  onClose,
  onConfirm,
  courseName,
}) => {
  return (
    <DialogContainer isOpen={isOpen} onClose={onClose} title={"Are you sure?"}>
      <div className="flex flex-col gap-4 w-72">
        <p className="text-center text-sm">
          This will delete the course <strong>{courseName}</strong>.
        </p>
        <div className="flex justify-end gap-2 mt-2">
          <Button variant="bordered" color="default" onClick={onClose}>
            Cancel
          </Button>
          <Button color="danger" onClick={onConfirm}>
            Delete
          </Button>
        </div>
      </div>
    </DialogContainer>
  );
};

ConfirmDeleteCourse.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  courseName: PropTypes.string,
};
