import Lesson from "../../../../src/domains/course/classes/Lesson";
import Module from "../../../../src/domains/course/classes/Module";
import { moduleReducer } from "../../../../src/domains/course/utils/ModuleReducer";
import { describe, expect, it } from "vitest";

describe("moduleReducer", () => {
  it("should insert an new module", () => {
    const baseModule = Module.builder()
      .isNew(true)
      .position(1)
      .courseId(0)
      .build();
    const initialState = [];
    const finalState = [baseModule];
    const action = { postion: 0, courseId: 0, type: "ADD_MODULE" };
    const newState = moduleReducer(initialState, action);
    expect(newState).toEqual(finalState);
  });
  it("should insert an new lesson in the module", () => {
    const baseModule = Module.builder()
      .isNew(true)
      .position(1)
      .courseId(0)
      .build();
    const baseModuleClone = baseModule.clone();
    const baseLesson = Lesson.builder()

      .position(1)
      .isNew(true)
      .build();
    baseModuleClone.lessons.push(baseLesson);
    const initialState = [baseModule];
    const finalState = [baseModuleClone];
    const action = { modulePosition: 0, type: "ADD_LESSON" };
    const newState = moduleReducer(initialState, action);
    expect(newState).toEqual(finalState);
  });
  it("should insert an new resource in the lesson", () => {
    const initialState = [
      Module.builder().lessons([Lesson.builder().build()]).build(),
    ];
    const finalState = [
      Module.builder()
        .lessons([
          Lesson.builder()
            .resources([{ name: "testName", url: "testUrl" }])
            .isEdited(true)
            .build(),
        ])
        .build(),
    ];
    const action = {
      modulePosition: 0,
      lessonPosition: 0,
      name: "testName",
      url: "testUrl",
      type: "ADD_RESOURCE",
    };
    const newState = moduleReducer(initialState, action);
    expect(newState).toEqual(finalState);
  });
  it("should insert an new video url in the lesson", () => {
    const initialState = [
      Module.builder().lessons([Lesson.builder().build()]).build(),
    ];
    const finalState = [
      Module.builder()
        .lessons([
          Lesson.builder().videoUrls(["testUrl"]).isEdited(true).build(),
        ])
        .build(),
    ];
    const action = {
      modulePosition: 0,
      lessonPosition: 0,
      url: "testUrl",
      type: "ADD_VIDEO",
    };
    const newState = moduleReducer(initialState, action);
    expect(newState).toEqual(finalState);
  });
  it("should delete a resource in the lesson", () => {
    const initialState = [
      Module.builder()
        .lessons([
          Lesson.builder()
            .resources([{ name: "testName", url: "testUrl" }])
            .build(),
        ])
        .build(),
    ];
    const finalState = [
      Module.builder()
        .lessons([
          Lesson.builder()

            .isEdited(true)
            .build(),
        ])
        .build(),
    ];
    const action = {
      modulePosition: 0,
      lessonPosition: 0,
      name: "testName",
      type: "DELETE_RESOURCE",
    };
    const newState = moduleReducer(initialState, action);
    expect(newState).toEqual(finalState);
  });
  it("should delete a video url in the lesson", () => {
    const initialState = [
      Module.builder()
        .lessons([Lesson.builder().videoUrls(["testUrl"]).build()])
        .build(),
    ];
    const finalState = [
      Module.builder()
        .lessons([Lesson.builder().isEdited(true).build()])
        .build(),
    ];
    const action = {
      modulePosition: 0,
      lessonPosition: 0,
      url: "testUrl",
      type: "DELETE_VIDEO",
    };
    const newState = moduleReducer(initialState, action);
    expect(newState).toEqual(finalState);
  });
  it("should edit the module title", () => {
    const initialState = [Module.builder().position(1).isEdited(false).build()];
    const finalState = [
      Module.builder().position(1).title("titleExample").isEdited(true).build(),
    ];
    const action = {
      modulePosition: 0,
      lessonPosition: 0,
      title: "titleExample",
      type: "EDIT_MODULE_TITLE",
    };
    const newState = moduleReducer(initialState, action);
    expect(newState).toEqual(finalState);
  });
  it("should edit the lesson title", () => {
    const initialState = [
      Module.builder().lessons([Lesson.builder().build()]).build(),
    ];
    const finalState = [
      Module.builder()
        .lessons([
          Lesson.builder().title("titleExample").isEdited(true).build(),
        ])
        .build(),
    ];
    const action = {
      modulePosition: 0,
      lessonPosition: 0,
      title: "titleExample",
      type: "EDIT_LESSON_TITLE",
    };
    const newState = moduleReducer(initialState, action);
    expect(newState).toEqual(finalState);
  });
  it("should delete the module", () => {
    const initialState = [Module.builder().position(1).build()];
    const finalState = [];
    const action = {
      modulePosition: 1,
      type: "DELETE_MODULE",
    };
    const newState = moduleReducer(initialState, action);
    expect(newState).toEqual(finalState);
  });
  it("should delete lesson", () => {
    const initialState = [
      Module.builder()
        .lessons([Lesson.builder().position(0).build()])
        .build(),
    ];
    const finalState = [Module.builder().lessons([]).build()];
    const action = {
      modulePosition: 0,
      lessonPosition: 0,
      type: "DELETE_LESSON",
    };
    const newState = moduleReducer(initialState, action);
    expect(newState).toEqual(finalState);
  });
  it("should mark the lesson as saved", () => {
    const initialState = [
      Module.builder()
        .lessons([Lesson.builder().isEdited(true).isNew(true).build()])
        .build(),
    ];
    const finalState = [
      Module.builder()
        .lessons([Lesson.builder().isEdited(false).isEdited(false).build()])
        .build(),
    ];
    const action = {
      modulePosition: 0,
      lessonPosition: 0,
      type: "SAVE_LESSON",
    };
    const newState = moduleReducer(initialState, action);
    expect(newState).toEqual(finalState);
  });
  it("should mark the module as saved", () => {
    const initialState = [Module.builder().isEdited(true).isNew(true).build()];
    const finalState = [Module.builder().isEdited(false).isNew(false).build()];
    const action = {
      modulePosition: 0,
      type: "SAVE_MODULE",
    };
    const newState = moduleReducer(initialState, action);
    expect(newState).toEqual(finalState);
  });
});
