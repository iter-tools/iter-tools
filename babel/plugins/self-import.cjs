const { join, normalize, dirname, relative } = require('path');
const { sync: readPkgUp } = require('read-pkg-up');

function pkgname(path) {
  const match = /(^@?[^/]+\/[^/]+|[^/]+)(.*)/.exec(path);
  return match && [match[1], match[2]];
}

const pkg = readPkgUp({ normalize: false });
const root = dirname(pkg.path);

function getSourcePath(source, state) {
  const { resolveTo = '' } = state.opts;
  const [sourcePkg, internalPath] = pkgname(source);

  if (sourcePkg !== null && sourcePkg === pkg.packageJson.name) {
    return normalize(join(relative(dirname(state.filename), root), resolveTo, internalPath));
  } else {
    return source;
  }
}

module.exports = function () {
  return {
    name: 'babel-plugin-transform-self-import',
    visitor: {
      CallExpression(path, state) {
        const { callee } = path.node;
        // good enough for now
        if (callee.name === 'require') {
          path.node.arguments[0].value = getSourcePath(path.node.arguments[0].value, state);
        }
      },
      'Import|ImportDeclaration|ExportNamedDeclaration|ExportAllDeclaration'(path, state) {
        const { source } = path.node;
        if (source) {
          source.value = getSourcePath(source.value, state);
        }
      },
    },
  };
};
