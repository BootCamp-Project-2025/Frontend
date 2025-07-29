import { useState } from "react";
import LessonGroup from "./LessonGroup";
import { Icon } from "../../../../shared/components/atoms/Icon";

export default function ModuleGroup({
  module,
  moduleIndex,
  currentIndex,
  onSelectResource,
}) {
  const [isOpen, setIsOpen] = useState(true);

  const handleToggle = (e) => {
    setIsOpen(e.target.open);
  };

  return (
    <details open={isOpen} onToggle={handleToggle}>
      <summary className="flex justify-between items-center p-2 cursor-pointer font-semibold text-sm bg-gray-100 border-b">
        <Icon
          icon={isOpen ? "uparrow" : "downarrow"}
          className="w-6 h-6 text-gray-700 mr-2"
        />
        <span>{`Module ${moduleIndex + 1}: ${module.title}`}</span>
        <span>{module.lessons.length} Lessons</span>
      </summary>

      <ul className="px-4">
        {module.lessons.map((lesson) => (
          <LessonGroup
            key={lesson.id}
            lesson={lesson}
            currentIndex={currentIndex}
            onSelectResource={onSelectResource}
          />
        ))}
      </ul>
    </details>
  );
}
