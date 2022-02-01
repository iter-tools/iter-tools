'use strict';

const { dirname, basename, join, normalize } = require('path');
const babel = require('@babel/core');
const completeExtname = require('path-complete-extname');

const BaseGenerator = require('../base-generator.cjs');

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

    this.include = ['src/impls/*/[^$]*.js'];
  }

  getDestPath(implPath) {
    const dir = dirname(implPath);
    const file = basename(implPath);

    return normalize(join(dir, '../../__methods', file));
  }

  async map(api, change) {
    await api.generate(this.getDestPath(change.path), async () => {
      const source = await babel.parseAsync(await api.read(change.path));

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

      const extName = completeExtname(change.path);
      const moduleName = basename(change.path, extName);
      const methodDirName = basename(dirname(change.path));

      return `export { ${__name} as default } from '../impls/${methodDirName}/${moduleName}.js';\n`;
    });
  }
}

module.exports = __MethodsLinksGenerator;
