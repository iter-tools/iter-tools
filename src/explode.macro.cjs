const { createMacro } = require('babel-plugin-macros');

function decamelize(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

function explodeImports({ references, state, source, babel }) {
  const t = babel.types;
  const { body } = state.file.ast.program;

  const importRefIdx = body.findIndex(
    (node) => t.isImportDeclaration(node) && node.source.value === source,
  );
  const importRef = body[importRefIdx];

  const pkgName = /[^/]+/.exec(importRef.source.value);

  const specsByRemoteName = new Map(importRef.specifiers.map((spec) => [spec.imported.name, spec]));

  const newImports = Object.keys(references).map((remoteName) => {
    const spec = specsByRemoteName.get(remoteName);
    const localName = spec.local.name;
    const localIdent = state.file.path.scope.getBindingIdentifier(localName);
    const __ = remoteName.startsWith('__');
    return t.ImportDeclaration(
      [t.ImportSpecifier(localIdent, spec.imported)],
      t.StringLiteral(
        pkgName +
          '/' +
          (__ ? '__' : '') +
          'methods/' +
          decamelize(__ ? remoteName.slice(2) : remoteName, '-'),
      ),
    );
  });

  body.splice(importRefIdx, 0, ...newImports);
}

module.exports = createMacro(explodeImports);
