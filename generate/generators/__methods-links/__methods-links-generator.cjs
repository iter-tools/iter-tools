'use strict';

const fs = require('fs');
const { dirname, basename, relative, join, normalize } = require('path');
const babel = require('@babel/core');
const completeExtname = require('path-complete-extname');

const BaseGenerator = require('../base-generator.cjs');
const generatedFunctionFile = require('../_templates/generated-function-file.cjs');
const generationErrorFile = require('../_templates/generation-error-file.cjs');

const __nameFromDeclaration = (decl) => {
  const { id } = decl;
  if (id && id.name.startsWith('__')) {
    return id.name;
  }
  return null;
};

class __MethodsLinksGenerator extends BaseGenerator {
  constructor(options) {
    super(options);

    this.glob = ['src/impls/*/[^$]*.js'];
  }

  getDestPath(implPath) {
    const dir = dirname(implPath);
    const file = basename(implPath);

    return normalize(join(dir, '../../__methods', file));
  }

  generatePath(implPath, destPath) {
    let content;
    const source = babel.parseSync(fs.readFileSync(implPath, 'utf8'));

    let __name = null;
    for (const node of source.program.body) {
      if (node.type === 'ExportNamedDeclaration') {
        if (node.declaration) {
          __name = __name || __nameFromDeclaration(node.declaration);
        } else if (node.declarations) {
          for (const declaration of node.declarations) {
            __name = __name || __nameFromDeclaration(declaration.declaration);
          }
        }
      }
    }

    if (!__name) return null;

    const generatedFrom = relative(dirname(destPath), implPath);
    const extName = completeExtname(implPath);
    const moduleName = basename(implPath, extName);
    const methodDirName = basename(dirname(implPath));

    const impl = `export { ${__name} as default } from '../impls/${methodDirName}/${moduleName}.js';`;

    try {
      content = generatedFunctionFile(impl, generatedFrom);
    } catch (e) {
      console.warn(`Failed generating ${implPath}`);
      content = generationErrorFile(e, generatedFrom);
    }

    return content;
  }
}

module.exports = __MethodsLinksGenerator;
