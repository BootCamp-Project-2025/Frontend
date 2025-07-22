import { baseAPI as learningAPI } from "../../../shared/api/axios/AxiosConnection";

export const ApiPost = async (path, body) => {
  let error = false;
  let status = 200;
  let data = null;
  try {
    const response = await learningAPI.post(path, body);
    status = response.statusCode;
    data = response.data.data;
    status = response.status;
  } catch (err) {
    error = true;
    status = err.status;
    data = err.response.data ?? err;
  }
  return { data, error, status };
};
