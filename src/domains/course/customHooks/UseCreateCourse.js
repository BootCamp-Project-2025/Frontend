import { createCourse } from "../api/CourseAPI";
import { useState } from "react";

export function useCreateCourse() {
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState(null);

  const create = async (courseData) => {
    setIsCreating(true);
    setError(null);
    try {
      const createdCourse = await createCourse(courseData);
      return createdCourse;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setIsCreating(false);
    }
  };

  return { create, isCreating, error };
}
