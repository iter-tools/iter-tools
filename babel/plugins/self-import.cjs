const { join, normalize, dirname, relative } = require('path');
const { sync: readPkgUp } = require('read-pkg-up');

function pkgname(path) {
  const match = /(^@?[^/]+\/[^/]+|[^/]+)(.*)/.exec(path);
  return match && [match[1], match[2]];
}

const pkg = readPkgUp();
const root = dirname(pkg.path);

module.exports = function () {
  return {
    name: 'babel-plugin-transform-self-import',
    visitor: {
      'Import|ImportDeclaration|ExportNamedDeclaration|ExportAllDeclaration'(path, state) {
        const { source } = path.node;
        const { resolveTo = '' } = state.opts;
        if (source) {
          const [sourcePkg, internalPath] = pkgname(source.value);
          if (sourcePkg !== null && sourcePkg === pkg.packageJson.name) {
            source.value = normalize(
              join(relative(dirname(state.filename), root), resolveTo, internalPath),
            );
          }
        }
      },
    },
  };
};
