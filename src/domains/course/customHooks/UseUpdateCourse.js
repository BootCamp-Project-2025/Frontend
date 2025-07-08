import { updateCourse } from "../api/CourseAPI";
import { useState } from "react";

export function useUpdateCourse() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState(null);

  const update = async (courseId, courseData) => {
    setIsUpdating(true);
    setError(null);
    try {
      const updatedCourse = await updateCourse(courseId, courseData);
      return updatedCourse;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setIsUpdating(false);
    }
  };

  return { update, isUpdating, error };
}
