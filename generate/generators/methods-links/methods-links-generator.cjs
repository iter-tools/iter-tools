'use strict';

const { dirname, basename, join, normalize } = require('path');
const completeExtname = require('path-complete-extname');

const BaseGenerator = require('../base-generator.cjs');
const { camelize } = require('../../names.cjs');

class MethodsLinksGenerator extends BaseGenerator {
  constructor(options) {
    super(options);

    this.include = ['src/impls/*/[^$]*.{js,d.ts}'];
  }

  getDestPath(implPath) {
    const dir = dirname(implPath);
    const file = basename(implPath);

    return normalize(join(dir, '../../methods', file));
  }

  async map(api, change) {
    const { path } = change;

    await api.generate(this.getDestPath(path), async () => {
      const extName = completeExtname(path);
      const moduleName = basename(path, extName);
      const methodDirName = basename(dirname(path));

      return `export { ${camelize(
        moduleName,
      )} as default } from '../impls/${methodDirName}/${moduleName}${
        extName === '.js' ? '.js' : ''
      }';\n`;
    });
  }
}

module.exports = MethodsLinksGenerator;
