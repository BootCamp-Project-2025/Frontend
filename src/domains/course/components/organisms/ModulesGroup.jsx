import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import LessonGroup from "./LessonGroup";
import { Icon } from "../../../../shared/components/atoms/Icon";
import { LessonPropType } from "./LessonGroup";

export default function ModuleGroup({
  module,
  moduleIndex,
  resource,
  currentIndex,
  onSelectLesson,
  onSelectResource,
}) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const isModuleOpen = module.lessons.find(
      (lesson) => lesson.id === resource.lessonId
    )
      ? true
      : false;
    setIsOpen(isModuleOpen);
  }, [currentIndex]);

  const handleToggle = (e) => {
    setIsOpen(e.target.open);
  };

  return (
    <details open={isOpen} onToggle={handleToggle}>
      <summary className="flex justify-between items-center p-2 cursor-pointer font-semibold text-sm bg-gray-100 border-b">
        <div className="flex flex-row">
          <Icon
            icon={isOpen ? "uparrow" : "downarrow"}
            className="w-6 h-6 text-gray-700 mr-2"
          />
          <span>{`Module ${moduleIndex + 1}: ${module.title}`}</span>
        </div>
        <span className="font-light text-sm">
          {module.lessons.length} Lessons
        </span>
      </summary>

      <ul className="px-4">
        {module.lessons.map((lesson) => (
          <LessonGroup
            key={lesson.id}
            lesson={lesson}
            resource={resource}
            currentIndex={currentIndex}
            onSelectLesson={onSelectLesson}
            onSelectResource={onSelectResource}
          />
        ))}
      </ul>
    </details>
  );
}

ModuleGroup.propTypes = {
  module: PropTypes.shape({
    title: PropTypes.string.isRequired,
    lessons: PropTypes.arrayOf(LessonPropType).isRequired,
  }).isRequired,
  moduleIndex: PropTypes.number.isRequired,
  currentIndex: PropTypes.number.isRequired,
  onSelectLesson: PropTypes.func.isRequired,
  onSelectResource: PropTypes.func.isRequired,
};
