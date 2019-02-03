const babelJest = require("babel-jest");

module.exports = function(configFile) {
  return babelJest.createTransformer({
    configFile: "./" + configFile,
    plugins: [
      "add-module-exports",
      "@babel/plugin-transform-modules-commonjs",
    ],
    // presets: ["jest"] // something else is loading this I guess...
  });
}
