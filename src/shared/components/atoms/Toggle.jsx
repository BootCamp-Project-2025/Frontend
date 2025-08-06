import PropTypes from "prop-types";

export function Toggle({
  label = "Toggle",
  enabled = false,
  onToggle = () => {},
}) {
  const handleToggle = () => {
    const newState = !enabled;
    onToggle(newState);
  };

  return (
    <div className="flex items-center space-x-4">
      <span className="text-gray-700 font-medium">{label}</span>
      <button
        onClick={handleToggle}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 cursor-pointer ${
          enabled ? "bg-primary-500" : "bg-gray-300"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
            enabled ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}

Toggle.propTypes = {
  label: PropTypes.string,
  enabled: PropTypes.bool,
  onToggle: PropTypes.func,
};
