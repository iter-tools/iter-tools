const { dirname, relative, join } = require('path');

const BaseGenerator = require('../base-generator');

class MethodsLinksGenerator extends BaseGenerator {
  constructor(options) {
    super(options);

    this.glob = ['src/**/$*.js'];
    this.ignored = [...this.ignored, '**/__*__/**'];
  }

  getDestPath(templatePath, { ASYNC }) {
    const dir = dirname(templatePath);
    const { base, ext } = parseFileName(templatePath);
    const destName = this.getDestName(base, ext);
    return join(dir, ASYNC ? `async-${destName}` : destName);
  }

  getDestName(starMatch, ext) {
    throw new Error('getDestName must be implemented');
  }

  generatePath(templatePath, destPath, { ASYNC }) {
    let content;
    let generatedFrom = relative(dirname(destPath), templatePath);

    const impl = `import { default as  } from './methods/'`

    try {
      content = this.applyTemplate(impl, generatedFrom);
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

  afterPathsChanged() {
    this.generatedPaths.add('.gitattributes');

    this.writeMonolithic('.gitattributes', gitattributesFile(this.generatedPaths));
  }
}

export default MethodsLinksGenerator;
