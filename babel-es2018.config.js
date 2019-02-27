module.exports = {
  plugins: ["@babel/plugin-syntax-async-generators"],
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
