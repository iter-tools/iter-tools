'use strict';

const { resolve } = require('path');

const BaseAsyncGenerator = require('../base-async-generator.cjs');

class ImplsGenerator extends BaseAsyncGenerator {
  constructor(options) {
    super(options);

    this.include = ['src/**/$*.{js,ts}'];
  }

  getDestName(basename, extname) {
    return `${basename.slice(1)}${extname}`;
  }

  getBabelConfigPath() {
    return resolve(__dirname, 'babel.config.cjs');
  }
}

module.exports = ImplsGenerator;
