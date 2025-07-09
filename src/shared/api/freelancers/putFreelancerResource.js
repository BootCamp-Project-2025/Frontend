import { baseAPI } from "../axios/AxiosConnection";

export const putFreelancerResource = async (
  freelancerId,
  resourceType,
  resourceId,
  payload,
  headers = {}
) => {
  try {
    const url = `/freelancers/${freelancerId}/${resourceType}/${resourceId}`;
    const response = await baseAPI.put(url, payload, headers);
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
