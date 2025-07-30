import { useEffect, useState } from "react";
import { baseAPI } from "../../../shared/api/axios/AxiosConnection";

export const useCheckEnrollment = (courseId) => {
  const [isEnrolled, setIsEnrolled] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchIsEnrolled = async () => {
      try {
        const { data: dataFetch } = await baseAPI.get(
          `enrollments/course/${courseId}`
        );
        setIsEnrolled(
          dataFetch?.data?.isEnrolled &&
            dataFetch?.data?.enrollment.status !== "CANCELED"
        );
        setError(false);
      } catch (err) {
        if (err.response?.status === 404) {
          setIsEnrolled(false);
          setError(false);
        } else {
          setError(err);
          setIsEnrolled(null);
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchIsEnrolled();
    }
  }, [courseId]);

  return { isEnrolled, loading, error, setIsEnrolled };
};
