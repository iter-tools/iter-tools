const { resolve } = require('path');

module.exports = {
  comments: true,
  plugins: [
    ['@babel/plugin-syntax-typescript', false],
    /**
     * Remove when /jest/issues/10883 is resolved
     */
    resolve(__dirname, 'plugins/self-import.cjs'),
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
    /**
     * Eventually there will be no need for this as Jest has added support for
     * testing native modules. This currently was tested working with the
     * --experimental-vm-modules node flag. transform-commonjs should be
     * removed from the package deps once that flag is dropped.
     */
    '@babel/plugin-transform-modules-commonjs',
  ],
  // presets: ["jest"] // something else is loading this I guess...
};
