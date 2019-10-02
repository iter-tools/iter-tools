module.exports = {
  plugins: [
    ['@babel/plugin-transform-runtime', { useESModules: true, corejs: 2 }],
    '@babel/plugin-proposal-async-generator-functions',
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
};
