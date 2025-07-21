import { learningAPI } from "../axios/AxiosCourseConnection";

export const ApiDelete = async (path) => {
  let error = false;
  let status = 200;
  let data = null;
  try {
    const response = await learningAPI.delete(path);
    status = response.statusCode;
    status = response.status;
    data = response.data.data;
  } catch (err) {
    error = true;
    status = err.status;
    data = err.response.data ?? err;
  }
  return { data, error, status };
};
