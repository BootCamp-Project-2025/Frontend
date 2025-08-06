import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ResourceItem from "../molecules/ResourceItem";
import { Icon } from "../../../../shared/components/atoms/Icon";
import { ResourcePropType } from "../molecules/ResourceItem";

export default function LessonGroup({
  lesson,
  currentIndex,
  resource,
  onSelectLesson,
  onSelectResource,
}) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const isModuleOpen = lesson.id === resource.lessonId;
    setIsOpen(isModuleOpen);
  }, [currentIndex]);

  return (
    <li>
      <div
        className="flex justify-items-start p-2 cursor-pointer hover:bg-blue-100  bg-gray-100 border-b text-sm"
        onClick={() => {
          setIsOpen(!isOpen);
          onSelectLesson(lesson.id);
        }}
      >
        <Icon
          icon={isOpen ? "uparrow" : "downarrow"}
          className="w-6 h-6 text-gray-700"
        />
        <span>{lesson.title}</span>
        <div className="flex items-center gap-2">
          {lesson.completed && (
            <Icon
              icon={"checkSyllabus"}
              className="text-green-500 w-5 h-5 border-green-500"
            />
          )}
        </div>
      </div>

      {isOpen && (
        <ul className="pl-5 w-full max-w-80">
          {lesson.resources.map((res, index) => (
            <ResourceItem
              key={index}
              resource={res}
              isActive={currentIndex === res.globalIndex}
              onSelectResource={onSelectResource}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export const LessonPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  resources: PropTypes.arrayOf(ResourcePropType).isRequired,
});
LessonGroup.propTypes = {
  lesson: LessonPropType.isRequired,
  currentIndex: PropTypes.number.isRequired,
  onSelectResource: PropTypes.func.isRequired,
};
