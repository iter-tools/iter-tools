'use strict';

const IndexJsGenerator = require('../index-js');
const indexTsFile = require('../_templates/index-ts-file');

class IndexTsGenerator extends IndexJsGenerator {
  afterPathsChanged() {
    const destPath = 'src/index.d.ts';
    this.writeMonolithic(destPath, indexTsFile(this.methods, destPath));
  }
}

module.exports = IndexTsGenerator;
