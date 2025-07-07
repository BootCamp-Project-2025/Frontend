import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { ExpandableText } from "../../../../shared/components/molecules/ExpandableText";

export const CourseDetailTeacher = ({
  avatarURL,
  name,
  rating,
  students,
  courses,
  aboutMe,
}) => {
  return (
    <div className="flex flex-col items-center  md:flex-row gap-6">
      <Link
        to={""}
        className="w-[9.3rem] h-[9.3rem] min-w-[9.3rem] min-h-[9.3rem] rounded-full overflow-hidden"
      >
        <img src={avatarURL} alt="teacher image" className="w-full" />
      </Link>
      <div className="flex flex-col gap-2 items-center md:items-start">
        <div className="flex">
          <Link
            to={""}
            className="text-primary-600 font-bold text-xl border-b border-primary-600 py-1.5"
          >
            {name}
          </Link>
        </div>
        <div className=" flex flex-row gap-4 text-gray-600 flex-wrap justify-center">
          <div className="flex flex-row gap-2 items-center">
            <svg
              height="1.1rem"
              viewBox="0 -960 960 960"
              width="1.1rem"
              fill="currentColor"
            >
              <path d="m233-120 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
            </svg>
            <p className="text-nowrap">{rating} Rating</p>
          </div>

          <div className="flex flex-row gap-2 items-center">
            <svg
              height="1.1rem"
              viewBox="0 -960 960 960"
              width="1.1rem"
              fill="currentColor"
            >
              <path d="M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120H760ZM360-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81q0-42-14.5-81T544-792q14-5 28-6.5t28-1.5q66 0 113 47t47 113ZM120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0 320Zm0-400Z" />
            </svg>
            <p className="text-nowrap">{students} Students</p>
          </div>

          <div className="flex flex-row gap-2 items-center">
            <svg
              height="1.1rem"
              viewBox="0 -960 960 960"
              width="1.1rem"
              fill="currentColor"
            >
              <path d="m380-340 280-180-280-180v360Zm-60 220v-80H160q-33 0-56.5-23.5T80-280v-480q0-33 23.5-56.5T160-840h640q33 0 56.5 23.5T880-760v480q0 33-23.5 56.5T800-200H640v80H320ZM160-280h640v-480H160v480Zm0 0v-480 480Z" />
            </svg>
            <p className="text-nowrap">{courses} Courses</p>
          </div>
        </div>
        <ExpandableText text={aboutMe}></ExpandableText>
      </div>
    </div>
  );
};

CourseDetailTeacher.propTypes = {
  avatarURL: PropTypes.string,
  name: PropTypes.string,
  rating: PropTypes.number,
  students: PropTypes.number,
  courses: PropTypes.number,
  aboutMe: PropTypes.string,
};
