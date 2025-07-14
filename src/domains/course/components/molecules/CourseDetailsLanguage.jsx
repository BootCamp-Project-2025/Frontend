import PropTypes from "prop-types";
import { Icon } from "../../../../shared/components/atoms/Icon";

export const CourseDetailsLanguage = ({ language = "laguageName" }) => {
  return (
    <div className="flex flex-row gap-1.5 items-center">
      <Icon icon={"language"} className="h-[1.25rem] w-[1.25rem]"></Icon>
      <p>{language}</p>
    </div>
  );
};

CourseDetailsLanguage.propTypes = {
  language: PropTypes.string,
};
