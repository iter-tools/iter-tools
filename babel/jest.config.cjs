module.exports = {
  comments: true,
  plugins: [
    '@babel/plugin-transform-typescript',
    /**
     * Remove when /jest/issues/10883 is resolved
     */
    'babel-plugin-transform-package-self-reference',
    /**
     * Eventually there will be no need for this as Jest has added support for
     * testing native modules. This currently was tested working with the
     * --experimental-vm-modules node flag. transform-commonjs should be
     * removed from the package deps once that flag is dropped.
     */
    '@babel/plugin-transform-modules-commonjs',
  ],
};
