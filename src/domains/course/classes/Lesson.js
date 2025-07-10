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
  }
  resources(resources) {
    this.lesson.resources = resources;
  }
  videoUrls(videoUrls) {
    this.lesson.videoUrls = videoUrls;
  }
  position(position) {
    this.lesson.position = position;
  }
  description(description) {
    this.lesson.description = description;
  }
  isNew(isNew) {
    this.lesson.isNew = isNew;
  }
  isEdited(isEdited) {
    this.lesson.isEdited = isEdited;
  }
}
