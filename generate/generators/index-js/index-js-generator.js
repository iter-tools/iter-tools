'use strict';

const { Generator, REMOVE } = require('macrome');

const indexJsFile = require('../_templates/index-js-file');

class IndexJsGenerator extends Generator {
  constructor() {
    super();

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
    this.writeMonolithic(destPath, indexJsFile(this.methods, destPath));
  }
}

module.exports = IndexJsGenerator;
