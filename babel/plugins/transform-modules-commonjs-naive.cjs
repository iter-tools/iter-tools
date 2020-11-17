module.exports = function (babel) {
  const { types: t } = babel;

  function declarationToExpression(decl) {
    if (t.isFunctionDeclaration(decl)) {
      return t.functionExpression(decl.id, decl.params, decl.body, decl.generator, decl.async);
    } else if (t.isClassDeclaration(decl)) {
      return t.classExpression(decl.id, decl.superClass, decl.body, decl.decorators);
    } else {
      return decl;
    }
  }

  function exportFactory(name, expr) {
    return t.expressionStatement(
      t.assignmentExpression(
        '=',
        t.memberExpression(t.identifier('exports'), t.identifier(name)),
        expr,
      ),
    );
  }

  function requireFactory(source) {
    return t.callExpression(t.identifier('require'), [source]);
  }

  function declarationFactory(lVal, rVal) {
    return t.variableDeclaration('const', [t.variableDeclarator(lVal, rVal)]);
  }

  function specifierToObjectProperty(spec, sourceType) {
    const shorthand = spec.local.name === spec.imported.name;
    return t.objectProperty(shorthand ? spec.local : spec.imported, spec.local, false, shorthand);
  }

  return {
    name: 'naive-import-to-require',
    visitor: {
      ImportDeclaration(path, state) {
        const { sourceType } = state.file.path.node;
        const { source, specifiers } = path.node;

        const req = requireFactory(source);
        const defaultSpecifiers = specifiers.filter(t.isImportDefaultSpecifier);
        const namedSpecifiers = specifiers.filter(t.isImportSpecifier);
        if (defaultSpecifiers.length && namedSpecifiers.length) {
          throw new Error(
            `import default, { named } from '...' cannot be transpiled naievely to commonjs`,
          );
        } else if (defaultSpecifiers.length) {
          const defaultSpecifier = defaultSpecifiers[0];
          if (source.value.startsWith('.')) {
            path.replaceWith(
              declarationFactory(
                t.objectPattern([
                  t.objectProperty(t.identifier('default'), defaultSpecifier.local),
                ]),
                req,
              ),
            );
          } else {
            path.replaceWith(declarationFactory(defaultSpecifier.local, req));
          }
        } else {
          const properties = namedSpecifiers.map((spec) =>
            specifierToObjectProperty(spec, sourceType),
          );
          path.replaceWith(declarationFactory(t.objectPattern(properties), req));
        }
      },

      ExportAllDeclaration(path) {
        throw new Error(`naive transpilation of export * to commonjs is not implemented`);
      },

      ExportNamedDeclaration(path) {
        const { node } = path;
        if (!node.source) {
          if (node.declaration) {
            if (t.isVariableDeclaration(node.declaration)) {
              const { kind } = node.declaration;
              if (kind !== 'const') {
                throw new Error(`export ${kind} cannot be transpiled naievely to commonjs`);
              }
              const { declarations } = node.declaration;
              const exportStmts = declarations.map((decl) => exportFactory(decl.id.name, decl.id));
              path.replaceWithMultiple([node.declaration, ...exportStmts]);
            } else {
              const { id } = node.declaration;
              path.replaceWithMultiple([node.declaration, exportFactory(id.name, id)]);
            }
          } else {
            path.replaceWithMultiple(
              node.specifiers.map((spec) => {
                return exportFactory(spec.exported.name, t.identifier(spec.local.name));
              }),
            );
          }
        } else {
          path.replaceWithMultiple(
            node.specifiers.map((spec) => {
              return exportFactory(
                spec.exported.name,
                t.memberExpression(requireFactory(node.source), t.identifier(spec.local.name)),
              );
            }),
          );
        }
      },

      ExportDefaultDeclaration(path) {
        path.replaceWith(exportFactory('default', declarationToExpression(path.node.declaration)));
      },
    },
  };
};
