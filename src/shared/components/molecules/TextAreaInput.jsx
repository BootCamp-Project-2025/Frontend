import PropTypes from "prop-types";

export const TextAreaInput = ({
  register = null,
  label = "",
  errorMessage = undefined,
  placeholder = "",
  id = undefined,
  rows = 1,
  maxLength = undefined,
}) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label htmlFor={id} className="text-gray-600 font-semibold text-lg ">
        {label}
      </label>

      <textarea
        {...register}
        className={`bg-white py-1.5 px-2.5 rounded-md outline-1 focus:outline-2 text-base ${errorMessage ? "outline-pink-500 focus:outline-pink-500" : "outline-gray-300 focus:outline-blue-500"}`}
        spellCheck="false"
        maxLength={maxLength}
        rows={rows}
        placeholder={placeholder}
        id={id}
      ></textarea>
      {errorMessage && <p className="text-sm  text-pink-500">{errorMessage}</p>}
    </div>
  );
};

TextAreaInput.propTypes = {
  register: PropTypes.func,
  label: PropTypes.string,
  errorMessage: PropTypes.string,
  placeholder: PropTypes.string,
  id: PropTypes.string,
  rows: PropTypes.number,
  maxLength: PropTypes.number,
};
