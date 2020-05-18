'use strict';

const { resolve } = require('path');

const BaseAsyncGenerator = require('../base-async-generator');

const template = require('./template');

class TypeTestGenerator extends BaseAsyncGenerator {
  constructor(macrome, options) {
    super(macrome, options);

    this.glob = 'src/**/__tests__/**/$*.js';
  }

  applyTemplate(source, generatedFrom) {
    return template(source, generatedFrom);
  }

  getBabelConfigPath() {
    return resolve(__dirname, '../$methods/babel.config.js');
  }
}

module.exports = TypeTestGenerator;
