import { baseAPI } from "../axios/AxiosConnection";

export const deleteFreelancerResource = async (
  freelancerId,
  resourceType,
  resourceId,
  headers = {}
) => {
  try {
    const url = `/freelancers/${freelancerId}/${resourceType}/${resourceId}`;
    const response = await baseAPI.delete(url, headers);
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
