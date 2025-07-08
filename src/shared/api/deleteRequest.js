import { baseAPI } from "./axios/AxiosConnection";

export const deleteRequest = async (url) => {
  try {
    const response = await baseAPI.delete(url);
    return {
      success: true,
      status: response.status,
    };
  } catch (err) {
    return {
      success: false,
      status: err?.response?.status || null,
      error: err,
    };
  }
};
