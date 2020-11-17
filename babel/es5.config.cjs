module.exports = {
  extends: './shared.config.cjs',
  overrides: [
    {
      test: /^.*\.js$/,
      plugins: ['@babel/plugin-transform-runtime'],
      presets: [
        [
          '@babel/preset-env',
          {
            modules: false,
          },
        ],
      ],
    },
  ],
};
