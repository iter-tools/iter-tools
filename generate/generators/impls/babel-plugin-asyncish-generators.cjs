const { dirname, relative, join } = require('path');
const { declare } = require('@babel/helper-plugin-utils');
const remapAsyncToGenerator = require('@babel/helper-remap-async-to-generator').default;
const syntaxAsyncGenerators = require('@babel/plugin-syntax-async-generators').default;
const { types: t, template } = require('@babel/core');
const { addNamed: addNamedImport } = require('@babel/helper-module-imports');

const getAsyncishHelpersSource = (file) => {
  const { root, filename } = file.opts;
  return join(relative(dirname(filename), join(root, 'src')), 'internal/asyncish.js');
};

const buildForAwait = template(`
  async function wrapper() {
    let ITERATOR_ABRUPT_COMPLETION = false;
    let ITERATOR_HAD_ERROR_KEY = false;
    let ITERATOR_KEY;
    let ITERATOR_ERROR_KEY;
    try {
      ITERATOR_KEY = GET_ITERATOR(OBJECT);
      for (
        let STEP_KEY, _STEP_KEY;
        (_STEP_KEY = ITERATOR_KEY.next()),
        (ITERATOR_ABRUPT_COMPLETION = !(STEP_KEY = !(_STEP_KEY instanceof Promise) && !(_STEP_KEY.value instanceof Promise) ? _STEP_KEY : await _STEP_KEY).done);
        ITERATOR_ABRUPT_COMPLETION = false
      ) {
      }
    } catch (err) {
      ITERATOR_HAD_ERROR_KEY = true;
      ITERATOR_ERROR_KEY = err;
    } finally {
      try {
        if (ITERATOR_ABRUPT_COMPLETION && ITERATOR_KEY.return != null) {
          await ITERATOR_KEY.return();
        }
      } finally {
        if (ITERATOR_HAD_ERROR_KEY) {
          throw ITERATOR_ERROR_KEY;
        }
      }
    }
  }
`);

function rewriteForAwait(path, { getAsyncIterator }) {
  const { node, scope, parent } = path;

  const stepKey = scope.generateUidIdentifier('step');
  const _stepKey = scope.generateUidIdentifier('_step');
  const stepValue = t.memberExpression(stepKey, t.identifier('value'));
  const left = node.left;
  let declar;

  if (t.isIdentifier(left) || t.isPattern(left) || t.isMemberExpression(left)) {
    // for await (i of test), for await ({ i } of test)
    declar = t.expressionStatement(t.assignmentExpression('=', left, stepValue));
  } else if (t.isVariableDeclaration(left)) {
    // for await (let i of test)
    declar = t.variableDeclaration(left.kind, [
      t.variableDeclarator(left.declarations[0].id, stepValue),
    ]);
  }
  let template = buildForAwait({
    ITERATOR_HAD_ERROR_KEY: scope.generateUidIdentifier('didIteratorError'),
    ITERATOR_ABRUPT_COMPLETION: scope.generateUidIdentifier('iteratorAbruptCompletion'),
    ITERATOR_ERROR_KEY: scope.generateUidIdentifier('iteratorError'),
    ITERATOR_KEY: scope.generateUidIdentifier('iterator'),
    GET_ITERATOR: getAsyncIterator,
    OBJECT: node.right,
    STEP_KEY: t.cloneNode(stepKey),
    _STEP_KEY: t.cloneNode(_stepKey),
  });

  // remove async function wrapper
  // @ts-expect-error todo(flow->ts) improve type annotation for buildForAwait
  template = template.body.body;

  const isLabeledParent = t.isLabeledStatement(parent);
  const tryBody = template[4].block.body;
  const loop = tryBody[1];

  if (isLabeledParent) {
    tryBody[0] = t.labeledStatement(parent.label, loop);
  }

  return {
    replaceParent: isLabeledParent,
    node: template,
    declar,
    loop,
  };
}

module.exports = declare((api) => {
  api.assertVersion(7);

  const yieldStarVisitor = {
    Function(path) {
      path.skip();
    },

    YieldExpression(path, state) {
      const { node } = path;
      if (!node.delegate) return;
      const asyncishSource = getAsyncishHelpersSource(state.file);
      const callee = addNamedImport(path, '_asyncGeneratorDelegate', asyncishSource);
      node.argument = t.callExpression(callee, [
        t.callExpression(addNamedImport(path, '_asyncIterator', asyncishSource), [node.argument]),
        addNamedImport(path, '_awaitAsyncGenerator', asyncishSource),
      ]);
    },
  };

  const forAwaitVisitor = {
    Function(path) {
      path.skip();
    },

    ForOfStatement(path, { file }) {
      const { node } = path;
      if (!node.await) return;

      const build = rewriteForAwait(path, {
        getAsyncIterator: addNamedImport(path, '_asyncIterator', getAsyncishHelpersSource(file)),
      });

      const { declar, loop } = build;
      const block = loop.body;

      // ensure that it's a block so we can take all its statements
      path.ensureBlock();

      // add the value declaration to the new loop body
      if (declar) {
        block.body.push(declar);
      }

      // push the rest of the original loop body onto our new body
      block.body.push(...node.body.body);

      t.inherits(loop, node);
      t.inherits(loop.body, node.body);

      if (build.replaceParent) {
        path.parentPath.replaceWithMultiple(build.node);
      } else {
        path.replaceWithMultiple(build.node);
      }
    },
  };

  const visitor = {
    Function(path, state) {
      if (!path.node.async) return;

      path.traverse(forAwaitVisitor, state);

      if (!path.node.generator) return;

      path.traverse(yieldStarVisitor, state);

      // We don't need to pass the noNewArrows assumption, since
      // async generators are never arrow functions.
      const asyncishSource = getAsyncishHelpersSource(state.file);
      remapAsyncToGenerator(path, {
        wrapAsync: addNamedImport(path, '_wrapAsyncGenerator', asyncishSource),
        wrapAwait: addNamedImport(path, '_awaitAsyncGenerator', asyncishSource),
      });
    },
  };

  return {
    name: 'asyncish-generator-functions',
    inherits: syntaxAsyncGenerators.default,

    visitor: {
      Program(path, state) {
        // We need to traverse the ast here (instead of just vising Function
        // in the top level visitor) because for-await needs to run before the
        // async-to-generator plugin. This is because for-await is transpiled
        // using "await" expressions, which are then converted to "yield".
        //
        // This is bad for performance, but plugin ordering will allow as to
        // directly visit Function in the top level visitor.
        path.traverse(visitor, state);
      },
    },
  };
});
