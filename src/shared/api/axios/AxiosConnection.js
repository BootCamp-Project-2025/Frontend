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
let refreshTokenFunction = null;
let logoutFunction = null;

export const setupAuthInterceptor = (refreshFn, logoutFn) => {
  refreshTokenFunction = refreshFn;
  logoutFunction = logoutFn;
};

baseAPI.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (refreshTokenFunction) {
        try {
          console.log("401 detected, attempting token refresh...");
          const newToken = await refreshTokenFunction();

          if (newToken) {
            originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
            return baseAPI(originalRequest);
          }
        } catch (refreshError) {
          console.error("Token refresh failed:", refreshError);

          if (logoutFunction) {
            logoutFunction();
          }
        }
      }
    }

    return Promise.reject(error);
  }
);
