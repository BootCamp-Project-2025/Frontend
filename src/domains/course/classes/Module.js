export default class Module {
  title;
  lessons;
  position;
  isEdited = false;
  courseId;
  id;
  isNew;

  constructor(title, lessons, position, isEdited, courseId, id, isNew) {
    this.title = title;
    this.lessons = lessons;
    this.position = position;
    this.isEdited = isEdited;
    this.courseId = courseId;
    this.id = id;
    this.isNew = isNew;
  }
  static builder() {
    return new ModuleBuilder();
  }

  clone() {
    return new Module(
      this.title,
      [...this.lessons],
      this.position,
      this.isEdited,
      this.courseId,
      this.id,
      this.isNew
    );
  }

  setTitle(title) {
    if (this.title !== title) {
      this.title = title;
      this.isEdited = true;
    }
  }
  setLessons(lessons) {
    this.lessons = lessons;
  }
  setPosition(position) {
    this.position = position;
  }
  setIsEdited(isEdited) {
    this.isEdited = isEdited;
  }
  setCourseId(courseId) {
    this.courseId = courseId;
  }
  setId(id) {
    this.id = id;
  }
  setIsNew(isNew) {
    this.isNew = isNew;
  }

  save() {
    this.isNew = false;
    this.isEdited = false;
  }
}

export class ModuleBuilder {
  module;
  constructor() {
    this.module = new Module();
  }
  title(title) {
    this.module.title = title;
    return this;
  }
  lessons(lessons) {
    this.module.lessons = lessons;
    return this;
  }
  position(position) {
    this.module.position = position;
    return this;
  }
  isEdited(isEdited) {
    this.module.isEdited = isEdited;
    return this;
  }
  courseId(courseId) {
    this.module.courseId = courseId;
    return this;
  }
  id(id) {
    this.module.id = id;
    return this;
  }
  isNew(isNew) {
    this.module.isNew = isNew;
    return this;
  }

  build() {
    return this.module;
  }
}
