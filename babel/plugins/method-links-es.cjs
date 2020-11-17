const { basename } = require('path');
const camelize = require('camelize');

module.exports = function (babel) {
  const { types: t } = babel;

  function constDeclaration(lVal, rVal) {
    return t.variableDeclaration('const', [t.variableDeclarator(lVal, rVal)]);
  }

  return {
    name: 'methods-get-default-export',
    visitor: {
      ExportNamedDeclaration(path) {
        // do this at the program level instead?
        // Currently we consume our own output, so we can't error if the input is incorrect...
        const { node } = path;
        if (node.source && node.specifiers.length === 1) {
          const specifier = node.specifiers[0];
          const methodName = camelize(basename(node.source.value));
          const importDecl = t.importDeclaration(
            [t.importDefaultSpecifier(t.identifier('_' + methodName))],
            node.source,
          );
          const exportDecl =
            specifier.exported.name !== specifier.local.name
              ? t.exportNamedDeclaration(
                  constDeclaration(
                    t.identifier(methodName),
                    t.memberExpression(t.identifier('_' + methodName), t.identifier('default')),
                  ),
                  [],
                )
              : t.exportDefaultDeclaration(
                  t.memberExpression(t.identifier('_' + methodName), t.identifier('default')),
                );

          path.replaceWithMultiple([importDecl, exportDecl]);
        }
      },
    },
  };
};
