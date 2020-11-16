module.exports = {
  extends: './babel-shared.config.js',
  overrides: [
    {
      test: ['**/*.mjs', '**/__tests__/*.js'],
      plugins: [['@babel/plugin-transform-runtime', { useESModules: true }]],
      presets: [
        [
          '@babel/preset-env',
          {
            modules: false,
          },
        ],
      ],
      env: {
        test: {
          plugins: [['@babel/plugin-transform-runtime']],
        },
        es: {
          plugins: ['./babel-plugin-pure-curry'],
        },
        cjs: {
          plugins: [
            'add-module-exports',
            '@babel/plugin-transform-modules-commonjs',
            '@babel/plugin-transform-runtime',
          ],
        },
      },
    },
  ],
};
