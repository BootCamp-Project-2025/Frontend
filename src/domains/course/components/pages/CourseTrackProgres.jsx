import { useEffect, useState, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import CourseContentTrackBar from "../templates/CourseContentTrackBar";
import CourseContentVisualizer from "../templates/CourseContentVisualizer";
import { ApiGet } from "../../api/ApiGet";
import { ApiPut } from "../../api/ApiPut";

export default function CourseTrackProgress({
  enrollmentId = "53a42078-2b49-4d10-80bc-55f9c752103b",
}) {
  const [courseData, setCourseData] = useState(null);
  const [flatResources, setFlatResources] = useState([]);
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

        if (apiError) throw new Error("API error fetching course progress");

        const courseInfo = data.data;
        console.log(courseInfo, "esta es la info");
        setCourseData(courseInfo);

        // Crear lista plana de recursos con toda la información necesaria
        let globalCounter = 0;
        const resources = courseInfo.modules.flatMap((module) =>
          module.lessons.flatMap((lesson) => {
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

            return [...videoResources, ...fileResources];
          })
        );

        setFlatResources(resources);

        // Encontrar el índice inicial (primer recurso no completado)
        const initialIndex = resources.findIndex((r) => !r.completed) || 0;
        setCurrentResourceIndex(initialIndex);
      } catch (err) {
        console.error(err);
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
      if (!courseData) return;

      try {
        // Encontrar la lección actual
        const currentLesson = courseData.modules
          .flatMap((m) => m.lessons)
          .find((l) => l.id === resource.lessonId);

        if (!currentLesson) return;

        // Preparar el payload según el tipo de recurso
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

        // Verificar si todos los recursos están completos
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

        // Actualizar el estado local
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

        // Recalcular el progreso general
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

        // Actualizar la lista plana
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

  // Preparar los módulos para el TrackBar
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

  if (loading)
    return <p className="text-center mt-4">Loading course content...</p>;
  if (error) return <p className="text-center text-red-500 mt-4">{error}</p>;
  if (!courseData || !flatResources.length)
    return <p className="text-center mt-4">No course content available.</p>;

  return (
    <div className="flex flex-row w-full">
      <CourseContentVisualizer
        courseName={courseData.courseName}
        resource={currentResource}
        onComplete={handleCompleteResource}
      />
      <CourseContentTrackBar
        progress={courseData.progress * 100} // Convertir a porcentaje
        originalModules={modulesWithResources}
        resources={flatResources}
        currentIndex={currentResourceIndex}
        onSelectResource={handleSelectResource}
      />
    </div>
  );
}
