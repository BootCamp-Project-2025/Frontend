import PropTypes from "prop-types";
import React, { useState } from "react";
import { Button } from "../../../../shared/components/atoms/Button";
import { Title } from "../../../../shared/components/atoms/Title";
import { Icon } from "../../../../shared/components/atoms/Icon";

const DeleteCardPopup = ({
  title = "Delete Card",
  msg = "This action is irreversible. Please confirm to proceed.",
  closePopup,
  deleteAction,
  id,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  async function handleDelete() {
    setIsDeleting(true);
    await delay(1000);
    deleteAction(id);
    setIsDeleting(false);
    closePopup();
  }
  return (
    <div className="flex flex-col relative gap-4 justify-between items-center">
      <Button
        aria-label="Close form"
        color="default"
        radius="full"
        onClick={closePopup}
        square
        className={"absolute top-1 right-1 bg-[color:var(--color-default-300)]"}
      >
        <Icon icon="close" />
      </Button>
      <Title color="default" className="pt-6">
        {title}
      </Title>
      <p className="max-w-[80%]">{msg}</p>
      <div className="flex gap-8">
        <Button onClick={closePopup} color="default">
          Cancel
        </Button>
        <Button
          onClick={handleDelete}
          color="danger"
          variant="ghost"
          disabled={isDeleting}
          isSpinning={isDeleting}
          className={isDeleting && "cursor-wait"}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default DeleteCardPopup;

DeleteCardPopup.propTypes = {
  title: PropTypes.string,
  msg: PropTypes.string,
  closePopup: PropTypes.func,
  deleteAction: PropTypes.func,
  id: PropTypes.string,
};
