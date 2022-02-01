'use strict';

const { resolve } = require('path');

const BaseAsyncGenerator = require('../base-async-generator.cjs');

class TypesGenerator extends BaseAsyncGenerator {
  constructor(options) {
    super(options);

    this.include = ['src/**/$*.d.ts', 'src/**/__tests__/$*.spec.ts'];
  }

  getDestName(basename, ext) {
    return `${basename.slice(1)}${ext}`;
  }

  getBabelConfigPath() {
    return resolve(__dirname, '../impls/babel.config.cjs');
  }
}

module.exports = TypesGenerator;
