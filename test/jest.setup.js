import "@testing-library/jest-dom";

const originalWarn = console.warn;

beforeAll(() => {
  console.warn = () => undefined;
});

afterAll(() => {
  console.warn = originalWarn;
});
