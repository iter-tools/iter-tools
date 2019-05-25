const { createMacro } = require('babel-plugin-macros')
const { expression } = require('@babel/template')

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

function asyncMacro ({ references, babel, config: { ASYNC } }) {
  const t = babel.types

  for (const reference of references.$isAsync || []) {
    reference.replaceWith(t.booleanLiteral(!!ASYNC))
  }

  for (const reference of references.$iteratorSymbol || []) {
    const { ast } = expression
    reference.replaceWith(ASYNC ? ast`Symbol.asyncIterator` : ast`Symbol.iterator`)
  }

  for (const reference of [].concat(references.$async || [], references.$await || [])) {
    const refName = reference.node.name

    switch (reference.parent.type) {
      case 'ExpressionStatement': {
        const nextStatement = getNextStatement(reference)

        if (refName === '$async' && nextStatement.type === 'FunctionDeclaration') {
          // $async; function foo() {}

          if (ASYNC) {
            nextStatement.async = true
          }
        } else if (refName === '$await' && nextStatement.type === 'ForOfStatement') {
          // $await; for { const foo of bar }

          if (ASYNC) {
            nextStatement.await = true
          }
        }

        reference.remove()
        break
      }
      case 'CallExpression': {
        let argument = getOnlyArgument(reference, refName)

        if (refName === '$async' && (argument.type === 'FunctionExpression' || argument.type === 'ArrowFunctionExpression')) {
          // $async(function() {})
          // $async(() => {})

          if (ASYNC) {
            argument.async = true
          }
        } else if (refName === '$await') {
          // $await(someExpression)

          if (ASYNC) {
            argument = t.awaitExpression(argument)
          }
        }

        reference.parentPath.replaceWith(argument)
        break
      }
    }
  }
}

function getNextStatement (reference) {
  const { container } = reference.parentPath
  const parentNode = reference.parent
  const loopIdx = container.findIndex(node => node === parentNode) + 1
  return container[loopIdx]
}

function getOnlyArgument (reference, refName) {
  const { arguments: args } = reference.parent

  if (args.length !== 1) {
    throw new Error(`The ${refName}() macro takes exactly one argument`)
  }

  return args[0]
}

module.exports = createMacro(asyncMacro, { configName: 'async' })
