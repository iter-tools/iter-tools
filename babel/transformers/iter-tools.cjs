const { resolve } = require('path');
const babelJest = require('babel-jest');

module.exports = babelJest.createTransformer({
  configFile: resolve(__dirname, '../jest.config.cjs'),
  plugins: [['babel-plugin-transform-package-self-reference', { resolveTo: 'dist/es5' }]],
});
