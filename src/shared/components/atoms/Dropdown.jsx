import { useState, useRef, useEffect } from "react";
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
};

export function Dropdown({
  label = "Select an option",
  options = [],
  onSelect = () => {},
  color = "primary",
  variant = "solid",
  size = "md",
  radius = "large",
  square = false,
  disabled = false,
  className = "",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
    onSelect(option);
  };

  function getOptionStyles({ color, variant, size, isActive, isDisabled }) {
    const base = [
      "w-full text-left",
      sizes[size],
      isDisabled ? "opacity-50" : "cursor-pointer",
      isActive ? "brightness-10" : "",
    ];

    const style =
      buttonVariantsByColor[color]?.[variant] ??
      buttonVariantsByColor.default[variant];

    const hoverEffect = !isDisabled ? "hover:brightness-95" : "";

    return clsx(...base, style, hoverEffect);
  }

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={clsx(
          baseStyles,
          sizes[size],
          rounded[radius],
          buttonVariantsByColor[color]?.[variant],
          square && "aspect-square",
          disabled && "opacity-50",
          className
        )}
      >
        <div className="flex justify-between items-center w-full">
          <span className="truncate">{selected ? selected.label : label}</span>
          <svg
            className={clsx(
              "w-4 h-4 ml-2 shrink-0",
              "transition-transform duration-200 ease-in-out",
              isOpen ? "-rotate-180" : "rotate-0"
            )}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>

      <ul
        className={clsx(
          "absolute max-h-40 overflow-y-auto z-10 mt-2 w-full shadow-md bg-white",
          "transition-all duration-200 ease-out transform origin-top",
          isOpen
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
        )}
      >
        {options.length === 0 ? (
          <li className="px-4 py-2 text-sm text-gray-400 select-none">
            No options are available
          </li>
        ) : (
          options.map((option, i) => (
            <li
              key={i}
              onClick={() => handleSelect(option)}
              className={getOptionStyles({
                color: "secondary",
                variant: "ghost",
                size: "md",
                isActive: selected?.value === option.value,
                isDisabled: disabled,
              })}
            >
              {option.label}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

Dropdown.propTypes = {
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.any,
    })
  ).isRequired,
  onSelect: PropTypes.func,
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "default",
  ]),
  variant: PropTypes.oneOf([
    "solid",
    "faded",
    "bordered",
    "light",
    "flat",
    "ghost",
    "shadow",
  ]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  radius: PropTypes.oneOf(["none", "small", "medium", "large", "full"]),
  square: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};
