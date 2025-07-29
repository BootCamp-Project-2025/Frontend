import { useEffect, useState, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import CourseContentTrackBar from "../templates/CourseContentTrackBar";
import CourseContentVisualizer from "../templates/CourseContentVisualizer";
import { ApiGet } from "../../api/ApiGet";
import { ApiPut } from "../../api/ApiPut";

export default function CourseTrackProgress({
  enrollmentId = "621f4060-ddfa-4ddd-8b7d-b23480da0221",
}) {
  /* const { enrollmentId } = useParams(); */

  const [modules, setModules] = useState([]);
  const [progressMap, setProgressMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentResourceIndex, setCurrentResourceIndex] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const { data, error: apiError } = await ApiGet(
          `student-track-progress/enrollment/${enrollmentId}`
        );

        if (apiError) {
          throw new Error("API error fetching course progress");
        }
        console.log(data);
        const { modules, studentTrackProgresses } = data.data;

        console.log(modules, studentTrackProgresses);

        const progressObj = studentTrackProgresses.reduce((acc, track) => {
          acc[track.props.lessonId] = {
            id: track._id.value,
            enrollmentId: track.props.enrollmentId.props.value.value,
            lessonId: track.props.lessonId,
            videoProgresses: track.props.videoProgresses,
            resourcesCompleted: track.props.resourcesCompleted,
            completed: track.props.completed,
          };
          return acc;
        }, {});
        console.log(progressObj);
        setProgressMap(progressObj);

        const resources = modules.flatMap((mod) =>
          mod.props.lessons.currentItems.map((lesson) => {
            const videoUrls = lesson.props.videoUrls || [];
            const resourcesUrls = lesson.props.resources || [];

            return {
              lessonId: lesson._id.value,
              title: lesson.props.title.props.title,
              description: lesson.props.description.props.description,
              videoUrls,
              resources: resourcesUrls,
              type:
                videoUrls.length > 0
                  ? "video"
                  : resourcesUrls.some((r) => r.url.endsWith(".pdf"))
                    ? "pdf"
                    : "link",
            };
          })
        );
        console.log(resources);
        setModules(resources);
      } catch (err) {
        console.error("Error fetching student track progress:", err);
        setError("Failed to load course progress.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [enrollmentId]);

  const handleSelectResource = useCallback((index) => {
    setCurrentResourceIndex(index);
  }, []);

  const handleCompleteResource = useCallback(
    async (resource) => {
      const progress = progressMap[resource.lessonId];
      if (!progress) return;

      try {
        const payload = {
          id: progress.id,
          enrollmentId: progress.enrollmentId,
          lessonId: resource.lessonId,
          videoProgresses:
            resource.type === "video"
              ? [
                  {
                    url: resource.videoUrls?.[0] || resource.url,
                    watchedSeconds: resource.duration || 0,
                    completed: true,
                  },
                ]
              : progress.videoProgresses,
          resourcesCompleted:
            resource.type !== "video"
              ? [...progress.resourcesCompleted, { url: resource.url }]
              : progress.resourcesCompleted,
          completed: false,
          completedAt: new Date().toISOString(),
        };

        const { data, error: apiError } = await ApiPut(
          `/student-track-progress/${progress.id}`,
          payload
        );

        if (apiError) {
          console.error("Error updating progress:", data);
          return;
        }

        setProgressMap((prev) => ({
          ...prev,
          [resource.lessonId]: {
            ...prev[resource.lessonId],
            ...payload,
          },
        }));
      } catch (err) {
        console.error("Error updating progress:", err);
      }
    },
    [progressMap]
  );

  const currentResource = useMemo(
    () => modules[currentResourceIndex],
    [modules, currentResourceIndex]
  );

  if (loading)
    return <p className="text-center mt-4">Loading course content...</p>;
  if (error) return <p className="text-center text-red-500 mt-4">{error}</p>;
  if (!modules.length)
    return <p className="text-center mt-4">No course content available.</p>;

  return (
    <div className="flex flex-row w-full">
      <CourseContentVisualizer
        resource={currentResource}
        onComplete={handleCompleteResource}
      />
      <CourseContentTrackBar
        resources={modules}
        currentIndex={currentResourceIndex}
        onSelectResource={handleSelectResource}
      />
    </div>
  );
}
