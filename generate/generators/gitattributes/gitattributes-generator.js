'use strict';

const { Generator } = require('macrome');

const template = require('./template');

class MonolithicGenerator extends Generator {
  constructor(macrome, options) {
    super(macrome, options);
    this.ignored = ['**'];
  }

  afterPathsChanged() {
    this.generatedPaths.add('.gitattributes');
    // It is still highly useful to see that API doc changes show up as they should
    this.generatedPaths.delete('API.md');

    this.writeMonolithic(
      '.gitattributes',
      this.decorate(template(this.generatedPaths), { generated: null }),
    );
  }
}

module.exports = MonolithicGenerator;
