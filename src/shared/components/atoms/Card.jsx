import PropTypes from "prop-types";
import clsx from "clsx";

const baseStyle = `px-8 py-7`;

const borderRadius = {
  none: "rounded-none",
  small: "rounded-lg",
  medium: "rounded-xl",
  large: "rounded-2xl",
  full: "rounded-full",
};

const filledBackgrounds = {
  primary: "bg-[color:var(--color-primary-50)]",
  secondary: "bg-[color:var(--color-secondary-50)]",
  success: "bg-[color:var(--color-success-50)]",
  danger: "bg-[color:var(--color-danger-50)]",
  warning: "bg-[color:var(--color-warning-50)]",
  default: "bg-[color:var(--color-default-50)]",
};

const borderStyles = {
  primary: "border-2 border-[color:var(--color-primary-500)]",
  secondary: "border-2 border-[color:var(--color-secondary-500)]",
  success: "border-2 border-[color:var(--color-success-500)]",
  danger: "border-2 border-[color:var(--color-danger-500)]",
  warning: "border-2 border-[color:var(--color-warning-500)]",
  default: "border-2 border-[color:var(--color-default-500)]",
};

export function Card({
  children,
  bordered = false,
  filled = false,
  color = "primary",
  radius = "medium",
  className = "",
  ...rest
}) {
  return (
    <div
      className={clsx(
        "p-4 shadow-sm",
        baseStyle,
        borderRadius[radius],
        filled && filledBackgrounds[color],
        bordered && borderStyles[color],
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.node,
  bordered: PropTypes.bool,
  filled: PropTypes.bool,
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "default",
  ]),
  radius: PropTypes.oneOf(["none", "small", "medium", "large", "full"]),
  className: PropTypes.string,
};
