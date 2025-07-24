import PropTypes from "prop-types";

export function ChatDateDivider({ label }) {
  return (
    <div className="text-center my-4 text-primary-400 flex items-center">
      <hr className="w-full" />
      <p className="mx-2 text-default-400 text-sm">{label}</p>
      <hr className="w-full" />
    </div>
  );
}

ChatDateDivider.propTypes = {
  label: PropTypes.string,
};
