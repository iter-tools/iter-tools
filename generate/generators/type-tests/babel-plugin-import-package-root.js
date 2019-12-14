'use strict';

const { relative, join, dirname } = require('path');
const pkgDir = require('pkg-dir');

const rootDir = pkgDir.sync(__dirname);

module.exports = function importPackageRoot({ types: t }, { ASYNC }) {
  const visitor = {
    ImportDeclaration(path, state) {
      if (relative(rootDir, join(dirname(state.filename), path.node.source.value)) === 'src') {
        // path.node.source.value += '/..';
      }
    },
  };

  return {
    name: 'import-package-root',
    visitor,
  };
};
