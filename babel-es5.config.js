module.exports = {
  plugins: [
    ["@babel/plugin-transform-runtime", {useESModules: true, corejs: 2}],
  ],
  presets: [
    ["@babel/preset-env", {
      modules: false,
    }],
  ],
  env: {
    test: {
      plugins: [
        ["@babel/plugin-transform-runtime", {corejs: 2}],
      ],
    },
    cjs: {
      plugins: [
        "add-module-exports",
        ["@babel/plugin-transform-runtime", {corejs: 2}],
      ],
    },
  },
}
