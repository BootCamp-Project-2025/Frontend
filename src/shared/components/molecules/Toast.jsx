import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const TOAST_TYPES = {
  SUCCESS: "success",
  ERROR: "error",
  INFO: "info",
  WARNING: "warning",
};

export const Toast = ({
  id,
  text = "",
  type = "info",
  closeToast = () => {},
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(false);
      setTimeout(() => closeToast(id), 300);
    }, 4000);

    return () => clearTimeout(timeout);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => closeToast(id), 300);
  };

  const COLOR_MAP = {
    [TOAST_TYPES.INFO]: "bg-blue-500",
    [TOAST_TYPES.WARNING]: "bg-orange-500",
    [TOAST_TYPES.SUCCESS]: "bg-green-500",
    [TOAST_TYPES.ERROR]: "bg-red-500",
  };
  return (
    <div
      className={`flex items-center justify-between rounded-md p-3 w-[17rem] h-[48px] ${COLOR_MAP[type]} transition-all duration-300 ease-in-out transform 
      ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"}`}
    >
      <div className="flex items-center">
        <p className="text-[.75rem] max-w-[12rem] font-semibold line-clamp-2">
          {text}
        </p>
      </div>
      <button
        className={`flex items-center justify-center rounded-[50%] p-1 cursor-pointer`}
        onClick={handleClose}
      >
        <span className="material-symbols-outlined !text-[16px]">close</span>
      </button>
    </div>
  );
};

Toast.propTypes = {
  id: PropTypes.string,
  text: PropTypes.string,
  type: PropTypes.oneOf(Object.values(TOAST_TYPES)),
  closeToast: PropTypes.func,
};
