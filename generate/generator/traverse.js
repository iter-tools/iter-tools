const { relative } = require('path');
const recursive = require('recursive-readdir');
const { matcher } = require('micromatch');

function makeMatcher(root, glob) {
  let match;
  if (glob == null) return () => true;
  else if (typeof glob === 'string') match = matcher(glob);
  else if (Array.isArray(glob)) match = matcher(`(${glob.join('|')})`);
  else throw new Error('glob configuration was not a string, Array, or null');

  return path => match(relative(root, path));
}

function traverse(root, options) {
  const { ignored, glob } = options;

  const matchesGlob = makeMatcher(root, glob);
  const ignoredMatchers = ignored.map(glob => makeMatcher(root, glob));

  return recursive(root, ignoredMatchers).then(initialPaths => {
    return initialPaths.filter(path => matchesGlob(path)).map(path => relative(root, path));
  });
}

module.exports = traverse;
