import PropTypes from "prop-types";

export const DescriptionField = ({ value, onChange, student }) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Description
      </label>
      <textarea
        value={value}
        disabled={student}
        maxLength={300}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        placeholder="Enter description..."
      />
    </div>
  );
};

DescriptionField.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  student: PropTypes.bool,
};
