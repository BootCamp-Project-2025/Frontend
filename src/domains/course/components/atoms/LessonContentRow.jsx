import { Button } from "../../../../shared/components/atoms/Button";
import { Icon } from "../../../../shared/components/atoms/Icon";
import PropTypes from "prop-types";

export default function LessonContentRow({
  eraseResource,
  resourcePosition,
  name,
  link,
  className,
  ...props
}) {
  return (
    <div className={`${className} flex justify-between mt-2`} {...props}>
      <a href={link} className="text-blue-500">
        {name}
      </a>
      <Button
        onClick={() => eraseResource(resourcePosition)}
        variant="light"
        color="secondary"
        className={`px-5 `}
      >
        <Icon icon={"trashCan"} />
      </Button>
    </div>
  );
}

LessonContentRow.propTypes = {
  name: PropTypes.string,
  eraseResource: PropTypes.func,
  resourcePosition: PropTypes.number,
  link: PropTypes.string,
  className: PropTypes.string,
};
