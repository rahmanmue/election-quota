import axiosInstance from "./api";

export interface ParpolType {
  name: string;
  id?: string;
}

export interface ResponseParpol {
  status: number;
  data: ParpolType[];
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export default class ParpolService {
  async getAll(
    page: number = 1,
    pageSize: number = 5
  ): Promise<ResponseParpol> {
    const response = await axiosInstance.get(
      `/parpol?page=${page}&pageSize=${pageSize}`
    );
    return response.data;
  }

  async getById(id: string): Promise<ParpolType> {
    const response = await axiosInstance.get(`/parpol/${id}`);
    return response.data;
  }

  async searhByKeyword(
    keyword: string,
    page: number = 1,
    pageSize: number = 5
  ): Promise<ResponseParpol> {
    const response = await axiosInstance.get(
      `/parpol/search?keyword=${keyword}&page=${page}&pageSize=${pageSize}`
    );
    return response.data;
  }

  async addParpol(data: ParpolType) {
    const response = await axiosInstance.post("/parpol", data);
    return response.data;
  }

  async updateParpol(data: ParpolType) {
    const response = await axiosInstance.put("/parpol", data);
    return response.data;
  }

  async deleteParpol(id: string) {
    const response = await axiosInstance.delete(`/parpol/${id}`);
    return response.data;
  }

  downloadDokumen() {
    return "/download-parpol";
  }

  // tidak kepakai
  async downloadParpol() {
    const response = await axiosInstance.get("/download-parpol", {
      responseType: "blob",
    });
    return [response.data];
  }
}
