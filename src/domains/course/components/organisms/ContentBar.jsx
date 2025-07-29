import ModuleGroup from "./ModulesGroup";

export default function ContentBar({
  originalModules,
  currentIndex,
  onSelectResource,
}) {
  return (
    <div className="flex flex-col overflow-y-auto max-h-[calc(100vh-2rem)]">
      {originalModules.map((module, moduleIndex) => (
        <ModuleGroup
          key={module.id}
          module={module}
          moduleIndex={moduleIndex}
          currentIndex={currentIndex}
          onSelectResource={onSelectResource}
        />
      ))}
    </div>
  );
}
