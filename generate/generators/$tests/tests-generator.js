'use strict';

const { resolve } = require('path');

const BaseAsyncGenerator = require('../base-async-generator');

class TypeTestGenerator extends BaseAsyncGenerator {
  constructor(api, options) {
    super(api, options);

    this.files = 'src/**/__tests__/**/$*.js';

    this.hasTypes = true;
  }

  getBabelConfigPath() {
    return resolve(__dirname, '../$methods/babel.config.js');
  }
}

module.exports = TypeTestGenerator;
