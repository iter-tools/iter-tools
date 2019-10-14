module.exports = {
  extends: './babel-shared.config.js',
  overrides: [
    {
      test: '**/*.mjs',
      plugins: [['@babel/plugin-transform-runtime', { useESModules: true, corejs: 2 }]],
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
          plugins: [['@babel/plugin-transform-runtime', { corejs: 2 }]],
        },
        es: {
          plugins: ['./babel-plugin-pure-curry'],
        },
        cjs: {
          plugins: [
            'add-module-exports',
            '@babel/plugin-transform-modules-commonjs',
            ['@babel/plugin-transform-runtime', { corejs: 2 }],
          ],
        },
      },
    },
  ],
};
