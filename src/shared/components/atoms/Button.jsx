import PropTypes from "prop-types";
import clsx from "clsx";

const baseStyles =
  "px-4 py-2 font-medium focus:outline-none transition-colors cursor-pointer duration-200 active:brightness-115";

const rounded = {
  none: "rounded-none",
  small: "rounded-md",
  medium: "rounded-lg",
  large: "rounded-xl",
  full: "rounded-full",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-5 py-3 text-lg",
};

export const buttonEffects = {
  base: "transition-colors duration-300 ease-in-out focus:outline-none",
  focusRing: "focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
  activeScale: "active:scale-95 active:brightness-110",
  disabled: "cursor-not-allowed opacity-50",
  shadow: "shadow-md hover:shadow-lg",
};

const buttonVariantsByColor = {
  primary: {
    solid:
      "bg-[color:var(--color-primary-600)] text-white hover:bg-[color:var(--color-primary-700)] disabled:bg-[color:var(--color-primary-400)]",
    faded:
      "bg-[color:var(--color-primary-100)] text-[color:var(--color-primary-800)] hover:bg-[color:var(--color-primary-200)] disabled:bg-[color:var(--color-primary-100)]",
    bordered:
      "border border-[color:var(--color-primary-600)] text-[color:var(--color-primary-600)] hover:bg-[color:var(--color-primary-50)] disabled:border-[color:var(--color-primary-300)] disabled:text-[color:var(--color-primary-300)]",
    light:
      "bg-[color:var(--color-primary-50)] text-[color:var(--color-primary-700)] hover:bg-[color:var(--color-primary-100)] disabled:bg-[color:var(--color-primary-50)] disabled:text-[color:var(--color-primary-300)]",
    flat: "bg-transparent text-[color:var(--color-primary-600)] hover:bg-[color:var(--color-primary-50)] disabled:text-[color:var(--color-primary-300)]",
    ghost:
      "bg-transparent text-[color:var(--color-primary-600)] hover:bg-[color:var(--color-primary-100)] disabled:text-[color:var(--color-primary-300)]",
    shadow:
      "bg-[color:var(--color-primary-600)] text-white shadow-md hover:shadow-lg hover:bg-[color:var(--color-primary-700)] disabled:bg-[color:var(--color-primary-400)] disabled:shadow-none",
  },
  secondary: {
    solid:
      "bg-[color:var(--color-secondary-200)] text-[color:var(--color-secondary-800)] hover:bg-[color:var(--color-secondary-300)] disabled:bg-[color:var(--color-secondary-100)]",
    faded:
      "bg-[color:var(--color-secondary-100)] text-[color:var(--color-secondary-700)] hover:bg-[color:var(--color-secondary-200)] disabled:bg-[color:var(--color-secondary-100)]",
    bordered:
      "border border-[color:var(--color-secondary-400)] text-[color:var(--color-secondary-600)] hover:bg-[color:var(--color-secondary-50)] disabled:border-[color:var(--color-secondary-200)] disabled:text-[color:var(--color-secondary-300)]",
    light:
      "bg-[color:var(--color-secondary-50)] text-[color:var(--color-secondary-700)] hover:bg-[color:var(--color-secondary-100)] disabled:bg-[color:var(--color-secondary-50)] disabled:text-[color:var(--color-secondary-300)]",
    flat: "bg-transparent text-[color:var(--color-secondary-600)] hover:bg-[color:var(--color-secondary-50)] disabled:text-[color:var(--color-secondary-300)]",
    ghost:
      "bg-transparent text-[color:var(--color-secondary-600)] hover:bg-[color:var(--color-secondary-100)] disabled:text-[color:var(--color-secondary-300)]",
    shadow:
      "bg-[color:var(--color-secondary-200)] text-[color:var(--color-secondary-800)] shadow-md hover:shadow-lg hover:bg-[color:var(--color-secondary-300)] disabled:bg-[color:var(--color-secondary-100)] disabled:shadow-none",
  },
  success: {
    solid:
      "bg-[color:var(--color-success-600)] text-white hover:bg-[color:var(--color-success-700)] disabled:bg-[color:var(--color-success-400)]",
    faded:
      "bg-[color:var(--color-success-100)] text-[color:var(--color-success-800)] hover:bg-[color:var(--color-success-200)] disabled:bg-[color:var(--color-success-100)]",
    bordered:
      "border border-[color:var(--color-success-600)] text-[color:var(--color-success-600)] hover:bg-[color:var(--color-success-50)] disabled:border-[color:var(--color-success-300)] disabled:text-[color:var(--color-success-300)]",
    light:
      "bg-[color:var(--color-success-50)] text-[color:var(--color-success-700)] hover:bg-[color:var(--color-success-100)] disabled:bg-[color:var(--color-success-50)] disabled:text-[color:var(--color-success-300)]",
    flat: "bg-transparent text-[color:var(--color-success-600)] hover:bg-[color:var(--color-success-50)] disabled:text-[color:var(--color-success-300)]",
    ghost:
      "bg-transparent text-[color:var(--color-success-600)] hover:bg-[color:var(--color-success-100)] disabled:text-[color:var(--color-success-300)]",
    shadow:
      "bg-[color:var(--color-success-600)] text-white shadow-md hover:shadow-lg hover:bg-[color:var(--color-success-700)] disabled:bg-[color:var(--color-success-400)] disabled:shadow-none",
  },
  danger: {
    solid:
      "bg-[color:var(--color-danger-600)] text-white hover:bg-[color:var(--color-danger-700)] disabled:bg-[color:var(--color-danger-400)]",
    faded:
      "bg-[color:var(--color-danger-100)] text-[color:var(--color-danger-800)] hover:bg-[color:var(--color-danger-200)] disabled:bg-[color:var(--color-danger-100)]",
    bordered:
      "border border-[color:var(--color-danger-600)] text-[color:var(--color-danger-600)] hover:bg-[color:var(--color-danger-50)] disabled:border-[color:var(--color-danger-300)] disabled:text-[color:var(--color-danger-300)]",
    light:
      "bg-[color:var(--color-danger-50)] text-[color:var(--color-danger-700)] hover:bg-[color:var(--color-danger-100)] disabled:bg-[color:var(--color-danger-50)] disabled:text-[color:var(--color-danger-300)]",
    flat: "bg-transparent text-[color:var(--color-danger-600)] hover:bg-[color:var(--color-danger-50)] disabled:text-[color:var(--color-danger-300)]",
    ghost:
      "bg-transparent text-[color:var(--color-danger-600)] hover:bg-[color:var(--color-danger-100)] disabled:text-[color:var(--color-danger-300)]",
    shadow:
      "bg-[color:var(--color-danger-600)] text-white shadow-md hover:shadow-lg hover:bg-[color:var(--color-danger-700)] disabled:bg-[color:var(--color-danger-400)] disabled:shadow-none",
  },
  warning: {
    solid:
      "bg-[color:var(--color-warning-500)] text-white hover:bg-[color:var(--color-warning-600)] disabled:bg-[color:var(--color-warning-300)]",
    faded:
      "bg-[color:var(--color-warning-100)] text-[color:var(--color-warning-800)] hover:bg-[color:var(--color-warning-200)] disabled:bg-[color:var(--color-warning-100)]",
    bordered:
      "border border-[color:var(--color-warning-500)] text-[color:var(--color-warning-500)] hover:bg-[color:var(--color-warning-50)] disabled:border-[color:var(--color-warning-300)] disabled:text-[color:var(--color-warning-300)]",
    light:
      "bg-[color:var(--color-warning-50)] text-[color:var(--color-warning-700)] hover:bg-[color:var(--color-warning-100)] disabled:bg-[color:var(--color-warning-50)] disabled:text-[color:var(--color-warning-300)]",
    flat: "bg-transparent text-[color:var(--color-warning-500)] hover:bg-[color:var(--color-warning-50)] disabled:text-[color:var(--color-warning-300)]",
    ghost:
      "bg-transparent text-[color:var(--color-warning-500)] hover:bg-[color:var(--color-warning-100)] disabled:text-[color:var(--color-warning-300)]",
    shadow:
      "bg-[color:var(--color-warning-500)] text-white shadow-md hover:shadow-lg hover:bg-[color:var(--color-warning-600)] disabled:bg-[color:var(--color-warning-300)] disabled:shadow-none",
  },
  default: {
    solid:
      "bg-[color:var(--color-default-100)] text-[color:var(--color-default-800)] hover:bg-[color:var(--color-default-200)] disabled:bg-[color:var(--color-default-100)] disabled:text-[color:var(--color-default-400)]",
    faded:
      "bg-[color:var(--color-default-50)] text-[color:var(--color-default-700)] hover:bg-[color:var(--color-default-100)] disabled:bg-[color:var(--color-default-50)] disabled:text-[color:var(--color-default-400)]",
    bordered:
      "border border-[color:var(--color-default-300)] text-[color:var(--color-default-700)] hover:bg-[color:var(--color-default-50)] disabled:border-[color:var(--color-default-200)] disabled:text-[color:var(--color-default-400)]",
    light:
      "bg-[color:var(--color-default-50)] text-[color:var(--color-default-700)] hover:bg-[color:var(--color-default-100)] disabled:bg-[color:var(--color-default-50)] disabled:text-[color:var(--color-default-400)]",
    flat: "bg-transparent text-[color:var(--color-default-700)] hover:bg-[color:var(--color-default-50)] disabled:text-[color:var(--color-default-400)]",
    ghost:
      "bg-transparent text-[color:var(--color-default-700)] hover:bg-[color:var(--color-default-100)] disabled:text-[color:var(--color-default-400)]",
    shadow:
      "bg-[color:var(--color-default-100)] text-[color:var(--color-default-800)] shadow-md hover:shadow-lg hover:bg-[color:var(--color-default-200)] disabled:bg-[color:var(--color-default-100)] disabled:shadow-none",
  },
};

export function Button({
  children,
  onClick = () => {},
  type = "button",
  color = "primary",
  disabled = false,
  size = "md",
  radius = "large",
  variant = "solid",
  square = false,
  isSpinning = false,
  className,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        baseStyles,
        sizes[size],
        rounded[radius],
        buttonEffects.activeScale,
        buttonVariantsByColor[color][variant],
        square ? "aspect-square" : "",
        className
      )}
    >
      <div className="flex flex-row gap-2 items-center justify-between">
        {isSpinning ? (
          <div className="w-4 h-4 min-w-4 border-2 rounded-full border-gray-200 border-r-transparent animate-spin"></div>
        ) : null}
        {children}
      </div>
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  type: PropTypes.string,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  size: PropTypes.string,
  radius: PropTypes.string,
  variant: PropTypes.string,
  square: PropTypes.bool,
  isSpinning: PropTypes.bool,
  className: PropTypes.string,
};
