import React from "react";
import CourseCardList from "../organisms/CourseCardList";
import { CourseSectionMenu } from "../organisms/CourseSectionMenu";

export const TeacherCourseSection = () => {
  const searchCourses = ({ search, filter, sort }) => {
    console.log("Search: " + search);
    console.log("Filter: " + filter);
    console.log("Sort: " + sort);
  };

  const handleBtnNewCourse = () => {
    console.log("Show pop up new course");
  };
  return (
    <main>
      <h1 className="text-[2.5rem] font-bold text-[#374151] border-b border-[#374151]">
        Course Section
      </h1>
      <div className="flex flex-col py-10 gap-3">
        <CourseSectionMenu
          searchCourses={searchCourses}
          onNewCourse={handleBtnNewCourse}
        ></CourseSectionMenu>
        <CourseCardList></CourseCardList>
      </div>
    </main>
  );
};
