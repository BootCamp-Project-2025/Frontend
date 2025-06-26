import { baseAPI } from "../axios/AxiosConnection";

export const UsePut = async (path, id = "", body) => {
  let error = false;
  let status;
  try {
    const response = await baseAPI.put(path + "/" + id, body);
    status = response.statusCode;
  } catch (err) {
    error = true;
    status = err.status;
  }

  return { error, status };
};
