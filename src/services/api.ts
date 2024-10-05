import axios from "axios";
import { decodedToken, saveToLocalStorage } from "@/lib/authUtils";

// Buat instance axios
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
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
        const decode = decodedToken(accessToken);

        // Set token baru
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        saveToLocalStorage({
          token: accessToken,
          isAuthenticated: true,
          userId: decode.userId,
        });

        // Ulangi request yang asli
        return axiosInstance(originalRequest);
      } catch (error) {
        console.error("Error refreshing token", error);
        // Logout jika refresh token gagal
        localStorage.removeItem("authState");
        window.location.href = "/sign-in";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
