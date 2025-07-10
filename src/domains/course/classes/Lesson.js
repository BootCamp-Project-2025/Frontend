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

  settitle(title) {
    this.title = title;
  }
  setresources(resources) {
    this.resources = resources;
  }
  setvideoUrls(videoUrls) {
    this.videoUrls = videoUrls;
  }
  setposition(position) {
    this.position = position;
  }
  setdescription(description) {
    this.description = description;
  }
  setisNew(isNew) {
    this.isNew = isNew;
  }
  setisEdited(isEdited) {
    this.isEdited = isEdited;
  }

  save() {
    this.isNew = false;
    this.isEdited = false;
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
