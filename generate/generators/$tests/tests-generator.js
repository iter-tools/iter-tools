'use strict';

const { resolve } = require('path');

const BaseAsyncGenerator = require('../base-async-generator');

const generatedTestFile = require('../_templates/generated-test-file');

class TypeTestGenerator extends BaseAsyncGenerator {
  constructor(options) {
    super(options);

    this.glob = 'src/**/__tests__/**/$*.js';
  }

  applyTemplate(source, generatedFrom) {
    return generatedTestFile(source, generatedFrom);
  }

  getBabelConfigPath() {
    return resolve(__dirname, '../$methods/babel.config.js');
  }
}

module.exports = TypeTestGenerator;
