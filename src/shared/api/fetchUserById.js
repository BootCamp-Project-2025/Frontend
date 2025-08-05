import { getRequest } from "./getRequest";

export const fetchUserById = async (userId) => {
  const response = await getRequest(`users/${userId}`);
  return response.data;
};
