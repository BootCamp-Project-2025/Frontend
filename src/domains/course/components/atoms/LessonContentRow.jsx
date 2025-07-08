import { Button } from "../../../../shared/components/atoms/Button";
import { Icon } from "../../../../shared/components/atoms/Icon";
import PropTypes from "prop-types";

export default function LessonContentRow({
  eraseResource,
  name,
  url,
  className,
  ...props
}) {
  return (
    <div className={`${className} flex justify-between mt-2`} {...props}>
      <a href={url} className="text-blue-500">
        {name}
      </a>
      <Button
        onClick={() => eraseResource(name)}
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
  url: PropTypes.string,
  className: PropTypes.string,
};
