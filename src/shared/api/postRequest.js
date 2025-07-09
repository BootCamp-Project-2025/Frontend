import { baseAPI } from "./axios/AxiosConnection";

export const postRequest = async (url, body) => {
  try {
    const response = await baseAPI.post(url, body);
    return {
      data: response.data,
      status: response.status,
      error: null,
      success: true,
    };
  } catch (err) {
    return {
      data: null,
      status: err?.response?.status || null,
      error: err,
      success: false,
    };
  }
};
