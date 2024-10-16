// stringCalculator.test.js
const { add } = require('./stringCalculator'); // Adjust path as needed

describe('String Calculator', () => {
  test('returns 0 for an empty string', () => {
    expect(add("")).toBe(0);
  });

  test('returns the number itself for a single number', () => {
    expect(add("1")).toBe(1);
  });

  test('returns the sum for two numbers', () => {
    expect(add("1,5")).toBe(6);
  });

  test('handles new lines between numbers', () => {
    expect(add("1\n2,3")).toBe(6);
  });

  test('supports custom delimiters', () => {
    expect(add("//;\n1;2")).toBe(3);
  });

  test('throws an error for negative numbers', () => {
    expect(() => add("1,-1")).toThrow("negative numbers not allowed -1");
    expect(() => add("1,-1,-2")).toThrow("negative numbers not allowed -1, -2");
  });
});
