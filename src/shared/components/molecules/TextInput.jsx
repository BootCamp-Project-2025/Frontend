import PropTypes from "prop-types";

export const TextInput = ({
  register = null,
  label = "",
  errorMessage = undefined,
  placeholder = "",
  id = undefined,
  maxLength = undefined,
}) => {
  return (
    <div className="flex flex-col gap-1.5 text-md w-full">
      <label htmlFor={id} className="text-gray-600  font-semibold">
        {label}
      </label>
      <input
        {...register}
        type="text"
        className={`bg-white py-1.5 px-2.5 rounded-md outline-2 focus:outline-3  ${errorMessage ? "outline-red-500 focus:outline-red-500" : "outline-gray-300 focus:outline-blue-700"}`}
        spellCheck="false"
        placeholder={placeholder}
        maxLength={maxLength}
        id={id}
      />
      {errorMessage && <p className="text-sm  text-red-500">{errorMessage}</p>}
    </div>
  );
};

TextInput.propTypes = {
  register: PropTypes.func,
  label: PropTypes.string,
  errorMessage: PropTypes.string,
  placeholder: PropTypes.string,
  id: PropTypes.string,
  maxLength: PropTypes.number,
};
