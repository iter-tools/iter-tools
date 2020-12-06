function whenCi(arr) {
  return process.env.CI || process.env.PKGS ? arr : [];
}

function makeProject(projectConfig) {
  return {
    displayName: projectConfig.name,
    moduleFileExtensions: ['js', 'cjs'],
    transform: {
      '.*': `<rootDir>/babel/transformers/${projectConfig.name}.cjs`,
    },
    testMatch: ['**/__tests__/**/!($)*.test.{js,cjs}'],
    clearMocks: true,
    testPathIgnorePatterns: ['generate-yo/generators/[^/]+/templates?'],
    setupFilesAfterEnv: ['<rootDir>/src/test/setup.js'],
    ...projectConfig,
  };
}

export default {
  testEnvironment: 'node',
  coverageReporters: ['json-summary', 'text', 'lcov'],
  collectCoverageFrom: ['src/**', '!src/?(__)methods/*', '!**/$*.js', '!src/(test|types)/**'],
  coverageDirectory: './coverage/',

  testMatch: [],
  projects: [
    makeProject({
      name: 'src',
    }),
    ...whenCi([
      makeProject({
        name: 'iter-tools',
      }),
      makeProject({
        name: 'iter-tools-es',
      }),
    ]),
  ],
};
