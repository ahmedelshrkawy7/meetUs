import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  esbuild: {
    loader: "tsx",
    legalComments: "none",
    // Ignore type errors
    logOverride: { "ts(0)": "silent" },
  },
});
