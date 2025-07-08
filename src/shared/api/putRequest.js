import { baseAPI } from "./axios/AxiosConnection";

export const putRequest = async (url, body) => {
  try {
    const response = await baseAPI.put(url, body);
    return {
      data: response.data,
      status: response.status,
      success: true,
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      status: err?.response?.status || null,
      success: false,
      error: err,
    };
  }
};
