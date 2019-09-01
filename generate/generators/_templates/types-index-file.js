const camelcase = require('camelcase');
const { makeRe } = require('picomatch');
const { compareNames } = require('../../names');

const methodNameMatcher = makeRe('src/*.d.ts', { capture: true });
const getMethodName = path => {
  const match = methodNameMatcher.exec(path);
  return match && match[1];
};

module.exports = generatedPaths =>
  `/**
 * @generated
 * It should not be necessary to edit this file directly.
 * The template for this file is: generate/templates/types-index-file.js
 */

/// <reference lib="es2018" />
/// <reference lib="esnext.asynciterable" />

${[...generatedPaths]
  .map(getMethodName)
  .filter(Boolean)
  .sort(compareNames)
  .map(name => `export { default as ${camelcase(name)} } from './${name}';`)
  .join('\n')}

export * from './index-interfaces';
`;
