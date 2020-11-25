'use strict';

const fs = require('fs');
const { dirname, basename, join, relative, resolve } = require('path');
const babel = require('@babel/core');
const prettier = require('prettier');

const BaseGenerator = require('../base-generator');
const generatedFunctionFile = require('../_templates/generated-function-file');
const generationErrorFile = require('../_templates/generation-error-file');

class TypeTestsGenerator extends BaseGenerator {
  constructor(options) {
    super(options);

    this.glob = 'src/methods/*/__tests__/[^$]*.test.js';
    this.ignored = 'src/methods/*/__tests__/*.deprecated.test.js';
  }

  generatePath(testPath, destPath) {
    let content;
    const generatedFrom = relative(dirname(destPath), testPath);
    try {
      let file = fs.readFileSync(testPath, 'utf8');

      // We will need a more generic way of handling this in the future.
      if (file.startsWith('/**\n * @generated')) {
        file = file.split('\n').slice(7).join('\n');
      }

      const { code: impl } = babel.transformSync(file, {
        filename: testPath,
        configFile: this.getBabelConfigPath(),
      });

      const templateOutput = generatedFunctionFile(impl, generatedFrom);

      content = prettier.format(templateOutput, this.getPrettierOptions(destPath));
    } catch (e) {
      console.warn(`Failed generating ${testPath}`);
      content = generationErrorFile(e, generatedFrom);
    }
    return content;
  }

  getDestPath(testName) {
    const dir = dirname(testName);
    return join(dir, `${basename(testName, '.test.js')}.auto.spec.ts`);
  }

  getBabelConfigPath() {
    return resolve(__dirname, 'babel.config.js');
  }
}

module.exports = TypeTestsGenerator;
