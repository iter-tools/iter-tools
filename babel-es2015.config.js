module.exports = {
  plugins: ["@babel/plugin-proposal-async-generator-functions"],
  env: {
    es: {
      plugins: ["./babel-plugin-pure-curry"]
    },
    cjs: {
      plugins: [
        "add-module-exports",
        "@babel/plugin-transform-modules-commonjs"
      ]
    }
  }
};
