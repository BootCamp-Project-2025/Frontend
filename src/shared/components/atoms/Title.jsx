import PropTypes from "prop-types";
import clsx from "clsx";

const baseStayle = "font-bold";

const sizeStyles = {
  sm: "text-lg font-medium",
  md: "text-xl font-semibold",
  lg: "text-2xl font-bold",
  xl: "text-3xl font-bold",
  xxl: "text-4xl font-extrabold",
};

const colorStyles = {
  primary: "text-[color:var(--color-primary-500)]",
  secondary: "text-[color:var(--color-secondary-500)]",
  success: "text-[color:var(--color-success-500)]",
  danger: "text-[color:var(--color-danger-500)]",
  warning: "text-[color:var(--color-warning-500)]",
  default: "text-[color:var(--color-default-500)]",
};

export function Title({
  children,
  size = "lg",
  color = "primary",
  className = "",
  ...props
}) {
  return (
    <p
      className={clsx(
        baseStayle,
        sizeStyles[size],
        colorStyles[color],
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}

Title.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(["sm", "md", "lg", "xl", "xxl"]),
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "default",
  ]),
  className: PropTypes.string,
};
