module.exports = {
  plugins: [
    '@babel/plugin-syntax-async-generators'
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
