module.exports = {
  extends: [
    'standard',
    'plugin:prettier/recommended',
    'plugin:jest/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  plugins: ['jest', 'local-rules'],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
    requireConfigFile: false,
    babelOptions: {
      plugins: [['@babel/plugin-syntax-decorators', { decoratorsBeforeExport: true }]],
    },
  },
  env: { es6: true },
  rules: {
    // We have some weird naming conventions. TODO write a rule to enforce them.
    camelcase: 'off',
    // I think this is wrong. Let the transpiler dig it out for perf, but it belongs in the sources.
    'no-return-await': 'off',
    // Pure comments are usually inserted by transpilers, so bundlers expect an exact match.
    'spaced-comment': ['error', 'always', { exceptions: ['#__PURE__'] }],
    'local-rules/no-done-value': 'error',
  },
  globals: {
    never: 'readonly',
    Record: 'readonly',
  },
  overrides: [
    {
      files: ['src/!(?(__)methods)/**'],
      rules: {
        'import/no-default-export': 'error',
      },
    },
    {
      files: ['src/**.js'],
      rules: {
        'local-rules/no-impure-calls': 'error',
        'node/file-extension-in-import': ['error', 'always'],
      },
    },
    {
      files: ['src/test', '**/__tests__/**'],
      rules: {
        'local-rules/no-impure-calls': 'off',
        'import/no-unresolved': 'off',
      },
    },
    {
      files: ['*.ts'],
      parser: '@typescript-eslint/parser',
      extends: ['plugin:@typescript-eslint/recommended'],
      rules: {
        '@typescript-eslint/no-empty-function': ['error', { allow: ['generatorFunctions'] }],
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
        '@typescript-eslint/class-name-casing': 'off', // can't deal with $PascalCased
        'no-useless-constructor': 'off', // was causing `Cannot read property 'body' of null`
        'import/no-unresolved': 'off',
      },
    },
    {
      files: ['$*'],
      rules: {
        'no-unused-expressions': 'off',
        'import/no-unresolved': 'off',
      },
    },
    {
      files: ['**/__tests__/**/$*.test.{js,ts}'],
      rules: {
        'jest/valid-title': 'off',
        // 'jest/valid-describe': 'off',
      },
    },
    {
      files: ['**/__tests__/**/*.test.{js,ts}'],
      env: {
        node: true,
        jest: true,
      },
      rules: {
        'local-rules/pure-curry': 'off',
        'no-self-compare': 'off',
        'jest/no-focused-tests': 'error',
        'no-empty': ['error', { allowEmptyCatch: true }],
        '@typescript-eslint/no-non-null-assertion': 'off',
      },
    },
    {
      files: ['src/internal/**.js'],
      rules: {
        'no-restricted-imports': [
          'error',
          {
            patterns: ['**/methods/*'],
          },
        ],
      },
    },
  ],
};
