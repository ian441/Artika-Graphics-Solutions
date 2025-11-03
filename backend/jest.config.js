module.exports = {
  preset: null,
  testEnvironment: 'node',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'app/**/*.js',
    '!app/**/*.test.js',
  ],
  testMatch: [
    '**/__tests__/**/*.test.js',
  ],
  setupFilesAfterEnv: ['./test-setup.js'],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
};
