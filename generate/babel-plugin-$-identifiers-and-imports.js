const rename = require('./rename');

module.exports = function resolveDollarIdentifiersAndImports({ types: t }, { ASYNC }) {
  const visitor = {
    ReferencedIdentifier(path, state) {
      const { name } = path.node;
      if (name.startsWith('$')) {
        const newName = rename(name.slice(1), ASYNC);

        path.scope.rename(name, newName);

        const binding = path.scope.getBinding(newName);
        const { specifiers, type } = binding.path.parentPath.node;

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

    ImportDeclaration(path, state) {
      const { source } = path.node;
      source.value = source.value.replace(/(^|.\/)\$([^/]*)$/, ASYNC ? '$1async-$2' : '$1$2')
    },
  };

  return {
    name: '$-identifiers-and-imports',
    visitor,
  };
}
