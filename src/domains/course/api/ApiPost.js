import { learningAPI } from "../axios/AxiosCourseConnection";

export const ApiPost = async (path, body) => {
  console.log(body);
  let error = false;
  let status;
  let data = null;
  try {
    const response = await learningAPI.post(path, body);
    status = response.statusCode;
    data = response.data.data;
    status = response.status;
  } catch (err) {
    error = true;
    status = err.status;
    data = err.response.data ?? null;
  }
  return { data, error, status };
};
