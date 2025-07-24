import PropTypes from "prop-types";
import { Icon } from "../../../../shared/components/atoms/Icon";
import { Link } from "react-router-dom";
import { useState } from "react";
import { capitalize } from "../../../../shared/utils/capitalize";

const RowSocialLink = ({
  icon,
  title,
  url,
  border = true,
  onConfirm,
  isEditingAll,
  valueFormat,
}) => {
  const [isEditing, setIsEditing] = useState(isEditingAll);
  const [editedUrl, setEditedUrl] = useState(url);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleConfirmClick = () => {
    setIsEditing(false);
    if (onConfirm) {
      onConfirm(editedUrl);
    }
  };

  return (
    <div
      className={`${border && "border-[color:var(--color-default-100)] border-b"} flex gap-8 p-2 items-center`}
    >
      <Icon icon={icon} />

      <div
        className="flex flex-col w-full rounded-sm p-2 cursor-text"
        onClick={!isEditing ? handleEditClick : undefined}
      >
        <p className="font-semibold">{capitalize(title.toLowerCase())}</p>

        {isEditing ? (
          <div className="flex items-center justify-between gap-2 bg-[color:var(--color-default-100)] p-2 rounded-md">
            <input
              type="text"
              className="border rounded px-2 py-1 text-sm w-full text-[color:var(--color-default-800)]"
              value={editedUrl}
              onChange={(e) => setEditedUrl(e.target.value)}
              autoFocus
              placeholder={valueFormat}
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
          <div className="min-h-8 w-full hover:bg-[color:var(--color-default-100)] py-2 rounded-md">
            <Link
              to={url}
              target="_blank"
              className="text-[color:var(--color-primary-600)] font-semibold w-fit text-sm md:text-md"
            >
              {url}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default RowSocialLink;

RowSocialLink.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string,
  url: PropTypes.string,
  border: PropTypes.bool,
  isEditingAll: PropTypes.bool,
  onConfirm: PropTypes.func,
  valueFormat: PropTypes.string,
};
