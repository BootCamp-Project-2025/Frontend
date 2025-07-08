import PropTypes from "prop-types";
import CourseCardList from "../organisms/CourseCardList";
import { WarningMessage } from "../molecules/WarningMessage";
import { Title } from "../../../../shared/components/atoms/Title";

function CourseSection({ teacherProfileCompleted = true }) {
  return (
    <div className="flex flex-col items-center space-y-6">
      <Title
        color="default"
        className="border-b border-b-[color:var(--color-default-500)] w-4/5"
      >
        {"Courses Section"}
      </Title>
      {teacherProfileCompleted ? <CourseCardList /> : <WarningMessage />}
    </div>
  );
}

CourseSection.propTypes = {
  teacherProfileCompleted: PropTypes.bool,
};

export default CourseSection;
