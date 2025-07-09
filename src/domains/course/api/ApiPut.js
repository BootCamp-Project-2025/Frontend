import { learningAPI } from "../axios/AxiosCourseConnection";

export const ApiPut = async (path, body) => {
  let error = false;
  let status;
  let data = null;
  try {
    const response = await learningAPI.put(path, body);
    status = response.statusCode;
    data = response.data.data;
    status = response.status;
  } catch (err) {
    error = true;
    status = err.status;
    data = err.response.data.data ?? null;
  }
  return { data, error, status };
};
