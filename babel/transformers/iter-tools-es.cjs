const { resolve } = require('path');
const babelJest = require('babel-jest');

module.exports = babelJest.createTransformer({
  configFile: resolve(__dirname, '../jest.config.cjs'),
  plugins: [[resolve(__dirname, '../plugins/self-import.cjs'), { resolveTo: 'dist/es' }]],
});
