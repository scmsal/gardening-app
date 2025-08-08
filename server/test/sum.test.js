import { describe, it, expect } from "vitest";

const sum = (a, b) => {
  return a + b;
};

describe("sum", () => {
  it("adds two numbers", () => {
    expect(sum(1, 2)).toBe(3);
  });
});
