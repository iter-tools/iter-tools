const { relative } = require('path');
const recursiveRead = require('recursive-readdir');
const { matcher } = require('micromatch');

function makeMatcher(root, glob) {
  let isMatch;
  if (glob == null) return () => true;
  else if (typeof glob === 'string') isMatch = matcher(glob);
  else if (Array.isArray(glob)) isMatch = matcher(`(${glob.join('|')})`);
  else throw new Error('glob configuration was not a string, Array, or null');

  return path => isMatch(relative(root, path));
}

function makeIgnoreMatcher(root, pattern) {
  const isMatch = matcher(pattern);
  return path => isMatch(relative(root, path));
}

function traverse(root, options) {
  const { ignored, glob } = options;

  const matchesGlob = makeMatcher(root, glob);

  return recursiveRead(root, [makeIgnoreMatcher(root, ignored)]).then(initialPaths => {
    return initialPaths.filter(path => matchesGlob(path)).map(path => relative(root, path));
  });
}

module.exports = traverse;
