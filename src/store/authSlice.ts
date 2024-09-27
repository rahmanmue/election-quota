import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { isTokenExpired } from "@/lib/authUtils";
import axiosInstance from "@/services/api";

export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
      state.isAuthenticated = true;
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${state.token}`;
      localStorage.setItem(
        "authState",
        JSON.stringify({
          token: state.token,
          isAuthenticated: state.isAuthenticated,
        })
      );
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("authState");
      axiosInstance.defaults.headers.common.Authorization = null;
    },
    checkTokenExpiry: (state) => {
      if (state.token && isTokenExpired(state.token)) {
        state.token = null;
        state.isAuthenticated = false;
        axiosInstance.defaults.headers.common.Authorization = null;
      }
    },
  },
});

export const { loginSuccess, logout, checkTokenExpiry } = authSlice.actions;
export default authSlice.reducer;
