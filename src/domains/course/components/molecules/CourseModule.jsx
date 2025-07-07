import { useState } from "react";
import PropTypes from "prop-types";

export const CourseModule = ({
  titleModule = "title accordion",
  lessons = [],
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="flex w-full">
        <div className=" w-full">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex cursor-pointer bg-gray-100  hover:bg-gray-200  py-5 px-5 border-b border-gray-500 "
          >
            <div className=" w-full flex items-center gap-2 ">
              <svg
                className={`transition-all duration-100 text-gray-600 ${isOpen ? "" : "rotate-180"} `}
                height="1.5rem"
                viewBox="0 -960 960 960"
                width="1.5rem"
                fill="currentColor"
              >
                <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
              </svg>
              <div className="flex w-full gap-1 items-center ">
                <p className="w-full text-lg sm:text-xl text-gray-600 font-bold text-start">
                  {titleModule}
                </p>
                <p className=" text-base sm:text-lg text-gray-400 font-light text-nowrap">
                  {lessons.length} lessons
                </p>
              </div>
            </div>
          </button>
          {isOpen &&
            lessons.map((lesson, index) => {
              return (
                <p
                  key={index}
                  className="w-full flex  bg-gray-50   py-5 px-5 border-b border-gray-500  text-gray-600 font-medium"
                >
                  {lesson}
                </p>
              );
            })}
        </div>
      </div>
    </>
  );
};

CourseModule.propTypes = {
  titleModule: PropTypes.string,
  lessons: PropTypes.array,
  children: PropTypes.element,
};
