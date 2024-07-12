import React, { createContext, ReactNode } from "react";
import axiosInstance from "../services/api";
import AuthService from "../services/authService";
import { AuthContextType, LoginType, RegisterType } from "../interfaces";
import { useNavigate } from "react-router-dom";
const authService = new AuthService();

const AuthContext = createContext<AuthContextType>({
  login: async () => {},
  logout: () => {},
  register: async () => {},
});

const AuthContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const login = async (data: LoginType) => {
    try {
      const { accessToken } = await authService.login(data);
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
      localStorage.setItem("token", accessToken);
      navigate("/private");
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      localStorage.removeItem("token");
      axiosInstance.defaults.headers.common.Authorization = null;
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const register = async (data: RegisterType) => {
    try {
      const response = await authService.register(data);
      console.log(response);
      navigate("/login");
    } catch (error: any) {
      if (error.response.status === 409) {
        throw new Error(error.response.data.message);
      }
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider value={{ login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider, AuthContext };
