const { createMacro } = require('babel-plugin-macros');
const { expression } = require('@babel/template');
const { rename } = require('./names');

/**
 * This is a babel macro which you can import the following symbols:
 *
 * import { $iteratorSymbol, $isAsync, $async, $await } from "path/to/async.macro"
 *
 * When you import and use these symbols in accordance with the examples below, they are
 * replaced with one of two variants depending on whether the ASYNC environment variable is
 * defined at compile time.
 *
 *
 *           SYNC                    TEMPLATE                    ASYNC
 *                             $async(function() {})
 *       function() {}                 <--->               async function() {}
 *
 *                           $async; function fn() {}
 *     function fn() {}                <--->              async function fn() {}
 *
 *                                   $async`fn`
 *           'fn'                      <--->                   'asyncFn'
 *
 *
 *     class Class() {            class Class() {           class Class() {
 *                                   @$async
 *                                   method() {}
 *        method() {}                  <--->                  async method() {}
 *     }                          }                         }
 *
 *
 *                             $await(anyExpression)
 *       anyExpression                 <--->               await anyExpression
 *
 *                      $await; for(const foo of iterable) {}
 * for(const foo of iterable) {}       <--->       for await(const foo of iterable) {}
 *
 *                                    $isAsync
 *           false                     <--->                       true
 *
 *                                    $isSync
 *           true                      <--->                       false
 *
 *                             $Promise<typeExpression>
 *       typeExpression                                   Promise<typeExpression>
 *
 * Note that conditional expressions with fixed conditions (such as the last two examples)
 * will be further simplified by the dead code elimination babel plugin
 *
 * To read more about babel macros, take a look at their docs:
 * https://github.com/kentcdodds/babel-plugin-macros
 */

const { ast } = expression;

function asyncMacro({ references, babel, state, config: { ASYNC, hasTypes } }) {
  const t = babel.types;

  for (const reference of references.$isAsync || []) {
    reference.replaceWith(t.booleanLiteral(!!ASYNC));
  }

  for (const reference of references.$isSync || []) {
    reference.replaceWith(t.booleanLiteral(!ASYNC));
  }

  for (const reference of references.$iteratorSymbol || []) {
    reference.replaceWith(ASYNC ? ast`Symbol.asyncIterator` : ast`Symbol.iterator`);
  }

  for (const reference of [].concat(references.$Promise || [], references.$MaybePromise || [])) {
    const { parentPath, parent, node } = reference;
    const { name } = node;
    if (t.isTSTypeReference(parent)) {
      const promisedType = parent.typeParameters.params[0];
      if (ASYNC) {
        node.name = 'Promise';
        if (name === '$MaybePromise') {
          parentPath.replaceWith(t.TSUnionType([promisedType, parent]));
        }
      } else {
        parentPath.replaceWith(promisedType);
      }
    }
  }

  if (hasTypes) {
    // Unfortunately typescript types lack scope in babel, so we do this the brute force way
    babel.traverse(state.file.ast.program, {
      Identifier(path) {
        const { parentPath, parent, node } = path;
        const { name } = node;
        if (t.isTSTypeReference(parent)) {
          if (name === '$Promise' || name === '$MaybePromise') {
            if (!references[name]) {
              throw new Error(`Encountered ${name} but ${name} was not imported from async.macro`);
            }
            const promisedType = parent.typeParameters.params[0];
            if (ASYNC) {
              node.name = 'Promise';
              if (name === '$MaybePromise') {
                parentPath.replaceWith(t.TSUnionType([promisedType, parent]));
              }
            } else {
              parentPath.replaceWith(promisedType);
            }
          }
        }
      },
    });
  }

  for (const reference of references.$ || []) {
    const { node } = reference.parentPath;

    if (node.type === 'TaggedTemplateExpression') {
      // $`fnName`
      const { quasi } = reference.parentPath.node;
      if (!quasi.quasis.length === 1) {
        throw new Error('Interpolation not supported for $`fnName`');
      }
      const name = quasi.quasis[0].value.raw;
      reference.parentPath.replaceWith(t.stringLiteral(rename(name, ASYNC)));
    }
  }

  for (const reference of [].concat(references.$async || [], references.$await || [])) {
    const { node, parent } = reference.parentPath;
    const refName = reference.node.name;

    switch (node.type) {
      case 'ExpressionStatement': {
        const nextStatement = getNextStatement(reference);

        if (refName === '$async' && t.isFunctionDeclaration(nextStatement)) {
          // $async; function foo() {}
          if (ASYNC) nextStatement.async = true;
        } else if (
          refName === '$async' &&
          t.isExportNamedDeclaration(nextStatement) &&
          t.isFunctionDeclaration(nextStatement.declaration)
        ) {
          // $async; export function foo() {}
          if (ASYNC) nextStatement.declaration.async = true;
        } else if (refName === '$await' && t.isForOfStatement(nextStatement)) {
          // $await; for { const foo of bar }
          if (ASYNC) nextStatement.await = true;
        }

        reference.remove();
        break;
      }
      case 'CallExpression': {
        let argument = getOnlyArgument(reference, refName);

        if (
          refName === '$async' &&
          (t.isFunctionExpression(argument) || t.isArrowFunctionExpression(argument))
        ) {
          // $async(function() {})
          // $async(() => {})

          if (ASYNC) {
            argument.async = true;
          }
        } else if (refName === '$await') {
          // $await(someExpression)

          if (ASYNC) {
            argument = t.awaitExpression(argument);
          }
        }

        reference.parentPath.replaceWith(argument);
        break;
      }
      case 'Decorator':
        // class {
        //   @$async
        //   method() {}
        // }

        if (t.isClassMethod(parent)) {
          if (ASYNC) {
            parent.async = true;
          }
          parent.decorators = parent.decorators.filter(dec => dec !== node);
        }
        break;
    }
  }
}

function getNextStatement(reference) {
  const { container } = reference.parentPath;
  const parentNode = reference.parent;
  const loopIdx = container.findIndex(node => node === parentNode) + 1;
  return container[loopIdx];
}

function getOnlyArgument(reference, refName) {
  const { arguments: args } = reference.parent;

  if (args.length !== 1) {
    throw new Error(`The ${refName}() macro takes exactly one argument`);
  }

  return args[0];
}

module.exports = createMacro(asyncMacro, { configName: 'async' });
