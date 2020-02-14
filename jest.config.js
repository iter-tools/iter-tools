function makeProject(projectConfig) {
  return Object.assign(
    {
      displayName: projectConfig.name,
      moduleFileExtensions: ['js', 'mjs'],
      transform: {
        '.*': '<rootDir>/transformers/' + projectConfig.name,
      },
      testMatch: ['**/__tests__/**/!($)*.test.*(m)js'],
      testPathIgnorePatterns: ['generate-yo/generators/[^/]+/templates?'],
    },
    projectConfig,
  );
}

module.exports = {
  testEnvironment: 'node',
  // testMatch: [],
  coverageReporters: ['json-summary', 'text', 'lcov'],
  // projects: [
  //   makeProject({
  //     name: 'es5',
  //   }),
  //   makeProject({
  //     name: 'es2015',
  //   }),
  // ].concat(
  //   process.env.CI
  //     ? makeProject({
  //         name: 'es2018',
  //       })
  //     : [],
  // ),
  ...makeProject({
    name: 'es2015',
  }),
};
