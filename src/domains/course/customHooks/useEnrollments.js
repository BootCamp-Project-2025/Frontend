import { useEffect, useState } from "react";
import { baseAPI } from "../../../shared/api/axios/AxiosConnection";

export const useEnrollments = (userId) => {
  const [enrollments, setEnrollments] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const { data: enrollmentList } = await baseAPI.get(
          `users/${userId}/enrollments`
        );

        const courseRequests = enrollmentList.map((enrollment) =>
          baseAPI.get(`courses/${enrollment.courseId}`)
        );

        const courseResponses = await Promise.all(courseRequests);

        const enrichedEnrollments = enrollmentList.map((enrollment, index) => ({
          ...enrollment,
          course: courseResponses[index].data,
        }));

        setEnrollments(enrichedEnrollments);
        setError(false);
      } catch (err) {
        console.error(err);
        setError(true);
        setEnrollments(null);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchEnrollments();
    }
  }, [userId]);

  return { enrollments, loading, error };
};
