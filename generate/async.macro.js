const { createMacro } = require('babel-plugin-macros');
const { expression } = require('@babel/template');
const { rename } = require('./names');
const { concat, getNextStatement, getOnlyArgument } = require('./macro-utils');

/**
 * This is a babel macro. Import and use these symbols in accordance with the examples below.
 * They are replaced with one of two variants depending on whether the ASYNC environment
 * variable is defined at compile time.
 *
 *           SYNC                    TEMPLATE                    ASYNC
 *
 *                             $async(function() {})
 *       function() {}                 <--->               async function() {}
 *
 *
 *                           $async; function fn() {}
 *     function fn() {}                <--->              async function fn() {}
 *
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
 *
 *                      $await; for(const foo of iterable) {}
 * for(const foo of iterable) {}       <--->       for await(const foo of iterable) {}
 *
 *
 *                                    $isAsync
 *           false                     <--->                       true
 *
 *
 *                                    $isSync
 *           true                      <--->                       false
 *
 *
 *                               $Promise<typeExpr>
 *          typeExpr                   <--->                 Promise<typeExpr>
 *
 *
 *                            $MaybePromise<typeExpr>
 *          typeExpr                   <--->            typeExpr || Promise<typeExpr>
 *
 * Note that conditional expressions with fixed conditions (such as the last two examples)
 * will be further simplified by the dead code elimination babel plugin
 *
 * To read more about babel macros, take a look at their docs:
 * https://github.com/kentcdodds/babel-plugin-macros
 */

const { ast } = expression;

function asyncMacro({ references, babel, state, config: { ASYNC } }) {
  const t = babel.types;

  const {
    $isAsync = [],
    $isSync = [],
    $iteratorSymbol = [],
    $Promise = [],
    $MaybePromise = [],
    $ = [],
    $async = [],
    $await = [],
  } = references;

  for (const reference of $isAsync) {
    reference.replaceWith(t.booleanLiteral(!!ASYNC));
  }

  for (const reference of $isSync) {
    reference.replaceWith(t.booleanLiteral(!ASYNC));
  }

  for (const reference of $iteratorSymbol) {
    reference.replaceWith(ASYNC ? ast`Symbol.asyncIterator` : ast`Symbol.iterator`);
  }

  for (const reference of concat($Promise, $MaybePromise)) {
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

  if (/\.ts$/.test(state.filename)) {
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

  for (const reference of $) {
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

  for (const reference of concat($async, $await)) {
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

        reference.parentPath.replaceWith(t.parenthesizedExpression(argument));
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
          parent.decorators = parent.decorators.filter((dec) => dec !== node);
        }
        break;
    }
  }
}

module.exports = createMacro(asyncMacro, { configName: 'async' });
