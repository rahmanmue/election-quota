import axiosInstance from "./api";

export interface ParpolVoteType {
  nama_parpol?: string;
  total_suara_sah: number;
  daerah_pemilihan_id?: string;
  id?: string;
}

export default class ParpolVoteService {
  async getParpolVoteByDapil(
    dapil_id: string
  ): Promise<{ status: string; data: ParpolVoteType[] }> {
    const response = await axiosInstance.get(`/parpol/dapil/${dapil_id}`);
    return response.data;
  }

  // create bulk
  async addParpolVote(data: ParpolVoteType[]) {
    const response = await axiosInstance.post("/parpol/vote", data);
    return response.data;
  }

  async updateParpol(data: ParpolVoteType) {
    const response = await axiosInstance.put("/parpol/vote", data);
    return response.data;
  }

  async deleteParpolVote(id: string) {
    const response = await axiosInstance.delete(`/parpol/vote/${id}`);
    return response.data;
  }

  async getById(id: string): Promise<ParpolVoteType> {
    const response = await axiosInstance.get(`/parpol/vote/${id}`);
    return response.data;
  }

  async uploadDocument(formData: FormData) {
    try {
      const response = await axiosInstance.post("/import-excel", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error uploading document:", error);
      throw error;
    }
  }
}
