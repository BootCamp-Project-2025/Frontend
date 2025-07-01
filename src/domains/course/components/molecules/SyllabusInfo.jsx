import { Icon } from "../../../../shared/components/atoms/Icon";
import PropTypes from "prop-types";

export default function SyllabusInfo({ className = "", ...props }) {
  return (
    <div
      className={`${className} flex border-1 py-3 px-6 rounded-lg`}
      {...props}
    >
      <Icon icon="syllabusAlert" />
      <p className="w-96 ">
        Here will be a text to guide the teacher, for example:
        <br />
        Add course content here, such as classes, course sections, assignments,
        and much more. Click on the + icon on the left to get started.
        <br />
        And more minimal instructions.
      </p>
    </div>
  );
}
SyllabusInfo.propTypes = {
  className: PropTypes.string,
};
