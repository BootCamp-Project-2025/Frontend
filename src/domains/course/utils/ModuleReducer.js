export const moduleReducer = (state, action) => {
  switch (action.type) {
    case "ADD_MODULE": {
      const newState = [...state];
      newState.splice(action.postion, 0, {
        title: "new module",
        lessons: [],
        id: Math.floor(Math.random() * 1000000),
        new: true,
      });
      return newState;
    }
    case "ADD_LESSON": {
      const newState = [...state];
      newState[action.modulePosition].lessons[action.lessonPosition] = {
        title: "new lesson",
        resources: [],
        videos: [],
        id: Math.floor(Math.random() * 1000000),
        new: true,
      };
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
    case "SAVE_MODULE": {
      const newState = [...state];
      action.module.edited = false;
      console.log("Saving module:", action.module);
      return newState;
    }
    case "SAVE_LESSON": {
      const newState = [...state];
      state[action.modulePosition].lessons[action.lessonPosition].edited =
        false;
      console.log("Saving lesson:", action.lesson);
      return newState;
    }
    case "DELETE_MODULE":
      return state.filter((module) => module.id !== action.id);
    case "DELETE_LESSON": {
      const newState = [...state];
      newState[action.modulePosition].lessons = state[
        action.modulePosition
      ].lessons.filter((lesson) => lesson.id !== action.id);
      return [...state];
    }
    default:
      return state;
  }
};
