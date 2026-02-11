export default {
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/test/**/*.test.(js|jsx)'],
  setupFilesAfterEnv: ['<rootDir>/test/jest.setup.js'],
  globals: {
    __DEV__: true
  },
};
