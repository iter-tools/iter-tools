'use strict';

const { dirname, basename, join, relative } = require('path');
const babel = require('@babel/core');
const prettier = require('prettier');

const babelConfig = require('./babel.config');

const BaseGenerator = require('../base-generator');
const template = require('../base-template');

class TypeTestsGenerator extends BaseGenerator {
  constructor(macrome, options) {
    super(macrome, options);

    this.glob = 'src/methods/*/__tests__/[^$]*.test.js';
    this.ignored = 'src/methods/*/__tests__/*.deprecated.test.js';
  }

  generatePath(testPath, destPath) {
    const generatedFrom = relative(dirname(destPath), testPath);

    const { code: impl } = babel.transformFileSync(testPath, {
      configFile: this.getBabelConfigPath(),
    });

    const templateOutput = template(impl, generatedFrom);

    return prettier.format(templateOutput, this.getPrettierOptions(destPath));
  }

  getDestPath(testName) {
    const dir = dirname(testName);
    return join(dir, `${basename(testName, '.test.js')}.auto.spec.ts`);
  }
}

module.exports = TypeTestsGenerator;
