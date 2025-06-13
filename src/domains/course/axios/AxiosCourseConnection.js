import axios from "axios";

export const learningAPI = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/learning/api`,
});
