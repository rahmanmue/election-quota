import AuthService from "@/services/authService";
import { useAppDispatch } from "./useAppDispatch";
import { useAppSelector } from "./useAppSelector";
import { RootState } from "@/store/store";
import { checkTokenExpiry, loginSuccess, logout } from "@/store/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { decodedToken } from "@/lib/authUtils";

interface LoginType {
  email: string;
  password: string;
}

interface RegisterType {
  name: string;
  email: string;
  password: string;
  confPassword: string;
  role?: string;
}

const authService = new AuthService();

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  // Pengecekan token
  useEffect(() => {
    if (auth.token) {
      dispatch(checkTokenExpiry());
    }
  }, [auth.token, dispatch]);

  const login = async (data: LoginType) => {
    try {
      const { accessToken } = await authService.login(data);
      const decoded = decodedToken(accessToken);

      dispatch(loginSuccess({ token: accessToken, userId: decoded.userId }));
      navigate("/private");
    } catch (error) {
      // Menangani kesalahan dengan lebih baik
      console.error("Login failed", error);
      throw new Error("Failed to login. Please check your credentials.");
    }
  };

  const logoutUser = () => {
    dispatch(logout());
    navigate("/");
  };

  const register = async (data: RegisterType) => {
    try {
      const response = await authService.register(data);
      console.log(response);
      navigate("/login");
    } catch (error: any) {
      if (error.response && error.response.status === 409) {
        throw new Error(error.response.data.message);
      } else {
        console.error("Registration failed", error);
        throw new Error("Failed to register. Please try again.");
      }
    }
  };

  return { ...auth, login, register, logoutUser };
};
