const { relative } = require('path');
const recursive = require('recursive-readdir');
const { matcher } = require('micromatch');

function makeMatcher(glob) {
  if (glob == null) return () => true;
  else if (typeof glob === "string") return matcher(glob);
  else if (Array.isArray(glob)) return matcher(`(${glob.join('|')})`);
  else throw new Error("glob configuration was not a string, Array, or null");
}

function traverse(root, options) {
  const { ignored, glob } = options;

  const matchesGlob = makeMatcher(glob);

  return recursive(root, ignored).then(initialPaths => {
    return initialPaths
      .map(absPath => relative(root, absPath))
      .filter(path => matchesGlob(path));
  })
}

module.exports = traverse;
