'use strict';

const { makeRe } = require('picomatch');
const { camelize, compareNames } = require('../../names.cjs');

const methodNameMatcher = makeRe('src/?(__)methods/*.js', { capture: true });
const getMethodName = (path) => {
  const match = methodNameMatcher.exec(path);
  return match && `${match[1] || ''}${match[2]}`;
};

module.exports = (generatedPaths) =>
  `/**
 * @generated
 * It should not be necessary to edit this file directly.
 * The template for this file is: generate/templates/index-file.js
 */

${[...generatedPaths]
  .map(getMethodName)
  .filter((name) => name)
  .sort(compareNames)
  .map((name) => {
    const source = name.startsWith('__') ? `./__methods/${name.slice(2)}` : `./methods/${name}`;
    return `export { default as ${camelize(name)} } from '${source}.js';`;
  })
  .join('\n')}
`;
