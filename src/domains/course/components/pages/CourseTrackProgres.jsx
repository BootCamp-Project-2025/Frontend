import { useEffect, useState, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import CourseContentTrackBar from "../templates/CourseContentTrackBar";
import CourseContentVisualizer from "../templates/CourseContentVisualizer";
import { ApiGet } from "../../api/ApiGet";
import { ApiPut } from "../../api/ApiPut";

export default function CourseTrackProgress({
  enrollmentId = "53a42078-2b49-4d10-80bc-55f9c752103b",
}) {
  /* const { enrollmentId } = useParams(); */

  const [modules, setModules] = useState([]);
  const [originalModules, setOriginalModules] = useState([]);
  const [progressMap, setProgressMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentResourceIndex, setCurrentResourceIndex] = useState(0);
  const [progressPercentage, setProgressPercentage] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const { data, error: apiError } = await ApiGet(
          `student-track-progress/enrollment/${enrollmentId}`
        );

        if (apiError) throw new Error("API error fetching course progress");

        const {
          modules,
          studentTrackProgresses,
          progress: progressPercentage,
        } = data.data;

        console.log(modules);
        setOriginalModules(modules);
        setProgressPercentage(progressPercentage);

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
        setProgressMap(progressObj);

        let globalCounter = 0;
        const resources = modules.flatMap((mod) =>
          mod.props.lessons.currentItems.flatMap((lesson) => {
            const videoResources = (lesson.props.videoUrls || []).map((v) => ({
              lessonId: lesson._id.value,
              title: `${lesson.props.title.props.title}`,
              description: lesson.props.description.props.description,
              url: v.props.url,
              type: "video",
              globalIndex: globalCounter++,
              modTitle: mod.props.title.props.title,
              courseTitle: "Angular course",
            }));

            const fileResources = (lesson.props.resources || []).map((r) => ({
              lessonId: lesson._id.value,
              title: `${lesson.props.title.props.title}`,
              description: lesson.props.description.props.description,
              url: r.props.url,
              type: r.props.url.endsWith(".pdf") ? "pdf" : "link",
              globalIndex: globalCounter++,
              modTitle: mod.props.title.props.title,
              courseTitle: "Angular course",
            }));

            return [...videoResources, ...fileResources];
          })
        );

        setModules(resources);

        const initialIndex = getInitialResourceIndex(resources, progressObj);
        setCurrentResourceIndex(initialIndex);
      } catch (err) {
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
                    url: resource.url,
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

        const { error: apiError } = await ApiPut(
          `/student-track-progress/${progress.id}`,
          payload
        );

        if (apiError) return;

        setProgressMap((prev) => ({
          ...prev,
          [resource.lessonId]: {
            ...prev[resource.lessonId],
            ...payload,
          },
        }));
      } catch (err) {}
    },
    [progressMap]
  );

  const currentResource = useMemo(
    () => modules[currentResourceIndex],
    [modules, currentResourceIndex]
  );

  const modulesWithResources = useMemo(() => {
    return mapModulesWithCompletion(originalModules, modules);
  }, [originalModules, modules]);

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
        progress={progressPercentage}
        originalModules={modulesWithResources}
        resources={modules}
        currentIndex={currentResourceIndex}
        onSelectResource={handleSelectResource}
      />
    </div>
  );
}

function getInitialResourceIndex(resources, progressObj) {
  if (!resources.length) return 0;

  const completedIndices = resources
    .map((res, index) => {
      const prog = progressObj[res.lessonId];
      const isCompleted =
        res.type === "video"
          ? prog?.videoProgresses?.some((v) => v.url === res.url && v.completed)
          : prog?.resourcesCompleted?.some((r) => r.url === res.url);

      return { index, completed: isCompleted };
    })
    .filter((r) => r.completed)
    .map((r) => r.index);

  if (completedIndices.length === 0) {
    return 0;
  }

  const lastCompletedIndex = completedIndices[completedIndices.length - 1];
  const nextIndex = lastCompletedIndex + 1;

  return nextIndex < resources.length ? nextIndex : lastCompletedIndex;
}

function mapModulesWithCompletion(originalModules, flatResources) {
  return originalModules.map((module) => {
    const lessons = module.props.lessons.currentItems.map((lesson) => {
      const resourcesForLesson = flatResources.filter(
        (res) => res.lessonId === lesson._id.value
      );

      return {
        id: lesson._id.value,
        title: lesson.props.title.props.title,
        completed: resourcesForLesson.every((res) => res.type === "video"),
        resources: resourcesForLesson,
      };
    });

    return {
      title: module.props.title.props.title,
      lessons,
    };
  });
}
