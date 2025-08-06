import LessonPlayerRY from "../molecules/LessonPlayer";
import PdfVisualiser from "../molecules/PdfVisualiser";
import CourseTitleNavigation from "../organisms/CourseTitleNavigation";
import LessonExtraInfo from "../organisms/LessonExtraInfo";
import PropTypes from "prop-types";

export default function CourseContentVisualizer({
  courseName,
  resource,
  lesson,
  onComplete,
}) {
  const { type, url, description } = resource;

  return (
    <div className="flex flex-col gap-4 flex-1">
      <div>
        <CourseTitleNavigation
          title={courseName}
          moduleTitle={lesson.moduleTitle}
          lessonTitle={lesson.title}
        />

        {type === "video" && url && lesson.id === resource.lessonId && (
          <LessonPlayerRY
            videoUrl={url}
            resource={resource}
            onComplete={onComplete}
          />
        )}

        {type === "pdf" && url && lesson.id === resource.lessonId && (
          <PdfVisualiser
            url={url}
            resource={resource}
            onComplete={onComplete}
          />
        )}
      </div>

      <LessonExtraInfo description={lesson.description} resources={[]} />
    </div>
  );
}

CourseContentVisualizer.propTypes = {
  courseName: PropTypes.string.isRequired,
  resource: PropTypes.shape({
    lessonId: PropTypes.string.isRequired,
    lessonTitle: PropTypes.string.isRequired,
    description: PropTypes.string,
    url: PropTypes.string.isRequired,
    type: PropTypes.oneOf(["video", "pdf", "link"]).isRequired,
    globalIndex: PropTypes.number.isRequired,
    moduleTitle: PropTypes.string,
    trackId: PropTypes.string.isRequired,
    enrollmentId: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    watchedSeconds: PropTypes.number,
    name: PropTypes.string,
    duration: PropTypes.number,
  }),
  onComplete: PropTypes.func.isRequired,
};
