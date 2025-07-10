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
      const module = { ...newState[action.modulePosition] };
      const lessons = [...module.lessons];
      lessons.push(
        Lesson.builder()
          .title("")
          .resources([])
          .videoUrls([])
          .position((lessons[lessons.length - 1]?.position ?? 0) + 1)
          .description("")
          .isNew(true)
      );
      module.lessons = lessons;
      newState[action.modulePosition] = module;
      return newState;
    }
    case "ADD_RESOURCE": {
      const newState = [...state];
      const module = { ...newState[action.modulePosition] };
      const lessons = [...module.lessons];
      const lesson = { ...lessons[action.lessonPosition] };
      const resources = [...lesson.resources];
      lesson.edited = true;
      resources.push({
        name: action.name,
        url: action.url,
      });
      lesson.resources = resources;
      lessons[action.lessonPosition] = lesson;
      module.lessons = lessons;
      newState[action.modulePosition] = module;
      return newState;
    }
    case "ADD_VIDEO": {
      const newState = [...state];
      const module = { ...newState[action.modulePosition] };
      const lessons = [...module.lessons];
      const lesson = { ...lessons[action.lessonPosition] };
      const videoUrls = [...lesson.videoUrls];
      lesson.edited = true;
      videoUrls.push(action.url);
      lesson.videoUrls = videoUrls;
      lessons[action.lessonPosition] = lesson;
      module.lessons = lessons;
      newState[action.modulePosition] = module;
      return newState;
    }
    case "DELETE_RESOURCE": {
      const newState = [...state];
      const module = { ...newState[action.modulePosition] };
      const lessons = [...module.lessons];
      const lesson = { ...lessons[action.lessonPosition] };
      const resources = [...lesson.resources];
      lesson.edited = true;
      lesson.resources = resources.filter(
        (resource) => resource.name !== action.name
      );
      lessons[action.lessonPosition] = lesson;
      module.lessons = lessons;
      newState[action.modulePosition] = module;
      return newState;
    }
    case "DELETE_VIDEO": {
      const newState = [...state];
      const module = { ...newState[action.modulePosition] };
      const lessons = [...module.lessons];
      const lesson = { ...lessons[action.lessonPosition] };
      const videoUrls = [...lesson.videoUrls];
      lesson.edited = true;
      lesson.videoUrls = videoUrls.filter((url) => url !== action.url);
      lessons[action.lessonPosition] = lesson;
      module.lessons = lessons;
      newState[action.modulePosition] = module;
      return newState;
    }
    case "EDIT_MODULE_TITLE": {
      const newState = [...state];
      if (newState[action.modulePosition].title !== action.title)
        newState[action.modulePosition].edited = true;
      newState[action.modulePosition].title = action.title;
      return newState;
    }
    case "EDIT_LESSON_TITLE": {
      const newState = [...state];
      const module = { ...newState[action.modulePosition] };
      const lessons = [...module.lessons];
      const lesson = { ...lessons[action.lessonPosition] };
      if (lesson.title !== action.title) lesson.edited = true;
      lesson.title = action.title;
      lessons[action.lessonPosition] = lesson;
      module.lessons = lessons;
      newState[action.modulePosition] = module;
      return newState;
    }
    case "EDIT_LESSON_DESCRIPTION": {
      const newState = [...state];
      const module = { ...newState[action.modulePosition] };
      const lessons = [...module.lessons];
      const lesson = { ...lessons[action.lessonPosition] };
      lesson.description = action.description;
      lessons[action.lessonPosition] = lesson;
      module.lessons = lessons;
      newState[action.modulePosition] = module;
      return newState;
    }
    case "SET":
      return action.payload;
    case "DELETE_MODULE": {
      const newState = [...state];
      return newState.filter(
        (module) => module.position !== action.modulePosition
      );
    }
    case "DELETE_LESSON": {
      console.log(action.lessonPosition);
      const newState = [...state];
      const module = { ...newState[action.modulePosition] };
      const lessons = [...module.lessons];
      module.lessons = lessons.filter(
        (lesson) => lesson.position !== action.lessonPosition
      );
      newState[action.modulePosition] = module;
      return newState;
    }
    case "SAVE_LESSON": {
      const newState = [...state];
      const module = { ...newState[action.modulePosition] };
      const lessons = [...module.lessons];
      const lesson = { ...lessons[action.lessonPosition] };
      lesson.edited = false;
      lesson.new = false;
      lesson.id = action.id;
      lessons[action.lessonPosition] = lesson;
      module.lessons = lessons;
      newState[action.modulePosition] = module;
      return newState;
    }
    case "SAVE_MODULE": {
      const newState = [...state];
      const module = { ...newState[action.modulePosition] };
      module.edited = false;
      module.new = false;
      module.id = action.id;
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
