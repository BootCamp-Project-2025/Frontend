import { learningAPI } from "../axios/AxiosCourseConnection";

export const ApiPost = async (path, body) => {
  let error = false;
  let status;
  let responseData = null;
  try {
    const response = await learningAPI.post(path, body);
    status = response.statusCode;
    responseData = response.data;
    status = response.status;
  } catch (err) {
    error = true;
    status = err.status;
    responseData = err.response.data ?? null;
  }
  return { responseData, error, status };
};
