module.exports = {
  // Make sure our #__PURE__ annotations stay
  shouldPrintComment: (comment) => comment.startsWith('#'),
  plugins: ['@babel/plugin-syntax-typescript', './plugins/self-import.cjs'],
  ignore: [/[^.][^d]\.ts$/, /\/\$[^/]*$/],
  overrides: [
    {
      test: /^.*\.js$/, // **/*.js is fucking busted : (
      plugins: ['./plugins/transform-modules-commonjs-naive.cjs'],
    },
  ],
};
