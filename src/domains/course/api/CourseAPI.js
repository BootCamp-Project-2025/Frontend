import { learningAPI } from "../axios/AxiosCourseConnection";

export async function getCourseList() {
  try {
    const response = await learningAPI.get("/courses");
    return response.data.data;
    /* const data = [
      {
        id: "uuid-1",
        name: "Intro to AI",
        field: "Computer Science",
        description: "Learn the fundamentals of AI",
        time: 10,
        modulesCount: 4,
        imgSrc: "",
      },
      {
        id: "uuid-2",
        name: "Web Development",
        field: "Software Engineering",
        description: "Build modern web apps",
        time: 8,
        modulesCount: 5,
        imgSrc: "",
      },
    ]; */
  } catch (error) {
    console.error("Error fetching course list:", error);
    throw error;
  }
}

export async function createCourse(courseData) {
  try {
    const response = await learningAPI.post("/courses", courseData);
    return response.data.data;
  } catch (error) {
    console.error("Error creating course:", error);
    throw error;
  }
}

export async function updateCourse(courseId, courseData) {
  try {
    const response = await learningAPI.put(`/courses/${courseId}`, courseData);
    return response.data.data;
  } catch (error) {
    console.error(`Error updating course with ID ${courseId}:`, error);
    throw error;
  }
}

export async function deleteCourse(courseId) {
  try {
    await learningAPI.delete(`/courses/${courseId}`);
  } catch (error) {
    console.error(`Error deleting course with ID ${courseId}:`, error);
    throw error;
  }
}
