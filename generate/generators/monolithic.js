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

    this.writeMonolithic('.gitattributes', gitattributesFile(this.generatedPaths));
    this.writeMonolithic('src/index.mjs', indexFile(this.generatedPaths));
    this.writeMonolithic('src/index.d.ts', typesIndexFile(this.generatedPaths));
  }
}

module.exports = MonoliticGenerator;
