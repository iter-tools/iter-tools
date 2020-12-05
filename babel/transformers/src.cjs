const { resolve } = require('path');
const babelJest = require('babel-jest');

module.exports = babelJest.createTransformer({
  configFile: resolve(__dirname, '../jest.config.cjs'),
});
