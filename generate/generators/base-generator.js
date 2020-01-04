'use strict';

const prettier = require('prettier');
const { Generator } = require('macrome');

class BaseGenerator extends Generator {
  getPrettierOptions(filepath) {
    return {
      filepath,
      ...prettier.resolveConfig.sync(this.resolve(filepath)),
    };
  }
}

module.exports = BaseGenerator;
