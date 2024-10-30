import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import TurboConsole from "vite-plugin-turbo-console";

const cacheDir =
  process.env.NODE_ENV === 'development'
    ? '/app/node_modules/.vite'
    : 'node_modules/.vite';

export default defineConfig({
  plugins: [react(), TurboConsole()],
  logLevel: "info",
  server: {
    host: true,
    port: +process.env.PORT! || 5173,
  },
  cacheDir,
});
