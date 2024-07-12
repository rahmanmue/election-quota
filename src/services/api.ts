import axios from "axios";
import AuthService from "./authService";

const authService = new AuthService();

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { accessToken } = await authService.refreshToken();
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        localStorage.setItem("token", accessToken);
        console.log(accessToken);
        return axiosInstance(originalRequest);
      } catch (error) {
        authService.logout();
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
