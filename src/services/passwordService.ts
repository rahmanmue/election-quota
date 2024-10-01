import axiosInstance from "./api";

export default class PasswordService {
  async forgetPassword(email: string) {
    try {
      const res = await axiosInstance.post("/forget-password", {
        email: email,
      });
      return res.data;
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        throw new Error(error.response.data.message);
      } else {
        console.error("Forget Password failed", error);
        throw new Error("Failed to send link. Please try again.");
      }
    }
  }

  async resetPassword(
    token: string,
    data: { password: string; confPassword: string }
  ) {
    try {
      const res = await axiosInstance.post(`/reset-password/${token}`, data);
      return res.data;
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        throw new Error(error.response.data.message);
      } else {
        console.error("Reset password failed", error);
        throw new Error("Failed to reset password. Please try again.");
      }
    }
  }
}
