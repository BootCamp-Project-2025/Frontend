import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { ExpandableText } from "../../../../shared/components/molecules/ExpandableText";
import { Icon } from "../../../../shared/components/atoms/Icon";

export const CourseDetailsTeacher = ({
  avatarURL = "avatarURL",
  name = "Teacher Name",
  rating = 0,
  students = 0,
  courses = 0,
  aboutMe = "Teacher About me",
  teacherId = "teacherId",
}) => {
  return (
    <div className="flex flex-col items-center md:items-start  md:flex-row gap-6">
      <Link
        to={`/teachers/${teacherId}`}
        className="w-[9.3rem] h-[9.3rem] min-w-[9.3rem] min-h-[9.3rem] rounded-full overflow-hidden border border-gray-200"
      >
        <img src={avatarURL} alt="teacher image" className="w-full" />
      </Link>
      <div className="flex flex-col gap-2 items-center md:items-start">
        <div className="flex">
          <Link
            to={`/teachers/${teacherId}`}
            className="text-primary-600 font-bold text-xl border-b border-primary-600 py-1.5"
          >
            {name}
          </Link>
        </div>
        <div className=" flex flex-row gap-4 text-gray-600 flex-wrap justify-center">
          <div className="flex flex-row gap-2 items-center">
            <Icon icon={"star"} className="h-[1.1rem] w-[1.1rem]"></Icon>
            <p className="text-nowrap">{rating} Rating</p>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <Icon icon={"group"} className="h-[1.1rem] w-[1.1rem]"></Icon>
            <p className="text-nowrap">{students} Students</p>
          </div>

          <div className="flex flex-row gap-2 items-center">
            <Icon icon={"liveTv"} className="h-[1.1rem] w-[1.1rem]"></Icon>
            <p className="text-nowrap">{courses} Courses</p>
          </div>
        </div>
        <ExpandableText text={aboutMe}></ExpandableText>
      </div>
    </div>
  );
};

CourseDetailsTeacher.propTypes = {
  avatarURL: PropTypes.string,
  name: PropTypes.string,
  rating: PropTypes.number,
  students: PropTypes.number,
  courses: PropTypes.number,
  aboutMe: PropTypes.string,
  teacherId: PropTypes.string,
};
