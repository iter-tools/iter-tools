'use strict';

const fs = require('fs');
const { join } = require('path');
const md5 = require('md5');
const { path: rootDir } = require('package.root');

function mtime(path) {
  return fs.statSync(path).mtimeMs;
}

class FileCache extends Map {
  add(path) {
    if (!this.has(path)) {
      this.set(path, null);
    }
    return this;
  }

  cache(path, content, attributes) {
    return this.set(
      path,
      Object.assign(
        {
          mtime: mtime(join(rootDir, path)),
          md5: md5(content),
        },
        attributes,
      ),
    );
  }

  // Unused. Is there still a use for this?
  wasWrittenExternally(path) {
    if (!this.has(path)) return true;
    const cacheInfo = this.get(path);
    return !cacheInfo || mtime(path) !== cacheInfo.mtime;
  }

  isStale(path, content) {
    if (!this.has(path)) return true;
    const cacheInfo = this.get(path);
    return !cacheInfo || md5(content) !== cacheInfo.md5;
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
