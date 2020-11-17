module.exports = function (babel) {
  const { types: t } = babel;

  function requireFactory(source) {
    return t.callExpression(t.identifier('require'), [source]);
  }

  return {
    name: 'methods-links-commonjs',
    visitor: {
      ExportNamedDeclaration(path) {
        path.replaceWith(
          t.expressionStatement(
            t.assignmentExpression(
              '=',
              t.memberExpression(
                t.identifier('exports'),
                t.identifier(path.node.specifiers[0].exported.name),
              ),
              requireFactory(path.node.source),
            ),
          ),
        );
      },
    },
  };
};
