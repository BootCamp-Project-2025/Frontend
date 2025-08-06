import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { Icon } from "../../../../shared/components/atoms/Icon";

const RowDetail = ({
  title,
  value,
  border = true,
  isEditable,
  onConfirm,
  valueFormat,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(value);
  const inputRef = useRef(null);

  useEffect(() => {
    setEditedValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedValue(value);
  };

  const handleConfirmClick = () => {
    setIsEditing(false);
    if (onConfirm) {
      onConfirm(editedValue);
    }
  };

  return (
    <div
      className={`${
        border && "border-[color:var(--color-default-100)] border-b"
      } flex items-center p-2 gap-2`}
    >
      <p className="font-medium min-w-[10em]">{title}:</p>

      {isEditable && isEditing ? (
        <div className="flex w-full items-center justify-between gap-2 bg-[color:var(--color-default-100)] p-2 rounded-md">
          <input
            type="text"
            className="px-2 py-1 text-sm w-full text-[color:var(--color-default-800)] outline-none"
            value={editedValue}
            onChange={(e) => setEditedValue(e.target.value)}
            ref={inputRef}
            placeholder={valueFormat}
          />
          <div className="flex gap-1">
            <button
              onClick={handleCancelClick}
              className="p-2 rounded-full bg-[color:var(--color-danger-500)] hover:bg-[color:var(--color-danger-600)] cursor-pointer"
            >
              <Icon icon="close" className="w-4 h-4 text-white" />
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
          className={`${
            isEditable &&
            "hover:bg-[color:var(--color-default-100)] bg-[color:var(--color-default-50)]"
          } text-[color:var(--color-default-800)] h-full w-full font-semibold cursor-text py-1 px-2 rounded-md`}
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
  onConfirm: PropTypes.func,
  valueFormat: PropTypes.string,
};
