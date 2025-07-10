export default class Lesson {
  title;
  resources;
  videoUrls;
  position;
  description;
  isNew;
  isEdited;
  constructor() {}
  static builder() {
    return new LessonBuilder();
  }
}

class LessonBuilder {
  lesson;
  constructor() {
    this.lesson = new Lesson();
  }
  title(title) {
    this.lesson.title = title;
    return this;
  }
  resources(resources) {
    this.lesson.resources = resources;
    return this;
  }
  videoUrls(videoUrls) {
    this.lesson.videoUrls = videoUrls;
    return this;
  }
  position(position) {
    this.lesson.position = position;
    return this;
  }
  description(description) {
    this.lesson.description = description;
    return this;
  }
  isNew(isNew) {
    this.lesson.isNew = isNew;
    return this;
  }
  isEdited(isEdited) {
    this.lesson.isEdited = isEdited;
    return this;
  }
}
