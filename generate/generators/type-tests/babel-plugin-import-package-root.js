'use strict';

const { relative, join, dirname } = require('path');
const { path: rootDir } = require('package.root');

module.exports = function importPackageRoot() {
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
