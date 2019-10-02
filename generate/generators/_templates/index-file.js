'use strict';

const camelcase = require('camelcase');
const { makeRe } = require('picomatch');
const { compareNames } = require('../../names');

const methodNameMatcher = makeRe('src/*.mjs', { capture: true });
const getMethodName = path => {
  const match = methodNameMatcher.exec(path);
  return match && match[1];
};

module.exports = generatedPaths =>
  `/**
 * @generated
 * It should not be necessary to edit this file directly.
 * The template for this file is: generate/templates/index-file.js
 */

${[...generatedPaths]
  .map(getMethodName)
  .filter(name => name && name !== 'index')
  .sort(compareNames)
  .map(name => `export { default as ${camelcase(name)} } from './${name}';`)
  .join('\n')}
`;
