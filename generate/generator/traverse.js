'use strict';

const { relative } = require('path');
const recursiveRead = require('recursive-readdir');
const sane = require('sane');
const { matcher } = require('./matcher');

const alwaysIgnored = ['.git', 'node_modules'];

function asArray(glob) {
  return Array.isArray(glob) ? glob : glob ? [glob] : [];
}

module.exports = {
  traverse(root, { ignored, glob } = {}) {
    const matchesGlob = matcher(glob);

    return recursiveRead(root, [matcher([...alwaysIgnored, ...asArray(ignored)])]).then(
      initialPaths => {
        return initialPaths.filter(matchesGlob).map(path => relative(root, path));
      },
    );
  },

  watch(root, { ignored, glob } = {}) {
    return sane(root, { ignored: [...alwaysIgnored, ...asArray(ignored)], glob });
  },
};
