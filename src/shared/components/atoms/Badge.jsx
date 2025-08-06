import PropTypes from "prop-types";

const colorStyles = {
  gray: "bg-gray-100 text-gray-800 ring-gray-500/40",
  red: "bg-red-100 text-red-800 ring-red-600/20",
  yellow: "bg-yellow-100 text-yellow-800 ring-yellow-600/40",
  green: "bg-green-100 text-green-800 ring-green-600/40",
  blue: "bg-blue-100 text-blue-800 ring-blue-800/30",
  indigo: "bg-indigo-100 text-indigo-800 ring-indigo-800/30",
  purple: "bg-purple-100 text-purple-800 ring-purple-800/30",
  pink: "bg-pink-100 text-pink-800 ring-pink-800/30",
};

export const Badge = ({
  color = "gray",
  children,
  className = "",
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset";
  const colorClass = colorStyles[color] || colorStyles.gray;

  return (
    <span className={`${baseClasses} ${colorClass} ${className}`} {...props}>
      {children}
    </span>
  );
};

Badge.propTypes = {
  color: PropTypes.oneOf(Object.keys(colorStyles)),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Badge;
