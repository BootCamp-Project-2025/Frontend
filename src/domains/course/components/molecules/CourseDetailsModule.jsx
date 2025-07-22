import { useState } from "react";
import { Icon } from "../../../../shared/components/atoms/Icon";
import PropTypes from "prop-types";

export const CourseDetailsModule = ({ responseData }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col border border-gray-400 border-b-0">
      {responseData && responseData.length > 0 ? (
        responseData.map((m, idx) => (
          <div key={idx} className="flex w-full">
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
                      {m.titleModule}
                    </p>
                    <p className=" text-base sm:text-lg text-gray-400 font-light text-nowrap">
                      {m.lessons.length} lessons
                    </p>
                  </div>
                </div>
              </button>
              {isOpen &&
                m.lessons.map((lesson, index) => {
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
        ))
      ) : (
        <p>There is not modules availables</p>
      )}
    </div>
  );
};

CourseDetailsModule.propTypes = {
  responseData: PropTypes.arrayOf({
    titleModule: PropTypes.string.isRequired,
    lessons: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
};
