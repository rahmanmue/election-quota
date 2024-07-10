import axios from "axios";
import api from "./api";

interface Tokens {
  accessToken: string;
}

export default class AuthService {
  async login(email: string, password: string): Promise<Tokens> {
    const response = await axios.post("/auth/login", { email, password });
    this.setAccessToken(response.data.accessToken);
    return response.data;
  }

  async register(email: string, password: string) {
    const response = await axios.post("/auth/register", { email, password });
    return response.data;
  }

  async logout() {
    const response = await axios.delete("/auth/logout");
    this.removeAccessToken();
    return response.data;
  }

  async refreshToken(): Promise<Tokens> {
    const response = await axios.post("/auth/refresh-token");
    this.setAccessToken(response.data.accessToken);
    return response.data;
  }

  setAccessToken(accessToken: string) {
    localStorage.setItem("accessToken", JSON.stringify(accessToken));
    api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }

  removeAccessToken() {
    localStorage.removeItem("accessToken");
    delete api.defaults.headers.common["Authorization"];
  }
}
