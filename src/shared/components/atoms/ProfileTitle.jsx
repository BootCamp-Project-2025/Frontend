import PropTypes from "prop-types";
import { Title } from "./Title";

const ProfileTitle = ({ title }) => {
  return (
    <div className="w-full py-2 border-b-2 border-[var(--color-secondary-500)]">
      <Title size="xl" className="text-[color:var(--color-default-500)]">
        {title}
      </Title>
    </div>
  );
};

export default ProfileTitle;

ProfileTitle.propTypes = {
  title: PropTypes.string,
};
