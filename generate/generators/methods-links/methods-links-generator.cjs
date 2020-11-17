'use strict';

const { dirname, basename, relative, join, normalize } = require('path');
const completeExtname = require('path-complete-extname');

const BaseGenerator = require('../base-generator.cjs');
const generatedFunctionFile = require('../_templates/generated-function-file.cjs');
const generationErrorFile = require('../_templates/generation-error-file.cjs');

class MethodsLinksGenerator extends BaseGenerator {
  constructor(options) {
    super(options);

    this.glob = ['src/impls/*/[^$]*.{js,d.ts}'];
  }

  getDestPath(implPath) {
    const dir = dirname(implPath);
    const file = basename(implPath);

    return normalize(join(dir, '../../methods', file));
  }

  generatePath(implPath, destPath) {
    let content;
    const generatedFrom = relative(dirname(destPath), implPath);
    const extName = completeExtname(implPath);
    const moduleName = basename(implPath, extName);
    const methodDirName = basename(dirname(implPath));

    const impl = `export { default } from '../impls/${methodDirName}/${moduleName}.js';`;

    try {
      content = generatedFunctionFile(impl, generatedFrom);
    } catch (e) {
      console.warn(`Failed generating ${implPath}`);
      content = generationErrorFile(e, generatedFrom);
    }

    return content;
  }
}

module.exports = MethodsLinksGenerator;
