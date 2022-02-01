'use strict';

const { dirname, join, basename } = require('path');
const babel = require('@babel/core');
const prettier = require('prettier');
const completeExtname = require('path-complete-extname');

const BaseGenerator = require('./base-generator.cjs');

class BaseAsyncGenerator extends BaseGenerator {
  getDestPath(templatePath) {
    const { ASYNC } = this.options;
    const dir = dirname(templatePath);
    const ext = completeExtname(templatePath);
    const base = basename(templatePath, ext);
    const destName = this.getDestName(base, ext);
    return join(dir, ASYNC ? `async-${destName}` : destName);
  }

  getDestName(starMatch, ext) {
    return `${starMatch.slice(1)}${ext}`;
  }

  async map(api, change) {
    const { ASYNC } = this.options;

    await api.generate(this.getDestPath(change.path), async (destPath) => {
      const { code: impl } = await babel.transformFileAsync(change.path, {
        caller: { name: ASYNC ? 'generateAsync' : 'generateSync', ASYNC },
        configFile: this.getBabelConfigPath(),
      });

      return prettier.format(impl, await this.getPrettierOptions(api.resolve(destPath)));
    });
  }

  getBabelConfigPath() {
    return join(__dirname, 'babel.config.cjs');
  }
}

module.exports = BaseAsyncGenerator;
