import axiosInstance from "./api";
import { Token, LoginType, RegisterType } from "../interfaces";

export default class AuthService {
  async login(data: LoginType): Promise<Token> {
    const response = await axiosInstance.post("/auth/login", data);
    return response.data;
  }

  async register(data: RegisterType) {
    const response = await axiosInstance.post("/auth/register", data);
    return response.data;
  }

  async logout() {
    const response = await axiosInstance.delete("/auth/logout");
    return response.data;
  }

  async refreshToken(): Promise<Token> {
    const response = await axiosInstance.post("/auth/refresh-token");
    return response.data;
  }
}
