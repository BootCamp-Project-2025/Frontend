import ProgressBar from "../molecules/ProgressBar";
import ContentBar from "../organisms/ContentBar";

export default function CourseContentTrackBar({
  progress,
  originalModules,
  resources,
  currentIndex,
  onSelectResource,
}) {
  return (
    <div className="flex flex-col w-130 border-l border-gray-200 bg-white">
      <ProgressBar progress={progress} />
      <ContentBar
        originalModules={originalModules}
        resources={resources}
        currentIndex={currentIndex}
        onSelectResource={onSelectResource}
      />
    </div>
  );
}
