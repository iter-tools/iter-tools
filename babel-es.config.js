module.exports = {
  extends: './babel-shared.config.js',
  overrides: [
    {
      test: ['**/*.mjs', '**/__tests__/*.js'],
      plugins: ['@babel/plugin-syntax-async-generators'],
      env: {
        es: {
          plugins: ['./babel-plugin-pure-curry'],
        },
        cjs: {
          plugins: ['add-module-exports', '@babel/plugin-transform-modules-commonjs'],
        },
      },
    },
  ],
};
