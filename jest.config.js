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

module.exports = Object.assign({
  testEnvironment: 'node',
  testMatch: [],
  projects: [
    makeProject({
      name: 'es5'
    }),
    makeProject({
      name: 'es2018'
    })
  ]
},
makeProject({
  name: 'es2015'
}))
