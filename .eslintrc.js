module.exports = {
  extends: ['standard', 'plugin:prettier/recommended', 'typescript'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
  },
  env: { es6: true },
  rules: {
    'import/no-duplicates': 'off',
  },
  overrides: [
    {
      files: ['*.ts'],
      parser: '@typescript-eslint/parser',
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      },
    },
    {
      files: ['*.auto.spec.ts'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
      },
    },
    {
      files: ['src/methods/$interleave/**/*'],
      rules: {
        'require-yield': 'off',
      },
    },
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
