import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node", // for backend
    hookTimeout: 10000,
    testTimeout: 10000,
    sequence: {
      // run tests in order to avoid tests running simultaneously and causing Mongoose connection error
      sequential: true,
    },
  },
});
