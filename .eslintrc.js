module.exports = {
  extends: ['standard', 'plugin:prettier/recommended', 'typescript', 'plugin:jest/recommended'],
  plugins: ['jest'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
  },
  env: { es6: true },
  rules: {
    'import/no-duplicates': 'off',
  },
  globals: {
    never: 'readonly',
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
      files: ['*.spec.ts', '*.test.js'],
      rules: {
        eqeqeq: 'off',
      },
    },
    {
      files: ['*.auto.spec.ts'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
        'jest/no-identical-title': 'off', // TODO stop suppressing these
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
        'jest/valid-describe': 'off',
      },
    },
    {
      files: ['**/__tests__/**/*.test.js'],
      env: {
        node: true,
        jest: true,
      },
      rules: {
        'jest/no-focused-tests': 'error',
        'jest/no-identical-title': 'off', // TODO stop suppressing these
      },
    },
  ],
};
