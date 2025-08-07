import { useEffect, useState } from "react";
import { baseAPI } from "../../../shared/api/axios/AxiosConnection";

export const useGetEnrollment = (courseId) => {
  const [enrollment, setEnrollment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIsEnrolled = async () => {
      setLoading(true);
      try {
        const { data: dataFetch } = await baseAPI.get(
          `enrollments/course/${courseId}`
        );
        const enrollment = dataFetch?.data?.enrollment;
        setEnrollment(enrollment);
        setError(null);
      } catch (err) {
        setError(err);
        setEnrollment(null);
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchIsEnrolled();
    }
  }, [courseId]);

  return { enrollment, loading, error, setEnrollment };
};
