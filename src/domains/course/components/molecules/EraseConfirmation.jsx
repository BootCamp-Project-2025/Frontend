import { Button } from "../../../../shared/components/atoms/Button";
import PropTypes from "prop-types";
import { Title } from "../../../../shared/components/atoms/Title";
import { useCallback } from "react";

export default function EraseConfirmation({ closePopup, onDelete, ...props }) {
  const handleDelete = useCallback(() => {
    onDelete();
    closePopup();
  }, [closePopup, onDelete]);
  return (
    <div className={"flex flex-col text-center gap-6 p-2"} {...props}>
      <Title color="black">Delete</Title>
      <p>Are you sure you want to delete this element</p>
      <div className="flex justify-center gap-8 mt-2">
        <Button color="secondary" onClick={closePopup}>
          Cancel
        </Button>
        <Button color="danger" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
}

EraseConfirmation.propTypes = {
  closePopup: PropTypes.func,
  onDelete: PropTypes.func,
};
