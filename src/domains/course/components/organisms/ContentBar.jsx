import { LessonPropType } from "./LessonGroup";
import ModuleGroup from "./ModulesGroup";
import PropTypes from "prop-types";

export default function ContentBar({
  originalModules,
  currentIndex,
  onSelectResource,
}) {
  return (
    <div className="flex flex-col overflow-y-auto max-h-[calc(100vh-2rem)]">
      {originalModules.map((module, moduleIndex) => (
        <ModuleGroup
          key={moduleIndex}
          module={module}
          moduleIndex={moduleIndex}
          currentIndex={currentIndex}
          onSelectResource={onSelectResource}
        />
      ))}
    </div>
  );
}

ContentBar.propTypes = {
  originalModules: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      lessons: PropTypes.arrayOf(LessonPropType).isRequired,
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
  onSelectResource: PropTypes.func.isRequired,
};
