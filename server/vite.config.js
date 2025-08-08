/// vite.config.js
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node", // for backend
    sequence: {
      // run tests in order to avoid tests running simultaneously and causing Mongoose connection error
      sequential: true,
    },
  },
});
