import { baseAPI } from "../axios/AxiosConnection";

export const postFreelancerResource = async (
  freelancerId,
  resourceType,
  payload,
  headers = {}
) => {
  try {
    const url = `/freelancers/${freelancerId}/${resourceType}`;
    const response = await baseAPI.post(url, payload, headers);
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
