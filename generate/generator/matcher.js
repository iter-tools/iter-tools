const { matcher: mmMatcher } = require('micromatch');
const { relative } = require('path');
const { path: rootDir } = require('package.root');

function matcher(glob) {
  let isMatch;
  if (glob == null) return () => true;
  else if (typeof glob === 'string') isMatch = mmMatcher(glob);
  else if (Array.isArray(glob)) isMatch = mmMatcher(`(${glob.join('|')})`);
  else throw new Error('glob configuration was not a string, Array, or null');

  return path => isMatch(relative(rootDir, path));
}

module.exports = { matcher };
