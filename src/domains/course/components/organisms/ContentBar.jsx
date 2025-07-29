import ModuleGroup from "./ModulesGroup";

function mapModulesWithCompletion(originalModules, resources) {
  return originalModules.map((module) => {
    const lessons = module.props.lessons.currentItems.map((lesson) => {
      const lessonResources = resources.filter(
        (res) => res.lessonId === lesson._id.value
      );

      const isCompleted =
        lessonResources.length > 0 &&
        lessonResources.every((res) => res.completed);

      return {
        id: lesson._id.value,
        title: lesson.props.title.props.title,
        resources: lessonResources,
        completed: isCompleted,
      };
    });

    return {
      id: module._id.value,
      title: module.props.title.props.title,
      lessons,
    };
  });
}

export default function ContentBar({
  originalModules,
  resources,
  currentIndex,
  onSelectResource,
}) {
  const modulesWithCompletion = mapModulesWithCompletion(
    originalModules,
    resources
  );

  return (
    <div className="flex flex-col overflow-y-auto max-h-[calc(100vh-2rem)]">
      {modulesWithCompletion.map((module, moduleIndex) => (
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
