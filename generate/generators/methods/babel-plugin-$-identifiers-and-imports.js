const rename = require('../../rename');
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

module.exports = function resolveDollarIdentifiersAndImports({ types: t }, { ASYNC }) {
  const visitor = {
    ReferencedIdentifier(path, state) {
      const { node, scope, parentPath } = path;
      const { name } = node;

      if (name.startsWith('$')) {
        const newName = rename(name.slice(1), ASYNC);

        scope.rename(name, newName);

        const binding = scope.getBinding(newName);

        if (!binding) {
          if (parentPath.isTSTypeReference()) {
            node.name = newName;
          }
          return;
        }

        const { specifiers } = binding.path.parentPath.node;

        if (binding.path.isImportSpecifier()) {
          if (specifiers.find(specifier => specifier.imported.name === newName)) {
            binding.path.remove();
          } else {
            binding.path.node.imported.name = newName;
          }
        }
      }
    },

    FunctionDeclaration(path, state) {
      const { name } = path.node.id;

      if (name.startsWith('$')) {
        // Normally we would do this with path.scope.rename
        // Unfortunately rename would turn
        // ```
        //   export function $foo () {}
        //   // into
        //   function asyncFoo () {}
        //   export {asyncFoo as $foo}
        // ```
        // Therefore we must work at a lower level.

        const binding = path.scope.getBinding(name);
        const { scope } = binding;
        const newName = rename(name.slice(1), ASYNC);

        scope.traverse(scope.block, renameVisitor, { name, newName, binding });

        scope.removeOwnBinding(name);
        scope.bindings[newName] = binding;
        binding.identifier.name = newName;
      }
    },

    Identifier(path, state) {
      const { node } = path;
      const { name } = node;

      if (name.startsWith('$') && /\.d\.ts$/.test(state.filename)) {
        // Babel doesn't understand the scope of type definitions.
        // Instead we just rename the symbols where we find them.
        const newName = rename(name.slice(1), ASYNC);

        node.name = newName;
      }
    },

    ImportDeclaration(path, state) {
      const { source } = path.node;
      source.value = renameImport(source.value, ASYNC);
    },

    ExportNamedDeclaration(path, state) {
      const { source, specifiers } = path.node;
      if (source) {
        source.value = renameImport(source.value, ASYNC);

        for (const specifier of specifiers) {
          if (specifier.exported.name.startsWith('$')) {
            specifier.exported.name = rename(specifier.exported.name.slice(1), ASYNC);
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
