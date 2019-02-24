function makeProject (projectConfig) {
  return Object.assign({}, {
    displayName: projectConfig.name,
    moduleFileExtensions: ['js', 'mjs'],
    setupFilesAfterEnv: ['./src/__tests__/__framework__/init-framework.js'],
    transform: {
      '.*': '<rootDir>/transformers/' + projectConfig.name
    },
    testMatch: ['**/__tests__/**/*.test.js']
  }, projectConfig)
}

module.exports = {
  testEnvironment: 'node',
  testMatch: [],
  coverageReporters: ['json-summary', 'text', 'lcov'],
  projects: [
    makeProject({
      name: 'es5'
    }),
    makeProject({
      name: 'es2015'
    })
  ].concat(
    process.env.CI
      ? makeProject({
        name: 'es2018'
      })
      : []
  )
}
