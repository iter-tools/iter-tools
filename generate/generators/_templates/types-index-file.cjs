'use strict';

const fs = require('fs');
const { join } = require('path');
const camelcase = require('camelcase');
const { makeRe } = require('picomatch');
const { compareNames } = require('../../names.cjs');

const methodNameMatcher = makeRe('src/methods/*.d.ts', { capture: true });
const getMethodName = (path) => {
  const match = methodNameMatcher.exec(path);
  return match && match[1];
};

module.exports = (generatedPaths) =>
  `/**
 * @generated
 * It should not be necessary to edit this file directly.
 * The template for this file is: generate/templates/types-index-file.js
 */

${[...generatedPaths]
  .map(getMethodName)
  .filter((name) => name && name !== 'index')
  .sort(compareNames)
  .map((name) => `export { default as ${camelcase(name)} } from './methods/${name}';`)
  .join('\n')}
${fs.readFileSync(join(__dirname, '../../../src/index-static.d.ts'))}
`;
