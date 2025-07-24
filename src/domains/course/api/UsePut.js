import { baseAPI } from "../../../shared/api/axios/AxiosConnection";

export const UsePut = async (path, id, body) => {
  let error = false;
  let status = 200;
  let responseData = null;
  try {
    const response = await baseAPI.put(`${path}/${id ?? ""}`, body);
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
