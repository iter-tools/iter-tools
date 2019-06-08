const fs = require('fs');
const { join } = require('path');

const { argv } = require('./argv');

function mtime(path) {
  return fs.statSync(path).mtimeMs;
}

class FileCache extends Map {
  constructor(rootDir) {
    super();
    this.rootDir = rootDir;
  }

  add (path) {
    return this.set(path, null);
  }

  cache(path, attributes) {
    return this.set(path, {
      mtime: mtime(join(this.rootDir, path)),
      ...attributes
    });
  }

  isStale(path) {
    if (!this.has(path)) return false;
    const cacheInfo = this.get(path);
    return !cacheInfo || (mtime(path) !== cacheInfo.mtime);
  }

  getAttribute(path, attribute, defaultValue = null) {
    const cacheInfo = this.get(path);
    return cacheInfo ? cacheInfo[attribute] : defaultValue;
  }

  [Symbol.iterator]() {
    return this.keys();
  }
}

module.exports = FileCache;
