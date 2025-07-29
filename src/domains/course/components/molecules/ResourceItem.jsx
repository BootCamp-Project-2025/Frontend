import { Icon } from "../../../../shared/components/atoms/Icon";

export default function ResourceItem({ resource, isActive, onSelectResource }) {
  return (
    <li
      onClick={() => {
        onSelectResource(resource.globalIndex);
      }}
      className={`flex items-start justify-start gap-4 px-4 py-2 cursor-pointer text-sm hover:bg-gray-100 ${
        isActive ? "bg-blue-100" : ""
      }`}
    >
      {resource.type === "video" && (
        <Icon icon={"youtube"} className={"w-6 h-6"} />
      )}
      {resource.type === "pdf" && <span>📄</span>}
      <span className="truncate">{resource.title}</span>
      {resource.completed && (
        <Icon icon={"checkSyllabus"} className="text-green-500 w-6 h-6" />
      )}
    </li>
  );
}
