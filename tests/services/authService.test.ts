import AuthService from "../../src/services/authService";
import axiosInstance from "../../src/services/api";
import MockAdapter from "axios-mock-adapter";

describe("AuthService", () => {
  const mock = new MockAdapter(axiosInstance);
  const authService = new AuthService();

  afterEach(() => {
    mock.reset();
  });

  it("should log in and return access token", async () => {
    const loginData = { email: "user@example.com", password: "password" };
    const mockResponse = { accessToken: "fakeAccessToken" };

    mock.onPost("/auth/login", loginData).reply(200, mockResponse);

    const response = await authService.login(loginData);

    expect(response).toEqual(mockResponse);
  });

  it("should register a new user", async () => {
    const registerData = {
      name: "John Doe",
      email: "user@example.com",
      password: "password",
      confPassword: "password",
    };

    const mockResponse = { message: "Registration successful" };

    mock.onPost("/auth/register", registerData).reply(200, mockResponse);

    const response = await authService.register(registerData);

    expect(response).toEqual(mockResponse);
  });

  it("should log out a user", async () => {
    const mockResponse = { message: "Logout successful" };

    mock.onDelete("/auth/logout").reply(200, mockResponse);

    const response = await authService.logout();

    expect(response).toEqual(mockResponse);
  });

  it("should return Google login URL", () => {
    const googleLoginUrl = authService.googleLogin();
    expect(googleLoginUrl).toBe(`http://localhost:5000/google`);
  });
});
