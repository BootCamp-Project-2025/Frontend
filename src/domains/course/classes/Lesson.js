export default class Lesson {
  title;
  resources;
  videoUrls;
  position;
  description;
  isNew;
  isEdited;

  constructor(
    title,
    resources,
    videoUrls,
    position,
    description,
    isNew,
    isEdited
  ) {
    this.title = title;
    this.resources = resources;
    this.videoUrls = videoUrls;
    this.position = position;
    this.description = description;
    this.isNew = isNew;
    this.isEdited = isEdited;
  }
  static builder() {
    return new LessonBuilder();
  }

  clone() {
    return new Lesson(
      this.title,
      [...this.resources],
      [...this.videoUrls],
      this.position,
      this.description,
      this.isNew,
      this.isEdited
    );
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

  addResource(resource) {
    this.isEdited = false;
    this.resources.push(resource);
  }

  addVideoUrl(videoUrl) {
    this.isEdited = true;
    this.videoUrls.push(videoUrl);
  }

  deleteResource(name) {
    this.isEdited = true;
    this.resources = this.resources.filter(
      (resource) => resource.name !== name
    );
  }

  deleteVideo(urlToDelete) {
    this.isEdited = true;
    this.videoUrls = this.videoUrls.filter((url) => url !== urlToDelete);
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

  build() {
    return this.lesson;
  }
}
