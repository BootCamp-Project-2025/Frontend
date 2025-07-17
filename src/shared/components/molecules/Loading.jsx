import PropTypes from "prop-types";

export const Loading = ({ text = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-1.5 text-center text-gray-600 gap-4">
      <span
        role="status"
        className="animate-spin h-10 w-10 bg-transparent border-[0.4rem] border-blue-200 border-l-blue-500 rounded-full"
      ></span>

      <p className="text-sm">{text}</p>
    </div>
  );
};

Loading.propTypes = {
  text: PropTypes.string,
};
