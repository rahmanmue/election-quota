import axios from "axios";
import AuthService from "./authService";

const authService = new AuthService();

const api = axios.create({
  baseURL: import.meta.env.BASE_API_URL,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await authService.refreshToken();
        return api(originalRequest);
      } catch (error) {
        authService.logout();
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
