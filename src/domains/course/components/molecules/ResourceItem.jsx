import { Icon } from "../../../../shared/components/atoms/Icon";

export default function ResourceItem({
  resource,
  globalIndex,
  isActive,
  onSelectResource,
}) {
  return (
    <li
      onClick={() => {
        console.log("Click en resource", resource.title, resource.globalIndex);
        onSelectResource(resource.globalIndex);
      }}
      className={`flex items-start justify-start gap-4 px-4 py-2 cursor-pointer hover:bg-gray-100 ${
        isActive ? "font-normal text-sm" : ""
      }`}
    >
      {resource.type === "video" && (
        <Icon icon={"youtube"} className={"w-6 h-6"} />
      )}
      {resource.type === "pdf" && <span>📄</span>}
      <span className="truncate">{resource.title}</span>
    </li>
  );
}
