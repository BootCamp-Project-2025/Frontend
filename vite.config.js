import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,
    environment: "jsdom",
    include: ["test/**/*.{test,spec}.{ts,js,tsx,jsx}"],
    coverage: {
      reporter: ["text", "json", "html"],
      include: ["src/**/*.{ts,js,tsx,jsx}"],
      exclude: ["node_modules/", "dist/", "coverage/"],
    },
  },
});
