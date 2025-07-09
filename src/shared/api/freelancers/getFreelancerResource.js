import { baseAPI } from "../axios/AxiosConnection";

export const getFreelancerResource = async (
  freelancerId,
  resourceType,
  headers = {}
) => {
  try {
    const url = `/freelancers/${freelancerId}/${resourceType}`;
    const response = await baseAPI.get(url, headers);
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
