/* import PropTypes from "prop-types";

const RowDetail = ({ title, value, border = true }) => {
  return (
    <div
      className={`${border && "border-[color:var(--color-default-100)] border-b"} grid grid-cols-2 p-2`}
    >
      <p className="font-medium">{title}:</p>
      <p className="text-[color:var(--color-default-800)] font-semibold">
        {value}
      </p>
    </div>
  );
};

export default RowDetail;

RowDetail.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
  border: PropTypes.bool,
};
 */
import PropTypes from "prop-types";
import { useState } from "react";
import { Icon } from "../../../../shared/components/atoms/Icon";

const RowDetail = ({ title, value, border = true, isEditable }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(value);

  const handleEditClick = () => {
    /*   if (!isEditable) {
      return;
    } */
    console.log("ASDADAS");
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedValue(value);
  };

  const handleConfirmClick = () => {
    setIsEditing(false);
    console.log("Nuevo valor confirmado:", editedValue);
  };

  return (
    <div
      className={`${border && "border-[color:var(--color-default-100)] border-b"} grid grid-cols-2 p-2 gap-2`}
    >
      <p className="font-medium">{title}:</p>

      {isEditable && isEditing ? (
        <div className="flex items-center justify-between gap-2 bg-[color:var(--color-default-100)] p-2 rounded-md">
          <input
            type="text"
            className="border rounded px-2 py-1 text-sm w-full text-[color:var(--color-default-800)]"
            value={editedValue}
            onChange={(e) => setEditedValue(e.target.value)}
            autoFocus
          />
          <div className="flex gap-1">
            <button
              onClick={handleCancelClick}
              className="p-2 rounded-full bg-[color:var(--color-danger-500)] hover:bg-[color:var(--color-danger-600)] cursor-pointer"
            >
              <Icon icon="close" className="w-4 h-4" />
            </button>
            <button
              onClick={handleConfirmClick}
              className="p-2 rounded-full bg-[color:var(--color-success-500)] hover:bg-[color:var(--color-success-600)] cursor-pointer"
            >
              <Icon icon="check" className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <p
          className={`${isEditable && "hover:bg-[color:var(--color-default-100)]"} text-[color:var(--color-default-800)] font-semibold cursor-text py-1 px-2 rounded-md`}
          onClick={isEditable ? handleEditClick : undefined}
        >
          {value}
        </p>
      )}
    </div>
  );
};

export default RowDetail;

RowDetail.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
  border: PropTypes.bool,
  isEditable: PropTypes.bool,
};
