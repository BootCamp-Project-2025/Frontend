import { baseAPI } from "./axios/AxiosConnection";

export const patchRequest = async (url, data = {}, headers = {}) => {
  try {
    const response = await baseAPI.patch(url, data, headers);
    return {
      success: true,
      status: response.status,
      data: response.data,
    };
  } catch (err) {
    return {
      success: false,
      status: err?.response?.status || null,
      error: err,
    };
  }
};
