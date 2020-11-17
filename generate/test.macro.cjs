const { createMacro } = require('babel-plugin-macros');
const { expression } = require('@babel/template');
const { getOnlyArgument } = require('./macro-utils.cjs');

/**
 * This is a babel macro. Import and use these symbols in accordance with the examples below.
 * They are replaced with one of two variants depending on whether the ASYNC environment
 * variable is defined at compile time.
 *
 *           SYNC                    TEMPLATE                    ASYNC
 *
 *                             $awaitError(anyCall())
 *
 *        (() => {                                              await (async () => {
 *          try {                                                 try {
 *            anyCall();                                            await anyCall();
 *          } catch (e) {              <--->                      } catch (e) {
 *            return e;                                             return e;
 *          }                                                     }
 *        })()                                                  })()
 *
 */

const { ast } = expression;

function asyncMacro({ references, babel, _state, config: { ASYNC } }) {
  const t = babel.types;

  const { $awaitError = [] } = references;

  for (const reference of $awaitError) {
    const refName = reference.node.name;
    const argument = getOnlyArgument(reference, refName);
    const result = ast`
        (() => {
          try {
          } catch (e) {
            return e;
          }
        })()
      `;

    if (ASYNC) {
      result.callee.async = true;
    }

    result.callee.body.body[0].block.body.push(
      t.expressionStatement(ASYNC ? t.awaitExpression(argument) : argument),
    );

    reference.parentPath.replaceWith(ASYNC ? t.awaitExpression(result) : result);
  }
}

module.exports = createMacro(asyncMacro, { configName: 'async' });
