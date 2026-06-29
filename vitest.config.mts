import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: ["./vitest.setup.ts"],
    css: false,
    // register 페이지가 모듈 로드 시 읽는 환경변수
    env: {
      NEXT_PUBLIC_API_URL: "https://api.test.local",
    },
    exclude: ["node_modules", ".next", "dist", "e2e"],
  },
});
