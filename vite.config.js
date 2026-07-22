import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";

// Build normal (dist/) + build de arquivo único quando SINGLEFILE=1
const single = process.env.SINGLEFILE === "1";

export default defineConfig({
  plugins: [react(), ...(single ? [viteSingleFile()] : [])],
  server: { host: true, port: 5173 },
  build: single
    ? { outDir: "dist-single", assetsInlineLimit: 100000000, cssCodeSplit: false }
    : {},
});
