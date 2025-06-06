import PropTypes from "prop-types";

export const MonthInput = ({
  register = null,
  label = "",
  errorMessage = undefined,
  min = undefined,
  max = undefined,
  id = undefined,
}) => {
  return (
    <div className="flex flex-col gap-1.5 text-md w-full">
      <label htmlFor={id} className="text-gray-600 font-semibold">
        {label}
      </label>
      <input
        {...register}
        type="month"
        className={`bg-white py-1.5 px-2.5 rounded-md outline-2 focus:outline-3  w-full ${errorMessage ? "outline-pink-500 focus:outline-pink-500" : "outline-gray-300 focus:outline-blue-500"}`}
        spellCheck="false"
        min={min}
        max={max}
        id={id}
      />
      {errorMessage && <p className="text-sm  text-pink-500">{errorMessage}</p>}
    </div>
  );
};

MonthInput.propTypes = {
  register: PropTypes.func,
  label: PropTypes.string,
  errorMessage: PropTypes.string,
  min: PropTypes.string,
  max: PropTypes.string,
  id: PropTypes.string,
};
