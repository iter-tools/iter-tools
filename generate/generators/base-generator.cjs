'use strict';

const prettier = require('prettier');

class BaseGenerator {
  constructor(options) {
    this.options = options;
  }

  async getPrettierOptions(filepath) {
    return {
      filepath,
      ...(await prettier.resolveConfig(filepath)),
    };
  }
}

module.exports = BaseGenerator;
