const { relative } = require('path');
const recursiveRead = require('recursive-readdir');
const { matcher } = require('./matcher');

function traverse(root, options) {
  const { ignored, glob } = options;

  const matchesGlob = matcher(glob);

  return recursiveRead(root, [matcher(ignored)]).then(initialPaths => {
    return initialPaths.filter(matchesGlob).map(path => relative(root, path));
  });
}

module.exports = traverse;
