import { deleteCourse } from "../api/CourseAPI";
import { useState } from "react";

export function useDeleteCourse() {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  const remove = async (courseId) => {
    setIsDeleting(true);
    setError(null);
    try {
      await deleteCourse(courseId);
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setIsDeleting(false);
    }
  };

  return { remove, isDeleting, error };
}
