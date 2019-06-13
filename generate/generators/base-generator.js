const prettier = require('prettier');

const Generator = require('../generator');

class BaseGenerator extends Generator {
  constructor(options) {
    super(options);
    this.ignored = [...this.ignored, 'es5', 'es2015', 'es2018', 'coverage'];
  }

  getPrettierOptions(filepath) {
    return {
      filepath,
      ...prettier.resolveConfig.sync(this.resolve(filepath)),
    };
  }
}

module.exports = BaseGenerator;
