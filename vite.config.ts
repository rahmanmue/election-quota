import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {
  // Load env file based on the mode (e.g. .env, .env.production)
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    // Use the env variable here
    // server: {
    //   proxy:
    //     mode == "development"
    //       ? {
    //           "/api": {
    //             target: env.VITE_API_URL,
    //             changeOrigin: true,
    //             secure: false,
    //             rewrite: (path) => path.replace(/^\/api/, ""),
    //           },
    //         }
    //       : undefined,
    // },
  };
});
