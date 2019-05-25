const capitalize = str => str.slice(0, 1).toUpperCase() + str.slice(1)
const asyncize = str => `async${capitalize(str)}`

module.exports = (fns, $isAsync) =>
`/**
 * @generated
 * It should not be necessary to edit this file directly.
 * The template for this file is: templates/test-$-file.js
 */

import {
${fns.map(fn => `  ${$isAsync ? asyncize(fn) : fn}`).join(',\n')}
} from '..'

export * from '..'

${fns.map(fn => `export const $${fn} = ${$isAsync ? asyncize(fn) : fn}`).join('\n')}
`
