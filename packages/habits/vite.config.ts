import { defineConfig } from "vite";
import { fileURLToPath, URL } from "url";
export default defineConfig(({ mode, command }) => {
  const common = {
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  };
  if (mode === "production") {
    return {
      ...common,
      base: "/notion-widgets/habits/",
      build: {
        target: 'esnext',
        outDir: '../../dist/habits/'
      }
    };
  }
  return { ...common };
});
