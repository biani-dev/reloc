const config = {
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/test/**/*.test.(js|jsx)'],
  setupFilesAfterEnv: ['<rootDir>/test/jest.setup.js'],
  globals: {
    __DEV__: true
  },
};

module.exports = config;
