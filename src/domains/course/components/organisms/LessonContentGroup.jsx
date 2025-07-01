import { Title } from "../../../../shared/components/atoms/Title";
import LessonContentRow from "../atoms/LessonContentRow";
import PropTypes from "prop-types";

export default function LessonContentGroup({ title, className, ...props }) {
  return (
    <div className={`px-5 py-3 ${className}`} {...props}>
      <Title color="black">{title}</Title>
      <div className="px-2">
        <LessonContentRow text={"example text"} />
      </div>
    </div>
  );
}

LessonContentGroup.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
};
