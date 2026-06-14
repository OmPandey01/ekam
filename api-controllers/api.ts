import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Make sure error.response exists
    if (!error.response) {
      console.error("Network error or no response from server");
      return Promise.reject(
        new Error("Network error - please check your connection"),
      );
    }
    return Promise.reject(error);
  },
);

export default api;
