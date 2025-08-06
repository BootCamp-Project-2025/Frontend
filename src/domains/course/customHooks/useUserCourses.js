import { useEffect, useState } from "react";
import { baseAPI } from "../../../shared/api/axios/AxiosConnection";

export const useUserCourses = (userId) => {
  const [courses, setCourses] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserCourses = async () => {
      try {
        const { data } = await baseAPI.get(`/users/${userId}/courses`);
        const courseList = data?.data || [];

        setCourses(courseList);
        setError(null);
      } catch (err) {
        setError(err);
        setCourses(null);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserCourses();
    }
  }, [userId]);

  return { courses, loading, error, setCourses };
};
