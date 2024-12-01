import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "tests/setup.ts",
    coverage: {
        enabled:true,
        provider: 'v8',
        reportsDirectory: "./coverage",
        reporter: ['text', 'json', 'html'],
        include: ['src/**/*.{js,ts,tsx}'], // Mengukur `tests` dan `src`
        exclude: [
            'node_modules', 
            'tests/setup.ts', 
            'src/components/ui', 
            'src/components/landing-page', 
            'src/components/admin-panel',
            'src/lib',
            'src/store',
            'src/hooks',
            'src/contexts'
        ], // Abaikan `node_modules` dan file setup
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, 'src'), // Pastikan alias di sini juga ada
    },
  },
});
