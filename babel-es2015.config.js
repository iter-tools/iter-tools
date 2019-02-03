module.exports = {
  plugins: [
    '@babel/plugin-proposal-async-generator-functions'
  ],
  env: {
    cjs: {
      plugins: [
        'add-module-exports',
        '@babel/plugin-transform-modules-commonjs'
      ]
    }
  }
}
