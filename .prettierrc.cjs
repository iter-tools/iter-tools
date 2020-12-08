module.exports = {
  printWidth: 100, // Yes I know prettier says it's not a good idea.
  trailingComma: 'all',
  singleQuote: true,

  overrides: [
    {
      files: '*.md',
      options: {
        printWidth: 60,
      },
    },
  ],
};
