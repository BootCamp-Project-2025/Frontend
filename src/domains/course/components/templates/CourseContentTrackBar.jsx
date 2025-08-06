import ProgressBar from "../molecules/ProgressBar";
import ContentBar from "../organisms/ContentBar";
import PropTypes from "prop-types";

export default function CourseContentTrackBar({
  progress,
  originalModules,
  resource,
  currentIndex,
  onSelectLesson,
  onSelectResource,
}) {
  return (
    <div className="flex flex-col w-100 border-l border-gray-200 bg-white">
      <ProgressBar progress={progress} />
      <ContentBar
        originalModules={originalModules}
        resource={resource}
        currentIndex={currentIndex}
        onSelectLesson={onSelectLesson}
        onSelectResource={onSelectResource}
      />
    </div>
  );
}

CourseContentTrackBar.propTypes = {
  originalModules: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      lessons: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          title: PropTypes.string.isRequired,
          completed: PropTypes.bool.isRequired,
          resources: PropTypes.arrayOf(
            PropTypes.shape({
              lessonId: PropTypes.string.isRequired,
              url: PropTypes.string.isRequired,
              type: PropTypes.string.isRequired,
              completed: PropTypes.bool.isRequired,
              name: PropTypes.string,
              description: PropTypes.string,
            })
          ).isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
  resources: PropTypes.arrayOf(
    PropTypes.shape({
      lessonId: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    })
  ).isRequired,
  currentIndex: PropTypes.number.isRequired,
  onSelectLesson: PropTypes.func.isRequired,
  onSelectResource: PropTypes.func.isRequired,
  progress: PropTypes.number,
};
