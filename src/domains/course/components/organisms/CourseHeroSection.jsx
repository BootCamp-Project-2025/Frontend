import { Button } from "../../../../shared/components/atoms/Button";
import { CourseDetailsCategory } from "../molecules/CourseDetailsCategory";
import { CourseDetailsCreatedBy } from "../molecules/CourseDetailsCreatedBy";
import { CourseDetailsLanguage } from "../molecules/CourseDetailsLanguage";
import { CourseDetailsStats } from "../molecules/CourseDetailsStats";
import PropTypes from "prop-types";

export const CourseHeroSection = ({
  title = "Course Title",
  teacher = "Teacher Name",
  language = "Language name",
  category = "Category",
  subCategory = "SubCategory",
  imgSrc = "/defaultImage3.png",
  raters = 0,
  students = 0,
  rating = 0,
}) => {
  return (
    <div className=" md:bg-[#2D2D2F]  ">
      <div className="flex md:text-white text-gray-900 md:py-10 pt-10 pb-0 gap-15  w-[80rem] max-w-[90%] m-auto items-center justify-between">
        <div className="w-full flex flex-col gap-4.5">
          <CourseDetailsCategory
            category={category}
            subCategory={subCategory}
          ></CourseDetailsCategory>
          <div className="flex md:hidden  w-full rounded-lg overflow-hidden">
            <img src={imgSrc} alt="course image" className="w-full" />
          </div>
          <p className=" font-bold text-3xl line-clamp-2">{title}</p>
          <CourseDetailsStats
            rating={rating}
            raters={raters}
            students={students}
          ></CourseDetailsStats>
          <CourseDetailsCreatedBy teacher={teacher}></CourseDetailsCreatedBy>
          <CourseDetailsLanguage language={language}></CourseDetailsLanguage>
          <Button className="flex md:hidden justify-center">Enroll In</Button>
        </div>
        <div className="hidden md:flex flex-col w-[21rem] min-w-[21rem] p-3 gap-3.5 bg-white rounded-xl">
          <div className="flex w-full rounded-lg overflow-hidden aspect-[1/0.6] bg-gray-200">
            <img
              src={imgSrc}
              alt="course image"
              className="w-full h-full"
            />
          </div>
          <Button className="flex justify-center">Enroll In</Button>
        </div>
      </div>
    </div>
  );
};
CourseHeroSection.propTypes = {
  title: PropTypes.string,
  teacher: PropTypes.string,
  language: PropTypes.string,
  category: PropTypes.string,
  subCategory: PropTypes.string,
  imgSrc: PropTypes.string,
  raters: PropTypes.number,
  students: PropTypes.number,
  rating: PropTypes.number,
};
