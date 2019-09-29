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
  }

  generatePath(testPath, destPath) {
    let content;
    let generatedFrom = relative(dirname(destPath), testPath);
    try {
      const { code: impl } = babel.transformFileSync(testPath, {
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
