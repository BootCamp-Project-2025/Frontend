import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [react(), tailwindcss(), svgr()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./setupTests.ts",
    include: ["test/**/*.{test,spec}.{ts,js,tsx,jsx}"],
    coverage: {
      provider: "v8",
      all: true,
      reporter: ["text", "json", "html"],
      include: ["src/**/*.{ts,js,tsx,jsx}"],
      exclude: ["node_modules/", "dist/", "coverage/"],
      /*   threshold: {
        lines: 70,
        functions: 70,
        branches: 70,
        statements: 70,
      }, */
    },
  },
});
