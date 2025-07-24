import { useState } from "react";
import PropTypes from "prop-types";
import { Icon } from "../../../../shared/components/atoms/Icon";
export const CourseDetailsModule = ({
  title = "title accordion",
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
              <Icon
                icon={"arrowForward"}
                className={`h-[1rem] w-[1rem] transition-all duration-100 text-gray-600 ${isOpen ? "rotate-[90deg]" : ""} `}
              ></Icon>
              <div className="flex w-full gap-1 items-center ">
                <p className="w-full text-lg sm:text-xl text-gray-600 font-bold text-start">
                  {title}
                </p>
                <p className=" text-base sm:text-lg text-gray-400 font-light text-nowrap">
                  {lessons.length > 1
                    ? `${lessons.length} lessons`
                    : "1 lesson"}
                </p>
              </div>
            </div>
          </button>
          {isOpen &&
            lessons.length > 0 &&
            lessons.map((lesson, index) => (
              <div
                key={index}
                className="w-full flex flex-col  bg-gray-50   py-5 px-5 border-b border-gray-500  text-gray-600 font-medium"
              >
                <p className="font-medium">{lesson.title}</p>

                {lesson.videoUrls && lesson.videoUrls.length > 0 && (
                  <div className="flex items-start gap-3 mt-2">
                    <Icon icon={"youtube"} className={"mt-1"}></Icon>
                    <ul>
                      {lesson.videoUrls.map((url, idx) => (
                        <li key={idx}>
                          <p>{url}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {lesson.resources && lesson.resources.length > 0 && (
                  <div className="flex items-start gap-3 mt-2">
                    <Icon icon={"document"} className={"mt-1"}></Icon>
                    <ul>
                      {lesson.resources.map((resource, idx) => (
                        <li key={idx}>
                          <p>{resource.name}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

CourseDetailsModule.propTypes = {
  title: PropTypes.string,
  lessons: PropTypes.array,
};
