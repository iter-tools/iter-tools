const { basename } = require('path');
const camelcase = require('camelcase');
const { matcher } = require('micromatch');

const capitalize = str => str.slice(0, 1).toUpperCase() + str.slice(1);
const name = (fn, ASYNC) => ASYNC ? `async${capitalize(fn)}` : fn;

const isFunctionTemplate = matcher("src/$*.js");

const template = (fns, ASYNC) =>
`/**
 * @generated
 * It should not be necessary to edit this file directly.
 * The template for this file is: generate/templates/test-fns-file.js
 */

import {
${fns.map(fn => `  ${name(fn, ASYNC)}`).join(',\n')}
} from '..'

export * from '..'

${fns.map(fn => `export const $${fn} = ${name(fn, ASYNC)}`).join('\n')}
`;

module.exports = (paths, ASYNC) => {
  return (
    template(
      [...paths]
        .filter(path => isFunctionTemplate(path))
        .map(path => camelcase(basename(path, '.js').slice(1)))
        .sort(),
      ASYNC,
    )
  );
}
