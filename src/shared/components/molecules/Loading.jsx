import PropTypes from "prop-types";
import clsx from "clsx";

const sizeStyles = {
  xs: {
    spinner: { size: "1rem", borderWidth: "0.15rem" },
    text: "text-xs",
  },
  sm: {
    spinner: { size: "1.5rem", borderWidth: "0.2rem" },
    text: "text-sm",
  },
  md: {
    spinner: { size: "2.5rem", borderWidth: "0.4rem" },
    text: "text-base",
  },
  lg: {
    spinner: { size: "3.5rem", borderWidth: "0.5rem" },
    text: "text-lg",
  },
  xl: {
    spinner: { size: "4.5rem", borderWidth: "0.6rem" },
    text: "text-xl",
  },
  "2xl": {
    spinner: { size: "6rem", borderWidth: "0.7rem" },
    text: "text-2xl",
  },
};

export const Loading = ({
  text = "Loading...",
  hideText = false,
  className = "",
  size = "md", // options xs | sm | md | lg | xl | 2xl
}) => {
  const current = sizeStyles[size] || sizeStyles["md"];

  return (
    <div
      className={clsx(
        "flex flex-col w-full items-center justify-center text-center gap-4 text-gray-600",
        current.text,
        className
      )}
    >
      <span
        role="status"
        aria-label="Loading spinner"
        className="animate-spin rounded-full border border-blue-200 border-l-blue-500 bg-transparent"
        style={{
          height: current.spinner.size,
          width: current.spinner.size,
          borderWidth: current.spinner.borderWidth,
        }}
      />
      {!hideText && <p>{text}</p>}
    </div>
  );
};

Loading.propTypes = {
  text: PropTypes.string,
  hideText: PropTypes.bool,
  className: PropTypes.string,
  size: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl", "2xl"]),
};
