const rename = require('../../rename');

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
        const newName = rename(name.slice(1), ASYNC);

        path.scope.rename(name, newName);
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
      source.value = source.value.replace(/(^|.\/)\$([^/]*)$/, ASYNC ? '$1async-$2' : '$1$2');
    },
  };

  return {
    name: '$-identifiers-and-imports',
    visitor,
  };
};
