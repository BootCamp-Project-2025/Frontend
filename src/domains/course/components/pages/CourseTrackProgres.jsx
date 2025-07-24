import CourseContentTrackBar from "../templates/CourseContentTrackBar";
import CourseContentVisualizer from "../templates/CourseContentVisualizer";
import { useCourseTrack } from "../../api/useCourseTrack";
import { useState, useEffect } from "react";

export default function CourseTrackProgres() {
  const {
    responseData: courseData,
    loading: loadingCourse,
    error: errorCourse,
  } = useCourseTrack("requestCourse");

  const {
    responseData: studentTrack,
    loading: loadingStudentTrack,
    error: errorStudentTrack,
  } = useCourseTrack("requestStudentTrackProgress");

  const loading = loadingCourse || loadingStudentTrack;
  const error = errorCourse || errorStudentTrack;

  const [currentContent, setCurrentContent] = useState();
  const [content, setContent] = useState();

  useEffect(() => {
    if (!loading && !error) {
      console.log(courseData, studentTrack, "we recovered the results");
    }
  }, [loading, error, courseData, studentTrack]);

  return (
    !loading && (
      <div className="flex flex-row">
        <CourseContentVisualizer />
        <CourseContentTrackBar />
      </div>
    )
  );
}
