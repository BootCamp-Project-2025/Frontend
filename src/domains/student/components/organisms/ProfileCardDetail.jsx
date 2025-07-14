import PropTypes from "prop-types";
import { Title } from "../../../../shared/components/atoms/Title";
import { Button } from "../../../../shared/components/atoms/Button";
import { Icon } from "../../../../shared/components/atoms/Icon";
import GridPersonalDetail from "../molecules/GridPersonalDetail";

const ProfileCardDetail = ({ onClickEdit, title }) => {
  return (
    <div className="border border-[color:var(--color-default-400)] rounded-md max-w-1/2 w-full">
      <div className="flex justify-between items-center p-2 bg-[color:var(--color-secondary-100)]">
        <Title color="default">{title}</Title>
        <Button
          color="default"
          radius="full"
          square
          size="sm"
          onClick={onClickEdit}
        >
          <Icon icon={"edit"} />
        </Button>
      </div>
      <GridPersonalDetail />
    </div>
  );
};

export default ProfileCardDetail;

ProfileCardDetail.propTypes = {
  title: PropTypes.string,
  onClickEdit: PropTypes.func,
};
