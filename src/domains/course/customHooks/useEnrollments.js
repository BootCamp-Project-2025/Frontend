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

        const courseRequests = enrollmentList.data.map((enrollment) =>
          baseAPI.get(`courses/${enrollment.courseId}`)
        );

        const courseResponses = await Promise.all(courseRequests);

        const enrichedEnrollments = enrollmentList.data.map(
          (enrollment, index) => {
            const courseData = courseResponses[index].data?.data || {};

            return {
              enrollmentId: enrollment.id,
              courseId: courseData.id,
              name: courseData.name || "Untitled",
              description: courseData.description || "",
              imageURL: courseData.imgSrc || "/default-course.png",
              author: courseData.author || "Unknown",
              enrollmentDate: enrollment.createdAt,
              rating: courseData.rating || 0,
              status: enrollment.status,
            };
          }
        );

        const activeEnrollments = enrichedEnrollments.filter(
          (e) => e.status !== "CANCELED"
        );

        setEnrollments(activeEnrollments);
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

  return { enrollments, loading, error, setEnrollments };
};
