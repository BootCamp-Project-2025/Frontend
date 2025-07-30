import LessonPlayerRY from "../molecules/LessonPlayer";
import PdfVisualiser from "../molecules/PdfVisualiser";
import CourseTitleNavigation from "../organisms/CourseTitleNavigation";
import LessonExtraInfo from "../organisms/LessonExtraInfo";

export default function CourseContentVisualizer({
  courseName,
  resource,
  onComplete,
}) {
  if (!resource) {
    return <p className="p-4 text-gray-500">No resource</p>;
  }

  const { type, url, description } = resource;

  return (
    <div className="flex flex-col gap-4 w-full">
      <div>
        <CourseTitleNavigation
          title={courseName}
          moduleTitle={resource.moduleTitle}
          lessonTitle={resource.lessonTitle}
        />

        {type === "video" && url && (
          <LessonPlayerRY
            videoUrl={url}
            resource={resource}
            onComplete={onComplete}
          />
        )}

        {type === "pdf" && url && (
          <PdfVisualiser
            url={url}
            resource={resource}
            onComplete={onComplete}
          />
        )}
      </div>

      <LessonExtraInfo description={description} resources={[]} />
    </div>
  );
}
