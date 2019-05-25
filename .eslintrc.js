module.exports = {
  extends: 'standard',
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  env: { es6: true },
  overrides: [
    {
      files: ['*.template.js'],
      rules: {
        'no-unused-expressions': 'off'
      }
    }, {
      files: ['**/__tests__/**/*.test.*(template.)*(m)js'],
      env: {
        node: true,
        jest: true
      }
    }
  ]
};
