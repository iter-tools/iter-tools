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
              t.memberExpression(t.identifier('module'), t.identifier('exports')),
              t.memberExpression(requireFactory(path.node.source), t.identifier('default')),
            ),
          ),
        );
      },
    },
  };
};
