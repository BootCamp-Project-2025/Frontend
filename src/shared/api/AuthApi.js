import { baseAPI } from "./axios/AxiosConnection";

export const syncUser = async () => {
  const response = await baseAPI.post("/auth/sync");

  return response.data.data;
};

export const updateRoles = async (role) => {
  const response = await baseAPI.put("/auth/roles", { role });

  return response.data.data;
};
