import axios from "axios";
import { saveToLocalStorage } from "@/lib/authUtils";

// Buat instance axios
const axiosInstance = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Interceptor untuk menangani respons
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Panggil API refresh-token tanpa menggunakan authService langsung
        const { data } = await axios.post("/auth/refresh-token");
        const { accessToken } = data;

        // Set token baru
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        saveToLocalStorage({ token: accessToken, isAuthenticated: true });

        // Ulangi request yang asli
        return axiosInstance(originalRequest);
      } catch (error) {
        console.error("Error refreshing token", error);
        // Logout jika refresh token gagal
        localStorage.removeItem("authState");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
