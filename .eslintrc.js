module.exports = {
  extends: ['standard', 'prettier'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
  },
  env: { es6: true },
  rules: {
    'import/no-duplicates': 'off'
  },
  overrides: [
    {
      files: ['$*.js'],
      rules: {
        'no-unused-expressions': 'off',
      },
    },
    {
      files: ['**/__tests__/**/*.test.js'],
      env: {
        node: true,
        jest: true,
      },
    },
  ],
};
