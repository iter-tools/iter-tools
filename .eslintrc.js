module.exports = {
  extends: ['standard', 'plugin:prettier/recommended', 'plugin:jest/recommended'],
  plugins: ['jest'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
  },
  env: { es6: true },
  rules: {
    'import/no-duplicates': 'off',
    'no-return-await': 'off',
  },
  globals: {
    never: 'readonly',
    Record: 'readonly',
  },
  overrides: [
    {
      files: ['*.ts'],
      parser: '@typescript-eslint/parser',
      extends: ['plugin:@typescript-eslint/recommended'],
      rules: {
        '@typescript-eslint/ban-ts-ignore': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
        '@typescript-eslint/class-name-casing': 'off', // can't deal with $PascalCased
        'no-useless-constructor': 'off', // was causing `Cannot read property 'body' of null`
      },
    },
    {
      files: ['*.auto.spec.ts'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
        'no-self-compare': 'off',
        'jest/no-focused-tests': 'error',
        'no-empty': ['error', { allowEmptyCatch: true }],
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
      files: ['**/__tests__/**/$*.test.js'],
      rules: {
        'jest/valid-title': 'off',
        // 'jest/valid-describe': 'off',
      },
    },
    {
      files: ['**/__tests__/**/*.test.js'],
      env: {
        node: true,
        jest: true,
      },
      rules: {
        'no-self-compare': 'off',
        'jest/no-focused-tests': 'error',
        'no-empty': ['error', { allowEmptyCatch: true }],
      },
    },
  ],
};
