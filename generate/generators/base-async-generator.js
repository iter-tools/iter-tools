'use strict';

const { dirname, join, basename } = require('path');
const babel = require('@babel/core');
const completeExtname = require('path-complete-extname');
const { BaseGenerator } = require('./base-generator');

class BaseAsyncGenerator extends BaseGenerator {
  constructor(macrome, options) {
    super(macrome, options);
    this.hasTypes = false;
  }

  get ASYNC() {
    return !!this.options.ASYNC;
  }

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

  generatePath({ ast, path }) {
    const { ASYNC } = this;

    return babel.transformFromAstSync(ast, null, {
      filename: path,
      caller: { name: 'generate', ASYNC, hasTypes: this.hasTypes },
      ast: true,
      code: false,
      configFile: this.getBabelConfigPath(),
    }).ast;
  }

  static getBabelConfig() {
    throw new Error('not implemented');
  }
}

module.exports = BaseAsyncGenerator;
