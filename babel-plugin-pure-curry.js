const path = require('path');

const { dirname, relative, join } = path;

function relativePathTo(state, projectRelativePath) {
  return './' + relative(dirname(state.filename), join(state.cwd, projectRelativePath));
}

module.exports = function markFunctionCurryingPure({ types: t }) {
  let pathToInternalIterable;
  let pathToInternalAsyncIterable;
  let pathToInternalCurry;

  const visitor = {
    Program(path, state) {
      pathToInternalIterable = relativePathTo(state, 'src/internal/iterable');
      pathToInternalAsyncIterable = relativePathTo(state, 'src/internal/async-iterable');
      pathToInternalCurry = relativePathTo(state, 'src/internal/curry');
    },
    ReferencedIdentifier(path, state) {
      if (
        path.referencesImport(pathToInternalIterable, 'iterableCurry') ||
        path.referencesImport(pathToInternalAsyncIterable, 'asyncIterableCurry') ||
        path.referencesImport(pathToInternalCurry, 'curry')
      ) {
        path.node.leadingComments = [
          {
            type: 'CommentBlock',
            value: '#__PURE__',
          },
        ];
      }
    },
  };
  return {
    name: 'mark-function-currying-pure',
    visitor,
  };
};
