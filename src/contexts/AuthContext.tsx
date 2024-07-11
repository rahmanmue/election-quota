import React, { createContext, ReactNode, useContext } from "react";
import axiosInstance from "../services/api";
import AuthService from "../services/authService";
import { AuthContextType, LoginType, RegisterType } from "../interfaces";

const authService = new AuthService();

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const login = async (data: LoginType) => {
    try {
      const { accessToken } = await authService.login(data);
      localStorage.setItem("token", accessToken);
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
      console.log(accessToken);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      localStorage.removeItem("token");
      axiosInstance.defaults.headers.common.Authorization = null;
    } catch (error) {
      console.log(error);
    }
  };

  const register = async (data: RegisterType) => {
    try {
      const response = await authService.register(data);
      console.log(response);
    } catch (error: any) {
      if (error.response.status === 409) {
        throw new Error(error.response.data.msg);
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
