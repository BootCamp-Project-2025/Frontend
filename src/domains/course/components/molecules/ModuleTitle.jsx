import PropTypes from "prop-types";
import { Title } from "../../../../shared/components/atoms/Title";
import { Icon } from "../../../../shared/components/atoms/Icon";
import { Button } from "../../../../shared/components/atoms/Button";

export default function ModuleTitle({
  moduleNumber = 0,
  title = "",
  ...props
}) {
  return (
    <div className={`flex items-center justify-between`} {...props}>
      <div className="flex items-center gap-4">
        <Title color="black">
          {`Module ${moduleNumber}:`}
          <span className="ml-4 font-medium">{title}</span>
        </Title>
        <Button variant="light" color="secondary">
          <Icon icon={"editBlack"} />
        </Button>
      </div>
      <Button variant="light" color="secondary" className={"px-5"}>
        <Icon icon={"trashCan"} />
      </Button>
    </div>
  );
}

ModuleTitle.propTypes = {
  title: PropTypes.string,
  moduleNumber: PropTypes.number,
};
