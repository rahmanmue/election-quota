import axiosInstance from "./api";

export default class CalculationService {
  async getResults(id: string) {
    const response = await axiosInstance.get(`/calculation/${id}`);
    return response.data;
  }
}
