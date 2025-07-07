export const moduleReducer = (state, action) => {
  switch (action.type) {
    case "ADD_MODULE": {
      const newState = [...state];
      newState.splice(action.postion, 0, {
        title: "new module",
        lessons: [],
        position: action.postion,
        new: true,
      });
      return newState;
    }
    case "ADD_LESSON": {
      const newState = [...state];
      newState[action.modulePosition].lessons[action.lessonPosition] = {
        title: "new lesson",
        resources: [],
        videoUrls: [],
        position: action.lessonPosition,
        description: "",
        new: true,
      };
      return newState;
    }
    case "ADD_RESOURCE": {
      const newState = [...state];
      newState[action.modulePosition].lessons[action.lessonPosition].resources[
        action.resourcePosition
      ] = {
        name: action.name,
        link: action.link,
      };
      return newState;
    }
    case "DELETE_RESOURCE": {
      const newState = [...state];
      const module = { ...newState[action.modulePosition] };
      const lessons = [...module.lessons];
      const lesson = { ...lessons[action.lessonPosition] };
      const resources = [...lesson.resources];
      resources.splice(action.resourcePosition, 1);
      lesson.resources = resources;
      lessons[action.lessonPosition] = lesson;
      module.lessons = lessons;
      newState[action.modulePosition] = module;
      return newState;
    }
    case "EDIT_MODULE_TITLE": {
      const newState = [...state];
      newState[action.modulePosition].title = action.title;
      newState[action.modulePosition].edited = true;
      return newState;
    }
    case "EDIT_LESSON_TITLE": {
      const newState = [...state];
      newState[action.modulePosition].lessons[action.lessonPosition].title =
        action.title;
      newState[action.modulePosition].lessons[action.lessonPosition].edited =
        true;
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
      lessons[action.lessonPosition] = lesson;
      module.lessons = lessons;
      newState[action.modulePosition] = module;
      return newState;
    }
    default:
      return state;
  }
};
