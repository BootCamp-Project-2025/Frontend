import { baseAPI as learningAPI } from "../../../shared/api/axios/AxiosConnection";

export const ApiGet = async (path) => {
  let error = false;
  let status = 200;
  let data = null;
  try {
    const response = await learningAPI.get(path);
    status = response.statusCode;
    data = response.data;
    status = response.status;
  } catch (err) {
    error = true;
    status = err.status;
    data = err.response.data ?? null;
  }
  return { data, error, status };
};
