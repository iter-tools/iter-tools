const { basename } = require('path');

const { renameDollar } = require('../../names');

function renameImport(path, ASYNC) {
  return path.replace(/(^|.\/)\$([^/]*)$/, ASYNC ? '$1async-$2' : '$1$2');
}

// Copied w/ minor changes. TODO, see if this can be exposed or reused somehow?
const renameVisitor = {
  ReferencedIdentifier({ node }, state) {
    if (node.name === state.name) {
      node.name = state.newName;
    }
  },

  Scope(path, state) {
    if (!path.scope.bindingIdentifierEquals(state.name, state.binding.identifier)) {
      path.skip();
    }
  },

  'AssignmentExpression|Declaration'(path, state) {
    const ids = path.getOuterBindingIdentifiers();

    for (const name in ids) {
      if (name === state.name) ids[name].name = state.newName;
    }
  },
};

function forceRename(path, name, newName) {
  // A normal path.scope.rename will split
  // ```
  // export function $foo() {}`
  // ```
  // into
  // ```
  // function foo() {}
  // export { foo as $foo }
  // ```
  // This is difficult to reverse. It was easier to separate out
  // the core of the renaming logic.

  const binding = path.scope.getBinding(name);
  const { scope } = binding;

  scope.traverse(scope.block, renameVisitor, { name, newName, binding });

  scope.removeOwnBinding(name);
  scope.bindings[newName] = binding;
  binding.identifier.name = newName;
}

module.exports = function resolveDollarIdentifiersAndImports({ types: t }, { ASYNC }) {
  const visitor = {
    'VariableDeclarator|ClassDeclaration|FunctionDeclaration'(path, state) {
      const { name } = path.node.id;

      if (name && name.startsWith('$')) {
        forceRename(path, name, renameDollar(name, ASYNC));
      }
    },

    Identifier(path, state) {
      const { node } = path;
      const { name } = node;

      if (name.startsWith('$') && /\.d\.ts$/.test(state.filename)) {
        // Babel doesn't understand the scope of type definitions.
        // Instead we just rename the symbols where we find them.
        const newName = renameDollar(name, ASYNC);

        node.name = newName;
      }
    },

    ImportDeclaration(path, state) {
      const { source, specifiers } = path.node;
      source.value = renameImport(source.value, ASYNC);

      if (!ASYNC && basename(source.value).startsWith('async-')) {
        path.remove();
        return;
      }

      const removeSpecifiers = new Set();

      for (const specifier of specifiers) {
        if (t.isImportSpecifier(specifier)) {
          const importedName = specifier.imported.name;
          if (importedName.startsWith('$')) {
            const newName = renameDollar(importedName, ASYNC);

            specifier.imported.name = newName;
          }
        }
      }

      for (const specifier of specifiers) {
        const localName = specifier.local.name;
        if (localName.startsWith('$')) {
          const newName = renameDollar(localName, ASYNC);

          if (t.isImportSpecifier(specifier)) {
            if (
              specifiers.find(
                otherSpecifier =>
                  t.isImportSpecifier(otherSpecifier) &&
                  otherSpecifier.imported.name === specifier.imported.name &&
                  otherSpecifier !== specifier,
              )
            ) {
              removeSpecifiers.add(specifier);
            }
          }
          path.scope.rename(localName, newName);
        }
      }

      path.node.specifiers = specifiers.filter(s => !removeSpecifiers.has(s));
    },

    ExportNamedDeclaration(path, state) {
      const { source, specifiers } = path.node;
      if (source) {
        source.value = renameImport(source.value, ASYNC);

        for (const specifier of specifiers) {
          if (specifier.exported.name.startsWith('$')) {
            specifier.exported.name = renameDollar(specifier.exported.name, ASYNC);
          }
        }
      }
    },
  };

  return {
    name: '$-identifiers-and-imports',
    visitor,
  };
};
