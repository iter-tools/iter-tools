'use strict';

const { dirname, relative, join, basename } = require('path');
const babel = require('@babel/core');
const prettier = require('prettier');
const completeExtname = require('path-complete-extname');

const generatedFunctionFile = require('./_templates/generated-function-file');
const generationErrorFile = require('./_templates/generation-error-file');

const BaseGenerator = require('./base-generator');

class BaseAsyncGenerator extends BaseGenerator {
  constructor(options) {
    super(options);

    this.configurations = [{ ASYNC: true }, { ASYNC: false }];
  }

  getDestPath(templatePath, { ASYNC }) {
    const dir = dirname(templatePath);
    const ext = completeExtname(templatePath);
    const base = basename(templatePath, ext);
    const destName = this.getDestName(base, ext);
    return join(dir, ASYNC ? `async-${destName}` : destName);
  }

  getDestName(starMatch, ext) {
    throw new Error('getDestName must be implemented');
  }

  generatePath(templatePath, destPath, { ASYNC }) {
    let content;
    const generatedFrom = relative(dirname(destPath), templatePath);

    try {
      const { code: impl } = babel.transformFileSync(templatePath, {
        caller: { name: ASYNC ? 'generateAsync' : 'generateSync', ASYNC },
        configFile: this.getBabelConfigPath(),
      });

      const templateOutput = this.applyTemplate(impl, generatedFrom);

      content = prettier.format(templateOutput, this.getPrettierOptions(destPath));
    } catch (e) {
      console.warn(`Failed generating ${templatePath}`);
      content = this.applyErrorTemplate(e, generatedFrom);
    }

    return content;
  }

  applyTemplate(source, generatedFrom) {
    return generatedFunctionFile(source, generatedFrom);
  }

  applyErrorTemplate(error, generatedFrom) {
    return generationErrorFile(error, generatedFrom);
  }

  getBabelConfigPath() {
    return join(__dirname, 'babel.config.js');
  }
}

module.exports = BaseAsyncGenerator;
