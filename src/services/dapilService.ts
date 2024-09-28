import axiosInstance from "./api";

export interface DapilType {
  id?: string;
  daerah_pemilihan: string;
  kabupaten_kota: string;
  provinsi: string;
  tahun: number | string;
  alokasi_kursi: number | string;
}

export interface ResponseDapil {
  status: number;
  data: DapilType[];
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export default class DapilService {
  async getAll(page: number = 1, pageSize: number = 5): Promise<ResponseDapil> {
    const response = await axiosInstance.get(
      `/dapil?page=${page}&pageSize=${pageSize}`
    );
    return response.data;
  }

  async getById(id: string): Promise<{ status: number; data: DapilType }> {
    const response = await axiosInstance.get(`/dapil/${id}`);
    return response.data;
  }

  async searhByKeyword(
    keyword: string,
    page: number = 1,
    pageSize: number = 5
  ): Promise<ResponseDapil> {
    const response = await axiosInstance.get(
      `/dapil/search?keyword=${keyword}&page=${page}&pageSize=${pageSize}`
    );
    return response.data;
  }

  async addDapil(data: DapilType) {
    const response = await axiosInstance.post("/dapil", data);
    return response.data;
  }

  async updateDapil(data: DapilType) {
    const response = await axiosInstance.put("/dapil", data);
    return response.data;
  }

  async deleteDapil(id: string) {
    const response = await axiosInstance.delete(`/dapil/${id}`);
    return response.data;
  }
}
