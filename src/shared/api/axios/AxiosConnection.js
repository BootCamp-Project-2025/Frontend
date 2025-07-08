import axios from "axios";

export const baseAPI = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/`,
});

export const setAuthToken = (token) => {
  if (token) {
    baseAPI.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete baseAPI.defaults.headers.common["Authorization"];
  }
};
