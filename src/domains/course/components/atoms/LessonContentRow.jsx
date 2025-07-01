import { Icon } from "../../../../shared/components/atoms/Icon";
import PropTypes from "prop-types";

export default function LessonContentRow({ text, className, ...props }) {
  return (
    <div className={`${className} flex justify-between`} {...props}>
      <p className="text-blue-500">{text}</p>
      <Icon icon={"trashCan"} />
    </div>
  );
}

LessonContentRow.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
};
