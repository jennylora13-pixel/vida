import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// PWA-friendly base so o app funciona bem em subpastas de deploy
export default defineConfig({
  plugins: [react()],
  server: { host: true, port: 5173 },
});
