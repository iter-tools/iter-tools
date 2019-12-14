'use strict';

const { matcher: mmMatcher } = require('micromatch');
const { relative } = require('path');
const pkgDir = require('pkg-dir');

const rootDir = pkgDir.sync(__dirname);

function matcher(glob) {
  let isMatch;
  if (glob == null) return () => true;
  else if (typeof glob === 'string') isMatch = mmMatcher(glob);
  else if (Array.isArray(glob)) isMatch = mmMatcher(`(${glob.join('|')})`);
  else throw new Error('glob configuration was not a string, Array, or null');

  return path => isMatch(relative(rootDir, path));
}

module.exports = { matcher };
