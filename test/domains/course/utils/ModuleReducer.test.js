import { moduleReducer } from "../../../../src/domains/course/utils/ModuleReducer";
import { describe, expect, it } from "vitest";

describe("moduleReducer", () => {
  it("should insert an new module", () => {
    const initialState = [];
    const finalState = [
      {
        courseId: 0,
        lessons: [],
        new: true,
        position: 1,
        title: "",
      },
    ];
    const action = { postion: 0, courseId: 0, type: "ADD_MODULE" };
    const newState = moduleReducer(initialState, action);
    expect(newState).toEqual(finalState);
  });
  it("should insert an new lesson in the module", () => {
    const initialState = [
      {
        courseId: 0,
        lessons: [],
        position: 1,
        title: "",
      },
    ];
    const finalState = [
      {
        courseId: 0,
        lessons: [
          {
            description: "",
            new: true,
            position: 1,
            resources: [],
            title: "",
            videoUrls: [],
          },
        ],
        position: 1,
        title: "",
      },
    ];
    const action = { modulePosition: 0, type: "ADD_LESSON" };
    const newState = moduleReducer(initialState, action);
    expect(newState).toEqual(finalState);
  });
  it("should insert an new resource in the lesson", () => {
    const initialState = [
      {
        courseId: 0,
        lessons: [
          {
            description: "",
            position: 0,
            resources: [],
            title: "",
            videoUrls: [],
          },
        ],
        position: 1,
        title: "",
      },
    ];
    const finalState = [
      {
        courseId: 0,
        lessons: [
          {
            description: "",
            edited: true,
            position: 0,
            resources: [{ name: "testName", url: "testUrl" }],
            title: "",
            videoUrls: [],
          },
        ],
        position: 1,
        title: "",
      },
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
      {
        courseId: 0,
        lessons: [
          {
            description: "",
            position: 0,
            resources: [],
            title: "",
            videoUrls: [],
          },
        ],
        position: 1,
        title: "",
      },
    ];
    const finalState = [
      {
        courseId: 0,
        lessons: [
          {
            description: "",
            edited: true,
            position: 0,
            resources: [],
            title: "",
            videoUrls: ["testUrl"],
          },
        ],
        position: 1,
        title: "",
      },
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
      {
        courseId: 0,
        lessons: [
          {
            description: "",
            position: 0,
            resources: [
              { name: "testName", url: "testUrl" },
              { name: "testName2", url: "testUrl2" },
            ],
            title: "",
            videoUrls: [],
          },
        ],
        position: 1,
        title: "",
      },
    ];
    const finalState = [
      {
        courseId: 0,
        lessons: [
          {
            description: "",
            edited: true,
            position: 0,
            resources: [{ name: "testName2", url: "testUrl2" }],
            title: "",
            videoUrls: [],
          },
        ],
        position: 1,
        title: "",
      },
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
      {
        courseId: 0,
        lessons: [
          {
            description: "",
            position: 0,
            resources: [],
            title: "",
            videoUrls: ["video1", "video2"],
          },
        ],
        position: 1,
        title: "",
      },
    ];
    const finalState = [
      {
        courseId: 0,
        lessons: [
          {
            description: "",
            edited: true,
            position: 0,
            resources: [],
            title: "",
            videoUrls: ["video1"],
          },
        ],
        position: 1,
        title: "",
      },
    ];
    const action = {
      modulePosition: 0,
      lessonPosition: 0,
      url: "video2",
      type: "DELETE_VIDEO",
    };
    const newState = moduleReducer(initialState, action);
    expect(newState).toEqual(finalState);
  });
  it("should edit the module title", () => {
    const initialState = [
      {
        position: 1,
        title: "",
      },
    ];
    const finalState = [
      {
        position: 1,
        title: "titleExample",
        edited: true,
      },
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
      {
        courseId: 0,
        lessons: [
          {
            description: "",
            position: 0,
            resources: [],
            title: "",
            videoUrls: [],
          },
        ],
        position: 1,
        title: "",
      },
    ];
    const finalState = [
      {
        courseId: 0,
        lessons: [
          {
            description: "",
            edited: true,
            position: 0,
            resources: [],
            title: "titleExample",
            videoUrls: [],
          },
        ],
        position: 1,
        title: "",
      },
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
    const initialState = [
      {
        courseId: 0,
        lessons: [],
        position: 1,
        title: "",
      },
    ];
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
      {
        courseId: 0,
        lessons: [
          {
            description: "",
            position: 0,
            resources: [],
            title: "",
            videoUrls: [],
          },
        ],
        position: 1,
        title: "",
      },
    ];
    const finalState = [
      {
        courseId: 0,
        lessons: [],
        position: 1,
        title: "",
      },
    ];
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
      {
        courseId: 0,
        lessons: [
          {
            description: "",
            position: 0,
            resources: [],
            edited: true,
            new: true,
            title: "",
            videoUrls: [],
          },
        ],
        position: 1,
        title: "",
      },
    ];
    const finalState = [
      {
        courseId: 0,
        lessons: [
          {
            description: "",
            position: 0,
            resources: [],
            edited: false,
            new: false,
            title: "",
            videoUrls: [],
          },
        ],
        position: 1,
        title: "",
      },
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
    const initialState = [
      {
        courseId: 0,
        lessons: [],
        edited: true,
        new: true,
        position: 1,
        title: "",
      },
    ];
    const finalState = [
      {
        courseId: 0,
        lessons: [],
        edited: false,
        new: false,
        position: 1,
        title: "",
      },
    ];
    const action = {
      modulePosition: 0,
      type: "SAVE_MODULE",
    };
    const newState = moduleReducer(initialState, action);
    expect(newState).toEqual(finalState);
  });
});
