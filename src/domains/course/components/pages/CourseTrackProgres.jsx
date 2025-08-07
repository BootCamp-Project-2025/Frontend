import { useEffect, useState, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import CourseContentTrackBar from "../templates/CourseContentTrackBar";
import CourseContentVisualizer from "../templates/CourseContentVisualizer";
import { ApiGet } from "../../api/ApiGet";
import { ApiPut } from "../../api/ApiPut";
import { Loading } from "../../../../shared/components/molecules/Loading";
import { Alert } from "../../../../shared/components/molecules/Alert";
import { useGetEnrollment } from "../../customHooks/useGetEnrollment";

export default function CourseTrackProgress() {
  const { courseId } = useParams();
  const {
    enrollment,
    loading: loadingGetEnrollment,
    error: errorGetEnrollment,
  } = useGetEnrollment(courseId);
  const [courseData, setCourseData] = useState(null);
  const [flatResources, setFlatResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentResourceIndex, setCurrentResourceIndex] = useState(0);
  const [progress, setProgress] = useState();
  const [lessons, setLessons] = useState();
  const [lessonToShow, setLessonToShow] = useState();

  useEffect(() => {
    if (!enrollment) {
      return;
    }
    async function fetchData() {
      try {
        setLoading(true);
        const { data, error: apiError } = await ApiGet(
          `student-track-progress/enrollment/${enrollment.id}`
        );

        console.log("Course Track Progress Data:", data);
        console.log("Course Track Progress Error:", apiError);
        if (apiError) throw new Error("API error fetching course progress");
        console.log(data); // it is getting student-track-progress

        const courseInfo = data.data;
        setCourseData(courseInfo);
        setProgress(courseInfo.progress);
        let globalCounter = 0;
        const lessons = [];
        const resources = [];

        courseInfo.modules.forEach((module) => {
          module.lessons.forEach((lesson) => {
            lessons.push({
              id: lesson.id,
              title: lesson.title,
              description: lesson.description,
              moduleTitle: module.title,
              trackId: lesson.progress.trackId,
              enrollmentId: lesson.progress.enrollmentId,
            });

            const videoResources = (lesson.videos || []).map((video) => ({
              lessonId: lesson.id,
              lessonTitle: lesson.title,
              description: lesson.description,
              url: video.url,
              type: "video",
              globalIndex: globalCounter++,
              moduleTitle: module.title,
              trackId: lesson.progress.trackId,
              enrollmentId: lesson.progress.enrollmentId,
              completed: lesson.progress.videoProgresses.some(
                (vp) => vp.url === video.url && vp.completed
              ),
              watchedSeconds:
                lesson.progress.videoProgresses.find(
                  (vp) => vp.url === video.url
                )?.watchedSeconds || 0,
            }));

            const fileResources = (lesson.resources || []).map((resource) => ({
              lessonId: lesson.id,
              lessonTitle: lesson.title,
              description: lesson.description,
              url: resource.url,
              name: resource.name,
              type: resource.url.endsWith(".pdf") ? "pdf" : "link",
              globalIndex: globalCounter++,
              moduleTitle: module.title,
              trackId: lesson.progress.trackId,
              enrollmentId: lesson.progress.enrollmentId,
              completed: lesson.progress.resourcesCompleted.includes(
                resource.url
              ),
            }));

            resources.push(...videoResources, ...fileResources);
          });
        });

        setLessons(lessons);
        setFlatResources(resources);
        console.log(resources);
        const initialIndex =
          resources.findIndex((r) => !r.completed) === -1
            ? 0
            : resources.findIndex((r) => !r.completed);
        console.log(initialIndex, "this ins index");
        setCurrentResourceIndex(initialIndex);
        setLessonToShow(
          lessons.find((lesson) => lesson.id === resources[0].lessonId)
        );
      } catch (err) {
        console.error(err);
        setError("Failed to load course progress.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [enrollment]);

  const handleSelectResource = useCallback((index) => {
    setCurrentResourceIndex(index);
  }, []);

  const handleSelectLesson = useCallback(
    (lessonId) => {
      console.log(lessonId, "este es el lesson en CursetrackProgress");
      setLessonToShow(lessons.find((lesson) => lesson.id === lessonId));
    },
    [lessons]
  );

  const handleCompleteResource = useCallback(
    async (resource) => {
      if (!courseData) return;

      try {
        const currentLesson = courseData.modules
          .flatMap((m) => m.lessons)
          .find((l) => l.id === resource.lessonId);

        if (!currentLesson) return;

        const updatedVideoProgresses = [
          ...currentLesson.progress.videoProgresses,
        ];
        const updatedResourcesCompleted = [
          ...currentLesson.progress.resourcesCompleted,
        ];

        if (resource.type === "video") {
          const existingVideoIndex = updatedVideoProgresses.findIndex(
            (vp) => vp.url === resource.url
          );

          if (existingVideoIndex !== -1) {
            updatedVideoProgresses[existingVideoIndex] = {
              url: resource.url,
              watchedSeconds: resource.duration || 0,
              completed: true,
            };
          } else {
            updatedVideoProgresses.push({
              url: resource.url,
              watchedSeconds: resource.duration || 0,
              completed: true,
            });
          }
        } else {
          if (!updatedResourcesCompleted.includes(resource.url)) {
            updatedResourcesCompleted.push(resource.url);
          }
        }

        const allVideosCompleted = currentLesson.videos.every((v) =>
          updatedVideoProgresses.some((vp) => vp.url === v.url && vp.completed)
        );
        const allResourcesCompleted = currentLesson.resources.every((r) =>
          updatedResourcesCompleted.includes(r.url)
        );
        const isLessonCompleted = allVideosCompleted && allResourcesCompleted;

        const payload = {
          id: currentLesson.progress.trackId,
          enrollmentId: currentLesson.progress.enrollmentId,
          lessonId: resource.lessonId,
          videoProgresses: updatedVideoProgresses,
          resourcesCompleted: updatedResourcesCompleted,
          completed: isLessonCompleted,
          completedAt: isLessonCompleted ? new Date().toISOString() : null,
        };

        console.log("Sending update:", payload);
        const { error: apiError } = await ApiPut(
          `/student-track-progress/${currentLesson.progress.trackId}`,
          payload
        );

        if (apiError) {
          console.error("API Error:", apiError);
          return;
        }

        const updatedCourseData = { ...courseData };
        const moduleIndex = updatedCourseData.modules.findIndex((m) =>
          m.lessons.some((l) => l.id === resource.lessonId)
        );
        const lessonIndex = updatedCourseData.modules[
          moduleIndex
        ].lessons.findIndex((l) => l.id === resource.lessonId);

        updatedCourseData.modules[moduleIndex].lessons[lessonIndex].progress = {
          ...currentLesson.progress,
          videoProgresses: updatedVideoProgresses,
          resourcesCompleted: updatedResourcesCompleted,
          completed: isLessonCompleted,
          completedAt: isLessonCompleted
            ? new Date().toISOString()
            : currentLesson.progress.completedAt,
        };

        const totalLessons = updatedCourseData.modules.reduce(
          (sum, m) => sum + m.lessons.length,
          0
        );
        const completedLessons = updatedCourseData.modules.reduce(
          (sum, m) =>
            sum + m.lessons.filter((l) => l.progress.completed).length,
          0
        );
        updatedCourseData.progress = completedLessons / totalLessons;

        setCourseData(updatedCourseData);

        const updatedResources = flatResources.map((r) => {
          if (r.lessonId === resource.lessonId && r.url === resource.url) {
            return { ...r, completed: true };
          }
          return r;
        });
        setFlatResources(updatedResources);
      } catch (err) {
        console.error("Error completing resource:", err);
      }
    },
    [courseData, flatResources]
  );

  const currentResource = useMemo(
    () => flatResources[currentResourceIndex],
    [flatResources, currentResourceIndex]
  );

  const modulesWithResources = useMemo(() => {
    if (!courseData) return [];

    return courseData.modules.map((module) => ({
      title: module.title,
      lessons: module.lessons.map((lesson) => ({
        id: lesson.id,
        title: lesson.title,
        completed: lesson.progress.completed,
        resources: flatResources.filter((r) => r.lessonId === lesson.id),
      })),
    }));
  }, [courseData, flatResources]);

  if (loading && !lessonToShow && loadingGetEnrollment)
    return <Loading text="Loading course content.." />;

  if (error || errorGetEnrollment)
    return <Alert title="Error with courses" description={error} />;

  if (!courseData) return <Alert title="No course content available." />;

  return (
    <div className="flex flex-row w-full">
      <CourseContentVisualizer
        courseName={courseData.courseName}
        resource={currentResource}
        onComplete={handleCompleteResource}
        lesson={lessonToShow}
      />
      <CourseContentTrackBar
        originalModules={modulesWithResources}
        resource={currentResource}
        currentIndex={currentResourceIndex}
        onSelectResource={handleSelectResource}
        onSelectLesson={handleSelectLesson}
        progress={progress}
      />
    </div>
  );
}
