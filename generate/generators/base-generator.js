'use strict';

const prettier = require('prettier');
const { Generator } = require('macrome');

class BaseGenerator extends Generator {
  write(path, content) {
    this.macrome.write(
      path,
      prettier.format(content.toString(), {
        filepath: path,
        ...prettier.resolveConfig.sync(this.resolve(path)),
      }),
    );
  }
}

module.exports = { BaseGenerator };
