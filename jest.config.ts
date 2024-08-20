import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',

  setupFiles: ['./src/mock/fetchSetup.ts'],
  setupFilesAfterEnv: ['./src/mock/setupTests.ts'],
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/node_modules/**',
    '!src/**/test-utils/**',
    '!src/**/types/**',
  ],
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
};

export default createJestConfig(config);
