function makeProject(projectConfig) {
  return Object.assign(
    {
      displayName: projectConfig.name,
      moduleFileExtensions: ['js', 'mjs'],
      transform: {
        '.*': '<rootDir>/transformers/' + projectConfig.name,
      },
      testMatch: ['**/__tests__/**/!($)*.test.*(m)js'],
      clearMocks: true,
      testPathIgnorePatterns: ['generate-yo/generators/[^/]+/templates?'],
      setupFilesAfterEnv: ['<rootDir>/src/test/setup.mjs'],
    },
    projectConfig,
  );
}

module.exports = {
  testEnvironment: 'node',
  coverageReporters: ['json-summary', 'text', 'lcov'],
  collectCoverageFrom: ['src/**/*.mjs', '!src/*.mjs', '!**/$*.js', '!src/(test|types)/**'],
  coverageDirectory: './coverage/',

  testMatch: [],
  projects: [
    makeProject({
      name: 'es2015',
    }),
    ...(process.env.CI
      ? [
          makeProject({
            name: 'es5',
          }),
          makeProject({
            name: 'es2018',
          }),
        ]
      : []),
  ],
};
