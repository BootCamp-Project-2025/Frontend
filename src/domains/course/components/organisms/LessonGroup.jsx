import { useState } from "react";
import ResourceItem from "../molecules/ResourceItem";
import { Icon } from "../../../../shared/components/atoms/Icon";

export default function LessonGroup({
  lesson,
  currentIndex,
  onSelectResource,
}) {
  const [isOpen, setIsOpen] = useState(false);

  /* console.log(lesson, "this is the lesson"); */
  return (
    <li>
      <div
        className="flex justify-items-start p-2 cursor-pointer hover:bg-blue-100  bg-gray-100 border-b text-sm"
        onClick={() => setIsOpen(!isOpen)}
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
