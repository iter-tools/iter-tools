const { createMacro } = require('babel-plugin-macros');
const { expression } = require('@babel/template');
const rename = require('./rename');

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
 *                                if ($isAsync) {}
 *       if (false) {}                 <--->                  if (true) {}
 *
 *                                $isAsync ? x : y
 *       false ? x : y                 <--->                  true ? x : y
 *
 *
 * Note that conditional expressions with fixed conditions (such as the last two examples)
 * will be further simplified by the dead code elimination babel plugin
 *
 * To read more about babel macros, take a look at their docs:
 * https://github.com/kentcdodds/babel-plugin-macros
 */

function asyncMacro({ references, babel, config: { ASYNC } }) {
  const t = babel.types;

  for (const reference of references.$isAsync || []) {
    reference.replaceWith(t.booleanLiteral(!!ASYNC));
  }

  for (const reference of references.$iteratorSymbol || []) {
    const { ast } = expression;
    reference.replaceWith(ASYNC ? ast`Symbol.asyncIterator` : ast`Symbol.iterator`);
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
        } else if (refName === '$async' && t.isExportNamedDeclaration(nextStatement) && t.isFunctionDeclaration(nextStatement.declaration)) {
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
      case 'TaggedTemplateExpression':
        // $async`fnName`

        if (refName === '$async') {
          const { quasi } = reference.parentPath.node;
          if (!quasi.quasis.length === 1) {
            throw new Error('Interpolation not supported for $async`fnName`');
          }
          const name = quasi.quasis[0].value.raw;
          reference.parentPath.replaceWith(t.stringLiteral(rename(name, ASYNC)));
        } else {
          throw new Error(`${refName} cannot be used as a template tag`);
        }
        break;
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
