import MockAdapter from "axios-mock-adapter";
import axiosInstance from "../../src/services/api";
import DapilService, { DapilType, ResponseDapil } from "../../src/services/DapilService";

describe("DapilService", () => {
  const mock = new MockAdapter(axiosInstance);
  const dapilService = new DapilService();

  afterEach(() => {
    mock.reset();
  });

  it("should fetch paginated dapil data", async () => {
    const mockResponse: ResponseDapil = {
      status: 200,
      data: [
        { id: "1", daerah_pemilihan: "A", kabupaten_kota: "B", provinsi: "C", tahun: 2024, alokasi_kursi: 10 },
      ],
      currentPage: 1,
      pageSize: 5,
      totalItems: 1,
      totalPages: 1,
    };

    mock.onGet("/dapil?page=1&pageSize=5").reply(200, mockResponse);

    const response = await dapilService.getAll(1, 5);
    expect(response).toEqual(mockResponse);
  });

  it("should fetch all dapil data", async () => {
    const mockResponse = [
      { id: "1", daerah_pemilihan: "A", kabupaten_kota: "B", provinsi: "C", tahun: 2024, alokasi_kursi: 10 },
    ];

    mock.onGet("/all-dapil").reply(200, mockResponse);

    const response = await dapilService.allDapil();
    expect(response).toEqual(mockResponse);
  });

  it("should fetch dapil by ID", async () => {
    const id = "1";
    const mockResponse = {
      status: 200,
      data: { id, daerah_pemilihan: "A", kabupaten_kota: "B", provinsi: "C", tahun: 2024, alokasi_kursi: 10 },
    };

    mock.onGet(`/dapil/${id}`).reply(200, mockResponse);

    const response = await dapilService.getById(id);
    expect(response).toEqual(mockResponse);
  });

  it("should search dapil by keyword", async () => {
    const keyword = "A";
    const mockResponse: ResponseDapil = {
      status: 200,
      data: [
        { id: "1", daerah_pemilihan: "A", kabupaten_kota: "B", provinsi: "C", tahun: 2024, alokasi_kursi: 10 },
      ],
      currentPage: 1,
      pageSize: 5,
      totalItems: 1,
      totalPages: 1,
    };

    mock.onGet(`/dapil/search?keyword=${keyword}&page=1&pageSize=5`).reply(200, mockResponse);

    const response = await dapilService.searhByKeyword(keyword, 1, 5);
    expect(response).toEqual(mockResponse);
  });

  it("should add a new dapil", async () => {
    const newDapil: DapilType = {
      daerah_pemilihan: "A",
      kabupaten_kota: "B",
      provinsi: "C",
      tahun: 2024,
      alokasi_kursi: 10,
    };

    const mockResponse = { status: 201, message: "Dapil created successfully" };

    mock.onPost("/dapil", newDapil).reply(201, mockResponse);

    const response = await dapilService.addDapil(newDapil);
    expect(response).toEqual(mockResponse);
  });

  it("should update an existing dapil", async () => {
    const updatedDapil: DapilType = {
      id: "1",
      daerah_pemilihan: "Updated A",
      kabupaten_kota: "B",
      provinsi: "C",
      tahun: 2024,
      alokasi_kursi: 15,
    };

    const mockResponse = { status: 200, message: "Dapil updated successfully" };

    mock.onPut("/dapil", updatedDapil).reply(200, mockResponse);

    const response = await dapilService.updateDapil(updatedDapil);
    expect(response).toEqual(mockResponse);
  });

  it("should delete dapil by ID", async () => {
    const id = "1";
    const mockResponse = { status: 200, message: "Dapil deleted successfully" };

    mock.onDelete(`/dapil/${id}`).reply(200, mockResponse);

    const response = await dapilService.deleteDapil(id);
    expect(response).toEqual(mockResponse);
  });
});
