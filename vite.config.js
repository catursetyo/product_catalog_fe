import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Requests to /api are forwarded to the Express backend, so the browser
// talks to a single origin and the backend needs no CORS configuration.
const proxy = {
  "/api": {
    target: "http://localhost:3001",
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api/, ""),
  },
};

export default defineConfig({
  plugins: [react()],
  server: { proxy },
  preview: { proxy },
});
