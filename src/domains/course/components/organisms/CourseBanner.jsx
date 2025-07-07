import { Button } from "../../../../shared/components/atoms/Button";
import { CourseBannerCategory } from "../atoms/CourseBannerCategory";
import { CourseBannerCreatedBy } from "../atoms/CourseBannerCreatedBy";
import { CourseBannerLanguage } from "../atoms/CourseBannerLanguage";
import { CourseBannerInfo } from "../molecules/CourseBannerInfo";
import PropTypes from "prop-types";

export const CourseBanner = ({
  title = "Course Title",
  teacher = "Teacher Name",
  teacherId,
  language = "Language name",
  category = "Category",
  subCategory = "SubCategory",
  courseImage = "/defaultImage3.png",
  raters = 0,
  students = 0,
  rating = 0,
}) => {
  return (
    <div className=" md:bg-[#2D2D2F]  ">
      <div className="flex md:text-white text-gray-900 md:py-10 pt-10 pb-0 gap-15  w-[80rem] max-w-[90%] m-auto items-center justify-between">
        <div className="w-full flex flex-col gap-4.5">
          <CourseBannerCategory
            category={category}
            subCategory={subCategory}
          ></CourseBannerCategory>
          <div className="flex md:hidden  w-full rounded-lg overflow-hidden">
            <img src={courseImage} alt="course image" className="w-full" />
          </div>
          <p className=" font-bold text-3xl line-clamp-2">{title}</p>
          <CourseBannerInfo
            raters={raters}
            students={students}
            rating={rating}
          ></CourseBannerInfo>
          <CourseBannerCreatedBy
            teacher={teacher}
            teacherId={teacherId}
          ></CourseBannerCreatedBy>
          <CourseBannerLanguage language={language}></CourseBannerLanguage>
          <Button className="flex md:hidden justify-center">Enroll In</Button>
        </div>
        <div className="hidden md:flex flex-col w-[21rem] min-w-[21rem] p-3 gap-3.5 bg-white rounded-xl">
          <div className="flex w-full rounded-lg overflow-hidden">
            <img src={courseImage} alt="course image" className="w-full" />
          </div>
          <Button className="flex justify-center">Enroll In</Button>
        </div>
      </div>
    </div>
  );
};
CourseBanner.propTypes = {
  title: PropTypes.string,
  teacher: PropTypes.string,
  teacherId: PropTypes.string,
  language: PropTypes.string,
  category: PropTypes.string,
  subCategory: PropTypes.string,
  courseImage: PropTypes.string,
  raters: PropTypes.number,
  students: PropTypes.number,
  rating: PropTypes.number,
};
