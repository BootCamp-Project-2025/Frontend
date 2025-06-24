import PropTypes from "prop-types";
import { Title } from "./Title";

const ProfileTitle = ({ title }) => {
  return (
    <div className="w-full py-2 border-b-2 border-[var(--color-secondary-500)]">
      <Title size="xxl" color="default">
        {title}
      </Title>
    </div>
  );
};

export default ProfileTitle;

ProfileTitle.propTypes = {
  title: PropTypes.string,
};
