'use strict';

const IndexJsGenerator = require('../index-js');
const template = require('./template');

class IndexTsGenerator extends IndexJsGenerator {
  afterPathsChanged() {
    const destPath = 'src/index.d.ts';
    this.writeMonolithic(destPath, template(this.methods, destPath));
  }
}

module.exports = IndexTsGenerator;
