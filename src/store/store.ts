import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./sidebarSlice";
import authReducer, { checkTokenExpiry } from "./authSlice";
import { loadFromLocalStorage, saveToLocalStorage } from "@/lib/authUtils";

// Muat state dari localStorage
const persistedStateAuth = loadFromLocalStorage();

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    auth: authReducer,
  },
  preloadedState: {
    auth: persistedStateAuth, // Pastikan state auth diisi jika ada
  },
});

// Subscribe untuk menyimpan state setiap kali ada perubahan
store.subscribe(() => {
  saveToLocalStorage(store.getState().auth); // Simpan state auth ke localStorage
});

// Periksa token saat aplikasi dimuat
store.dispatch(checkTokenExpiry()); // Periksa apakah token kadaluarsa

// Tipe untuk RootState dan AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
