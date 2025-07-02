export const moduleReducer = (state, action) => {
  switch (action.type) {
    case "ADD_MODULE":
      state[action.postion] = {
        title: "new module",
        lessons: [],
        id: Math.floor(Math.random() * 1000000),
        added: true,
      };
      return [...state];
    case "ADD_LESSON":
      state[action.modulePosition].lessons[action.lessonPosition] = {
        title: "new lesson",
        resources: [],
        videos: [],
        id: Math.floor(Math.random() * 1000000),
        added: true,
      };
      return [...state];
    case "EDIT_MODULE_TITLE":
      state[action.modulePosition].title = action.title;
      state[action.modulePosition].edited = true;
      return [...state];
    case "EDIT_LESSON_TITLE":
      state[action.modulePosition].lessons[action.lessonPosition].title =
        action.title;
      state[action.modulePosition].lessons[action.lessonPosition].edited = true;
      return [...state];
    case "SET":
      return action.payload;
    case "SAVE_MODULE":
      action.module.edited = false;
      console.log("Saving module:", action.module);
      return [...state];
    case "SAVE_LESSON":
      state[action.modulePosition].lessons[action.lessonPosition].edited =
        false;
      console.log("Saving lesson:", action.lesson);
      return [...state];
    case "DELETE_MODULE":
      return state.filter((module) => module.id !== action.id);
    case "DELETE_LESSON":
      state[action.modulePosition].lessons = state[
        action.modulePosition
      ].lessons.filter((lesson) => lesson.id !== action.id);
      return [...state];
    default:
      return state;
  }
};
