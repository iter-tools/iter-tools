'use strict';

const gitattributesFile = require('./_templates/gitattributes-file');
const indexFile = require('./_templates/index-file');
const typesIndexFile = require('./_templates/types-index-file');

const Generator = require('../generator');

class MonoliticGenerator extends Generator {
  constructor(options) {
    super(options);
    this.ignored = ['**'];
  }

  afterPathsChanged() {
    this.generatedPaths.add('.gitattributes');
    this.generatedPaths.add('src/index.mjs');
    this.generatedPaths.add('src/index.d.ts');
    // It is still highly useful to see that API doc changes show up as they should
    this.generatedPaths.delete('API.md');

    this.writeMonolithic('.gitattributes', gitattributesFile(this.generatedPaths));
    this.writeMonolithic('src/index.mjs', indexFile(this.generatedPaths));
    this.writeMonolithic('src/index.d.ts', typesIndexFile(this.generatedPaths));
  }
}

module.exports = MonoliticGenerator;
