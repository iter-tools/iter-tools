'use strict';

const { dirname, relative, join, basename } = require('path');
const babel = require('@babel/core');
const prettier = require('prettier');
const completeExtname = require('path-complete-extname');

const BaseGenerator = require('./base-generator');
const baseTemplate = require('./base-template');

class BaseAsyncGenerator extends BaseGenerator {
  getDestPath(templatePath) {
    const dir = dirname(templatePath);
    const ext = completeExtname(templatePath);
    const base = basename(templatePath, ext);
    const destName = this.getDestName(base, ext);
    return join(dir, this.ASYNC ? `async-${destName}` : destName);
  }

  getDestName(starMatch, ext) {
    return `${starMatch.slice(1)}${ext}`;
  }

  generatePath(templatePath, destPath) {
    const { ASYNC } = this.options;

    const { code: impl } = babel.transformFileSync(this.resolve(templatePath), {
      caller: { name: ASYNC ? 'generateAsync' : 'generateSync', ASYNC },
      configFile: this.getBabelConfigPath(),
    });

    const templateOutput = this.applyTemplate(impl);

    return prettier.format(templateOutput, this.getPrettierOptions(destPath));
  }

  applyTemplate(source) {
    return baseTemplate(source);
  }

  static getBabelConfig() {
    throw new Error('not implemented');
  }
}

module.exports = BaseAsyncGenerator;
