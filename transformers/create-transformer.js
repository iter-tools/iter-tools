const { join } = require('path');
const babelJest = require('babel-jest');

module.exports = function(configFile) {
  return babelJest.createTransformer({
    configFile: join(__dirname, '..', configFile),
    // prettier-ignore
    plugins: [
      /**
       * This is a little bit of a hack. We need to include a type plugin to
       * enable execution of the test files, which may include some types
       * annotations where they are required due to limitations of inference.
       * These annotations should be written using only syntax that is common
       * to both typescript and flow.
       *
       * Unfortunately babel-plugin-transform-typescript destroys our normal
       * sources for some reason. It interprets imports to be type imports, and
       * destroys them. We use the flow-strip-types plugin because it doesn't
       * do this.
       */ 
      '@babel/plugin-transform-flow-strip-types',
      'add-module-exports',
      '@babel/plugin-transform-modules-commonjs'
    ],
    // presets: ["jest"] // something else is loading this I guess...
  });
};
