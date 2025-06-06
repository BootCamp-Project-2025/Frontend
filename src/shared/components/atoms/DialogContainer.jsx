import { useEffect } from "react";
import PropTypes from "prop-types";
export const DialogContainer = ({
  isOpen = true,
  onClose = () => {},
  children,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.querySelector("html").style.overflowY = "hidden";
    } else {
      document.querySelector("html").style.overflowY = "auto";
    }
    return () => {
      document.querySelector("html").style.overflowY = "auto";
    };
  }, [isOpen]);

  return (
    <div
      className={`${!isOpen ? "hidden" : ""} fixed w-screen h-screen top-0 left-0 bg-gray-900/70 flex justify-center items-center z-10 `}
      onDoubleClick={onClose}
    >
      <div
        className="bg-white rounded-md relative p-1"
        onDoubleClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
        <button
          className="p-1.5 rounded-[50%] bg-gray-400 font-semibold text-white absolute top-4 right-4 hover:bg-gray-500 cursor-pointer "
          onClick={onClose}
        >
          <svg className="h-6 w-6 fill-white" viewBox="0 -960 960 960">
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

DialogContainer.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.element,
};
