import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Terminal from "vite-plugin-terminal";
import TurboConsole from "vite-plugin-turbo-console";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), Terminal(), TurboConsole()],
  logLevel: "info",
});
