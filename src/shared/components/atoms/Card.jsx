import PropTypes from "prop-types";
import clsx from "clsx";

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

const borderColors = {
  primary: "border-[color:var(--color-primary-500)]",
  secondary: "border-[color:var(--color-secondary-500)]",
  success: "border-[color:var(--color-success-500)]",
  danger: "border-[color:var(--color-danger-500)]",
  warning: "border-[color:var(--color-warning-500)]",
  default: "border-[color:var(--color-default-500)]",
};

const borderWidths = {
  thin: "border",
  medium: "border-2",
  thick: "border-4",
};

const shadows = {
  none: "shadow-none",
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
  xl: "shadow-xl",
  custom: "shadow-[0px_4px_4px_rgba(0,0,0,0.25)]",
};

const paddings = {
  none: "p-0",
  sm: "p-2",
  md: "p-4",
  lg: "p-6",
  xl: "p-8",
};

export function Card({
  children,
  bordered = false,
  filled = false,
  color = "primary",
  radius = "medium",
  borderWidth = "medium",
  padding = "md",
  shadow = "sm",
  className = "",
  ...rest
}) {
  return (
    <div
      className={clsx(
        paddings[padding],
        shadows[shadow],
        borderRadius[radius],
        bordered && borderWidths[borderWidth],
        bordered && borderColors[color],
        filled && filledBackgrounds[color],
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
  borderWidth: PropTypes.oneOf(["thin", "medium", "thick"]),
  padding: PropTypes.oneOf(["none", "sm", "md", "lg", "xl"]),
  shadow: PropTypes.oneOf(["none", "sm", "md", "lg", "xl", "custom"]),
  className: PropTypes.string,
};
