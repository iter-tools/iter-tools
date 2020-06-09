'use strict';

const { dirname, basename, join } = require('path');

const { Generator } = require('macrome');

class TypeTestsGenerator extends Generator {
  constructor(macrome, options) {
    super(macrome, options);

    this.included = 'src/methods/*/__tests__/[^$]*.test.js';
    this.ignored = 'src/methods/*/__tests__/*.deprecated.test.js';
  }

  generatePath({ ast }) {
    return ast;
  }

  getDestPath(testName) {
    return join(dirname(testName), `${basename(testName, '.test.js')}.auto.spec.ts`);
  }
}

module.exports = TypeTestsGenerator;
