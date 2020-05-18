'use strict';

const { Generator, REMOVE } = require('macrome');

const template = require('./template');

class IndexJsGenerator extends Generator {
  constructor(macrome, options) {
    super(macrome, options);

    this.glob = ['src/methods/*/[^$]*.mjs'];
    this.ignored = ['src/methods/*_/**'];

    this.methods = new Set();
  }

  recordChange({ path, operation }) {
    if (operation === REMOVE) {
      this.methods.delete(path);
    } else {
      this.methods.add(path);
    }
  }

  afterPathsChanged() {
    const destPath = 'src/index.mjs';
    this.writeMonolithic(destPath, template(this.methods, destPath));
  }
}

module.exports = IndexJsGenerator;
