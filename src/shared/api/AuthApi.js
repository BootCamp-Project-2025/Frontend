import axiosInstance from "../axios/axiosInstance";

export const syncUser = async () => {
  const response = await axiosInstance.post("/auth/sync");

  return response.data.data;
};

export const updateRoles = async (role) => {
  const response = await axiosInstance.put("/auth/roles", { role });

  return response.data.data;
};
