import axiosInstance from "./api";

export interface ProfileType {
  id?: string;
  user_id?: string;
  full_name?: string;
  avatar?: string | File;
}

export interface ResponseProfile {
  status: string;
  data: ProfileType;
}

export default class ProfileService {
  async getProfile(): Promise<ResponseProfile> {
    const response = await axiosInstance.get("/profile");
    return response.data;
  }

  async updateProfile(formData: FormData) {
    const response = await axiosInstance.put("/update-profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }

  async updateProfileFirebase(formData: FormData) {
    const response = await axiosInstance.put(
      "/update-profile-firebase",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  }

  getAvatar(avatar: string) {
    return `${import.meta.env.VITE_API_URL}/avatar/${avatar}`;
  }
}
