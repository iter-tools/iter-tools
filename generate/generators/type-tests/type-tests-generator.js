'use strict';

const { dirname, basename, join } = require('path');

const { MapAstGenerator } = require('macrome');

class TypeTestsGenerator extends MapAstGenerator {
  constructor(api, options) {
    super(api, options);

    this.files = 'src/methods/*/__tests__/[^$]*.test.js';
    this.excludedFiles = 'src/methods/*/__tests__/*.deprecated.test.js';
  }

  getDestPath(testName) {
    return join(dirname(testName), `${basename(testName, '.test.js')}.auto.spec.ts`);
  }
}

module.exports = TypeTestsGenerator;
