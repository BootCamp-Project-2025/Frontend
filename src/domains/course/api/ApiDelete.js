import { learningAPI } from "../axios/AxiosCourseConnection";

export const ApiDelete = async (path) => {
  let error = false;
  let status;
  try {
    const response = await learningAPI.delete(path);
    status = response.statusCode;
    status = response.status;
  } catch (err) {
    error = true;
    status = err.status;
  }
  return { error, status };
};
