import PropTypes from "prop-types";
import { Card } from "../../../../shared/components/atoms/Card";
import { Title } from "../../../../shared/components/atoms/Title";

export const ProfileSection = ({ title, children }) => {
  return (
    <Card bordered>
      <Title size="xl">{title}</Title>
      <div className="flex flex-col w-full mt-4 gap-4">{children}</div>
    </Card>
  );
};

ProfileSection.propTypes = {
  title: PropTypes.string,
  children: PropTypes.element,
};
