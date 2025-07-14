import PropTypes from "prop-types";
import { Title } from "../../../../shared/components/atoms/Title.jsx";
import { Button } from "../../../../shared/components/atoms/Button.jsx";
import { Icon } from "../../../../shared/components/atoms/Icon.jsx";

const ProfileDetailCard = ({
  onClickEdit,
  title,
  children,
  isEditable = false,
}) => {
  return (
    <div className="border border-[color:var(--color-default-400)] rounded-md md:min-w-min w-full">
      <div className="flex justify-between items-center p-2 rounded-md bg-[color:var(--color-secondary-100)]">
        <Title color="default">{title}</Title>
        {isEditable && (
          <Button
            color="default"
            radius="full"
            square
            size="sm"
            onClick={onClickEdit}
          >
            <Icon icon={"edit"} />
          </Button>
        )}
      </div>
      {children}
    </div>
  );
};

export default ProfileDetailCard;

ProfileDetailCard.propTypes = {
  title: PropTypes.string,
  onClickEdit: PropTypes.func,
  children: PropTypes.node,
  isEditable: PropTypes.bool,
};
