import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import axiosInstance from "../../src/services/api";
import { saveToLocalStorage, decodedToken } from "../../src/lib/authUtils";
import {vi} from "vitest";

vi.mock("@/lib/authUtils", () => ({
  decodedToken: vi.fn(),
  saveToLocalStorage: vi.fn(),
}));

describe("axiosInstance", () => {
  const mock = new MockAdapter(axiosInstance);
  const mockAxios = new MockAdapter(axios);

  afterEach(() => {
    mock.reset();
    mockAxios.reset();
    vi.clearAllMocks();
  });

  it("should retry the request and set new token if 401 error occurs", async () => {
    const fakeAccessToken = "fakeAccessToken";
    const decodedPayload = { userId: "123" };

    // Mock decodedToken dan saveToLocalStorage
    (decodedToken as jest.Mock).mockReturnValue(decodedPayload);

    // Mock permintaan API refresh token
    mockAxios.onPost("/auth/refresh-token").reply(200, {
      accessToken: fakeAccessToken,
    });

    // Mock permintaan awal yang menghasilkan 401
    mock.onGet("/protected").replyOnce(401);

    // Mock permintaan ulang setelah token diperbarui
    mock.onGet("/protected").reply(200, { message: "Success" });

    const response = await axiosInstance.get("/protected");

    expect(decodedToken).toHaveBeenCalledWith(fakeAccessToken);
    expect(saveToLocalStorage).toHaveBeenCalledWith({
      token: fakeAccessToken,
      isAuthenticated: true,
      userId: decodedPayload.userId,
    });
    expect(response.data).toEqual({ message: "Success" });
  });

  it("should logout if refresh token fails", async () => {
    const mockLocation = { href: "" };
    vi.stubGlobal("window", { location: mockLocation });

    // Mock API refresh-token gagal
    mockAxios.onPost("/auth/refresh-token").reply(401);

    // Mock permintaan awal menghasilkan 401
    mock.onGet("/protected").replyOnce(401);

    await expect(axiosInstance.get("/protected")).rejects.toThrow();

    expect(localStorage.getItem("authState")).toBeNull();
    expect(window.location.href).toBe("/sign-in");
  });
});
