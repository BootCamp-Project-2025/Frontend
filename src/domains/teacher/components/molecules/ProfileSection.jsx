import PropTypes from "prop-types";

export const ProfileSection = ({ title, children }) => {
  return (
    <div className="p-4 border-1 border-blue-500 rounded-lg flex flex-col gap-2.5">
      <p className="text-2xl font-bold text-blue-500 ">{title}</p>
      {children}
    </div>
  );
};

ProfileSection.propTypes = {
  title: PropTypes.string,
  children: PropTypes.element,
};
