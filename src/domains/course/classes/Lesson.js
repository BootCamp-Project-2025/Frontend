export default class Lesson {
  id;
  title;
  resources;
  videoUrls;
  position;
  description;
  isNew;
  isEdited;

  constructor(
    id,
    title,
    resources,
    videoUrls,
    position,
    description,
    isNew,
    isEdited
  ) {
    this.id = id;
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
      this.id,
      this.title,
      [...this.resources],
      [...this.videoUrls],
      this.position,
      this.description,
      this.isNew,
      this.isEdited
    );
  }

  setTitle(title) {
    if (this.title !== title) {
      this.isEdited = true;
      this.title = title;
    }
  }
  setResources(resources) {
    this.resources = resources;
  }
  setVideoUrls(videoUrls) {
    this.videoUrls = videoUrls;
  }
  setPosition(position) {
    this.position = position;
  }
  setDescription(description) {
    if (this.description !== description) {
      this.isEdited = true;
      this.description = description;
    }
  }
  setIsNew(isNew) {
    this.isNew = isNew;
  }
  setIsEdited(isEdited) {
    this.isEdited = isEdited;
  }

  setId(id) {
    this.id = id;
  }

  save(id) {
    this.id = id;
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

  deleteVideoUrls(urlToDelete) {
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

  id(id) {
    this.lesson.id = id;
    return this;
  }

  build() {
    return this.lesson;
  }
}
