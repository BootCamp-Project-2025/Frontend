//import { learningAPI } from "../axios/AxiosCourseConnection";

export async function getCourseList() {
  try {
    //const response = await learningAPI.get("/courses");
    //return response.data;
    const data = [
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
    ];
    return data;
  } catch (error) {
    console.error("Error fetching course list:", error);
    throw error;
  }
}
