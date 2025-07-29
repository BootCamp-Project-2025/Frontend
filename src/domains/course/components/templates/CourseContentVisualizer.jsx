import LessonPlayerRY from "../molecules/LessonPlayer";
import PdfVisualiser from "../molecules/PdfVisualiser";
import CourseTitleNavigation from "../organisms/CourseTitleNavigation";
import LessonExtraInfo from "../organisms/LessonExtraInfo";

export default function CourseContentVisualizer({ resource, onComplete }) {
  if (!resource) {
    return <p className="p-4 text-gray-500">No resource selected</p>;
  }

  const { type, title, videoUrls = [], resources = [], description } = resource;

  const mainUrl =
    type === "video"
      ? videoUrls[0]
      : type === "pdf"
        ? resources.find((r) => r.url.endsWith(".pdf"))?.url
        : null;

  return (
    <div className="flex flex-col gap-4 p-4 w-full">
      <CourseTitleNavigation title={title} />

      {type === "video" && mainUrl && (
        <LessonPlayerRY
          videoUrl={mainUrl}
          resource={resource}
          onComplete={onComplete}
        />
      )}

      {type === "pdf" && mainUrl && (
        <PdfVisualiser
          url={mainUrl}
          resource={resource}
          onComplete={onComplete}
        />
      )}

      <LessonExtraInfo description={description} resources={resources} />
    </div>
  );
}
