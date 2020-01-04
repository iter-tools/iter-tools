'use strict';

const { Generator } = require('macrome');

const gitattributesFile = require('./_templates/gitattributes-file');

class MonoliticGenerator extends Generator {
  constructor() {
    super();
    this.ignored = ['**'];
  }

  afterPathsChanged() {
    this.generatedPaths.add('.gitattributes');
    // It is still highly useful to see that API doc changes show up as they should
    this.generatedPaths.delete('API.md');

    this.writeMonolithic('.gitattributes', gitattributesFile(this.generatedPaths));
  }
}

module.exports = MonoliticGenerator;
