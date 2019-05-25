module.exports = function resolveAImportPaths({ types: t }, { ASYNC }) {
  const visitor = {
    ImportDeclaration(path, state) {
      const { source } = path.node;
      source.value = source.value.replace(/(^|.\/)\$([^/]*)$/, ASYNC ? '$1async-$2' : '$1$2')
    },
  };

  return {
    name: 'resolve-$-import-paths',
    visitor,
  };
}
