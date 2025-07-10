import Lesson from "../classes/Lesson";
import Module from "../classes/Module";

export const moduleReducer = (state, action) => {
  switch (action.type) {
    case "ADD_MODULE": {
      const newState = [...state];
      newState.splice(
        action.postion,
        0,
        Module.builder()
          .title("")
          .lessons([])
          .position(calculateNewPosition(newState, action.postion))
          .isNew(true)
          .courseId(action.courseId)
          .build()
      );
      return newState;
    }
    case "ADD_LESSON": {
      const newState = [...state];
      const module = newState[action.modulePosition].clone();
      module.lessons.push(
        Lesson.builder()
          .title("")
          .resources([])
          .videoUrls([])
          .position(
            (module.lessons[module.lessons.length - 1]?.position ?? 0) + 1
          )
          .description("")
          .isNew(true)
          .build()
      );
      newState[action.modulePosition] = module;
      return newState;
    }
    case "ADD_RESOURCE": {
      const newState = [...state];
      const module = newState[action.modulePosition].clone();
      const lesson = module.lessons[action.lessonPosition].clone();
      lesson.addResource({
        name: action.name,
        url: action.url,
      });
      module.lessons[action.lessonPosition] = lesson;
      newState[action.modulePosition] = module;
      return newState;
    }
    case "ADD_VIDEO": {
      const newState = [...state];
      const module = newState[action.modulePosition].clone();
      const lesson = module.lessons[action.lessonPosition].clone();
      lesson.addVideoUrl(action.url);
      module.lessons[action.lessonPosition] = lesson;
      newState[action.modulePosition] = module;
      return newState;
    }
    case "DELETE_RESOURCE": {
      const newState = [...state];
      const module = newState[action.modulePosition].clone();
      const lesson = module.lessons[action.lessonPosition].clone();
      lesson.deleteResource(action.name);
      module.lessons[action.lessonPosition] = lesson;
      newState[action.modulePosition] = module;
      return newState;
    }
    case "DELETE_VIDEO": {
      const newState = [...state];
      const module = newState[action.modulePosition].clone();
      const lesson = module.lessons[action.lessonPosition].clone();
      lesson.deleteVideoUrls(action.url);
      module.lessons[action.lessonPosition] = lesson;
      newState[action.modulePosition] = module;
      return newState;
    }
    case "EDIT_MODULE_TITLE": {
      const newState = [...state];
      const module = newState[action.modulePosition].clone();
      module.setTitle(action.title);
      newState[action.modulePosition] = module;
      return newState;
    }
    case "EDIT_LESSON_TITLE": {
      const newState = [...state];
      const module = newState[action.modulePosition].clone();
      const lesson = module.lessons[action.lessonPosition].clone();
      lesson.setTitle(action.title);
      module.lessons[action.lessonPosition] = lesson;
      newState[action.modulePosition] = module;
      return newState;
    }
    case "EDIT_LESSON_DESCRIPTION": {
      const newState = [...state];
      const module = newState[action.modulePosition].clone();
      const lesson = module.lessons[action.lessonPosition].clone();
      lesson.setDescription(action.description);
      module.lessons[action.lessonPosition] = lesson;
      newState[action.modulePosition] = module;
      return newState;
    }

    case "SET":
      return action.payload.map((module) => {
        return Module.builder()
          .id(module.id)
          .title(module.title)
          .lessons(
            module.lessons.map((lesson) => {
              return Lesson.builder()
                .id(lesson.id)
                .description(lesson.description)
                .title(lesson.title)
                .resources(lesson.resources)
                .videoUrls(lesson.videoUrls)
                .position(lesson.position)
                .build();
            })
          )
          .position(module.position)
          .build();
      });
    case "DELETE_MODULE": {
      const newState = [...state];
      return newState.filter(
        (module) => module.position !== action.modulePosition
      );
    }
    case "DELETE_LESSON": {
      const newState = [...state];
      const module = newState[action.modulePosition].clone();
      module.deleteLesson(action.lessonPosition);
      newState[action.modulePosition] = module;
      return newState;
    }
    case "SAVE_LESSON": {
      const newState = [...state];
      const module = newState[action.modulePosition].clone();
      const lesson = module.lessons[action.lessonPosition].clone();
      lesson.save(action.id);
      module.lessons[action.lessonPosition] = lesson;
      newState[action.modulePosition] = module;
      return newState;
    }
    case "SAVE_MODULE": {
      const newState = [...state];
      const module = newState[action.modulePosition].clone();
      module.save(action.id);
      newState[action.modulePosition] = module;
      return newState;
    }
    default:
      return state;
  }
};

function calculateNewPosition(modules, position) {
  if (modules[position] === undefined) {
    return modules.length + 1;
  }

  const a = modules[position - 1]?.position ?? 0;
  const b = modules[position].position;
  return (a + b) / 2;
}
