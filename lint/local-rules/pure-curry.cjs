const { join, dirname, relative, normalize } = require('path');
const { sync: pkgDir } = require('pkg-dir');

const getImportedName = (v) => v.defs[0].node.imported.name;

const modules = new Map([
  ['src/internal/$iterable', new Set(['$iterableCurry'])],
  ['src/internal/iterable', new Set(['iterableCurry'])],
  ['src/internal/async-iterable', new Set(['asyncIterableCurry'])],
  ['src/internal/curry', new Set(['curry'])],
]);

const root = pkgDir();

module.exports = {
  meta: {
    type: 'problem',

    docs: {
      description: 'require calls to curry to be marked pure',
    },
    fixable: 'code',
    schema: [], // no options
  },
  create: function (context) {
    const dir = dirname(context.getFilename());
    const sourceCode = context.getSourceCode();

    return {
      ImportDeclaration(node) {
        const { source } = node;
        const projectRelativeSource = relative(root, normalize(join(dir, source.value)));
        if (modules.has(projectRelativeSource)) {
          const methods = modules.get(projectRelativeSource);

          const checkedMethods = context
            .getDeclaredVariables(node)
            .filter((v) => methods.has(getImportedName(v)));

          for (const method of checkedMethods) {
            for (const ref of method.references) {
              const comments = sourceCode.getCommentsBefore(ref.identifier);
              if (!comments.length || comments[0].value !== '#__PURE__') {
                context.report({
                  node: ref.identifier,
                  message: 'Call to ' + getImportedName(method) + ' is missing pure annotation',
                  fix(fixer) {
                    return fixer.insertTextBefore(ref.identifier, '/*#__PURE__*/ ');
                  },
                });
              }
            }
          }
        }
      },
    };
  },
};
