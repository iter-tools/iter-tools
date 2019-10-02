'use strict';

const { resolve } = require('path');

const BaseAsyncGenerator = require('../base-async-generator');

class TypesGenerator extends BaseAsyncGenerator {
  constructor(options) {
    super(options);

    this.glob = ['src/**/$*.d.ts', 'src/**/__tests__/$*.spec.ts'];
  }

  getDestName(basename, ext) {
    return `${basename.slice(1)}${ext}`;
  }

  getBabelConfigPath() {
    return resolve(__dirname, '../methods/babel.config.js');
  }
}

module.exports = TypesGenerator;
