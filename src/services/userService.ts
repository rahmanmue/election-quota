import axiosInstance from "./api";

export interface UserType {
  id?: string;
  name: string;
  email: string;
  password?: string;
  conf_password?: string;
  role?: string;
}

export interface ResponseUser {
  status: number;
  data: UserType[];
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export default class UserService {
  async getAll(page: number = 1, pageSize: number = 5): Promise<ResponseUser> {
    const response = await axiosInstance.get(
      `/users?page=${page}&pageSize=${pageSize}`
    );
    return response.data;
  }

  async getByRToken(): Promise<{ status: string; data: UserType }> {
    const response = await axiosInstance.get("/user");
    return response.data;
  }

  async searhByKeyword(
    keyword: string,
    page: number = 1,
    pageSize: number = 5
  ): Promise<ResponseUser> {
    const response = await axiosInstance.get(
      `/users/search?keyword=${keyword}&page=${page}&pageSize=${pageSize}`
    );
    return response.data;
  }

  async updateUser(data: UserType) {
    const response = await axiosInstance.patch("/users", data);
    return response.data;
  }

  async deleteUser(id: string) {
    const response = await axiosInstance.delete(`/users/${id}`);
    return response.data;
  }
}
