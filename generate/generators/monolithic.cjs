'use strict';

const gitattributesFile = require('./_templates/gitattributes-file.cjs');
const indexFile = require('./_templates/index-file.cjs');
const typesIndexFile = require('./_templates/types-index-file.cjs');

const Generator = require('../generator/index.cjs');

class MonoliticGenerator extends Generator {
  constructor(options) {
    super(options);
    this.ignored = ['**'];
  }

  afterPathsChanged() {
    this.generatedPaths.add('.gitattributes');
    this.generatedPaths.add('src/index.js');
    this.generatedPaths.add('src/index.d.ts');
    // It is still highly useful to see that API doc changes show up as they should
    this.generatedPaths.delete('API.md');

    this.writeMonolithic('.gitattributes', gitattributesFile(this.generatedPaths));
    this.writeMonolithic('src/index.js', indexFile(this.generatedPaths));
    this.writeMonolithic('src/index.d.ts', typesIndexFile(this.generatedPaths));
  }
}

module.exports = MonoliticGenerator;
