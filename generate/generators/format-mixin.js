'use strict';

const prettier = require('prettier');

const FormatMixin = Base =>
  class extends Base {
    write(path, content) {
      this.macrome.write(
        path,
        prettier.format(content.toString(), {
          filepath: path,
          ...prettier.resolveConfig.sync(this.resolve(path)),
        }),
      );
    }
  };

module.exports = { FormatMixin };
