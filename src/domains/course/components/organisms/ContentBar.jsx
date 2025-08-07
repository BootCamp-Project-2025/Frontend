import { LessonPropType } from "./LessonGroup";
import ModuleGroup from "./ModulesGroup";
import PropTypes from "prop-types";
import { ResourcePropType } from "../molecules/ResourceItem";

export default function ContentBar({
  originalModules,
  resource,
  currentIndex,
  onSelectLesson,
  onSelectResource,
}) {
  return (
    <div className="flex flex-col overflow-y-auto max-h-[calc(100vh-2rem)]">
      {originalModules.map((module, moduleIndex) => (
        <ModuleGroup
          key={moduleIndex}
          module={module}
          resource={resource}
          moduleIndex={moduleIndex}
          currentIndex={currentIndex}
          onSelectLesson={onSelectLesson}
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
  resource: ResourcePropType,
  currentIndex: PropTypes.number.isRequired,
  onSelectLesson: PropTypes.func.isRequired,
  onSelectResource: PropTypes.func.isRequired,
};
