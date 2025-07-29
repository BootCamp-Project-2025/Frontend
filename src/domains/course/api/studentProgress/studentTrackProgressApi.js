import { baseAPI as learningAPI } from "../../../../shared/api/axios/AxiosConnection";

export async function getStudentTrackProgressByEnrollment(enrollmentId) {
  try {
    const response = await learningAPI.get(
      `/student-track-progress/enrollment/${enrollmentId}`
    );
    console.log(response.data);
    return response.data.data;
  } catch (error) {
    console.error(
      `Error fetching student track progress for enrollment ${enrollmentId}:`,
      error
    );
    throw error;
  }
}

export async function getStudentTrackProgressList() {
  try {
    const response = await learningAPI.get("/student-track-progress");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching student track progress list:", error);
    throw error;
  }
}

export async function createStudentTrackProgress(progressData) {
  try {
    const response = await learningAPI.post(
      "/student-track-progress",
      progressData
    );
    return response.data.data;
  } catch (error) {
    console.error("Error creating student track progress:", error);
    throw error;
  }
}

export async function updateStudentTrackProgress(progressData) {
  try {
    const response = await learningAPI.put(
      "/student-track-progress",
      progressData
    );
    return response.data.data;
  } catch (error) {
    console.error("Error updating student track progress:", error);
    throw error;
  }
}
