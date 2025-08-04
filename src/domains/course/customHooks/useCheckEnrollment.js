import { useEffect, useState } from "react";
import { baseAPI } from "../../../shared/api/axios/AxiosConnection";

export const useCheckEnrollment = (courseId) => {
  const [isEnrolled, setIsEnrolled] = useState(null);
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
        const enrolled =
          dataFetch?.data?.isEnrolled && enrollment?.status !== "CANCELED";
        setIsEnrolled(enrolled);
        setError(null);
      } catch (err) {
        setError(err);
        setIsEnrolled(null);
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
