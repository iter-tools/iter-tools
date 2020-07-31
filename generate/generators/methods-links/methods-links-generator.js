'use strict';

const { dirname, basename, join, normalize } = require('path');
const camelcase = require('camelcase');
const completeExtname = require('path-complete-extname');
const { MapAstGenerator } = require('macrome');

class MethodsLinksGenerator extends MapAstGenerator {
  constructor(api, options) {
    super(api, options);

    this.files = ['src/methods/*/[^$]*.{mjs,d.ts}'];
    this.excludedFiles = ['src/methods/*_/**'];
  }

  getDestPath(path) {
    const dir = dirname(path);
    const file = basename(path);

    return normalize(join(dir, '../..', file));
  }

  map({ path }) {
    const destPath = this.getDestPath(path);
    const extName = completeExtname(path);
    const moduleName = basename(path, extName);
    const methodName = camelcase(basename(path, extName));
    const methodDirName = basename(dirname(path));

    const impl = `import ${methodName} from './methods/${methodDirName}/${moduleName}';\n\nexport default ${methodName};\n`;
    const ast = this.parse(impl);

    this.decorate(ast, this.getAnnotations(destPath, path));

    this.write(destPath, this.print(ast).code);
  }
}

module.exports = MethodsLinksGenerator;
