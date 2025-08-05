import { Icon } from "../../../../shared/components/atoms/Icon";
import PropTypes from "prop-types";

export default function SyllabusInfo({ className = "", ...props }) {
  return (
    <div
      data-testid={"SyllabusInfo"}
      className={`${className} flex border-1 gap-4 w-[80%] lg:mx-50 xl:mx-80 py-3 px-6 rounded-lg`}
      {...props}
    >
      <Icon className={"w-100 self-center"} icon="syllabusAlert" />
      <p className="">
        {`Here will be a text to guide the teacher, for example:
        \n
        Add course content here, such as classes, course sections, assignments,
        and much more. Click on the + icon on the left to get started.
        \n
        And more minimal instructions.`}
      </p>
    </div>
  );
}
SyllabusInfo.propTypes = {
  className: PropTypes.string,
};
