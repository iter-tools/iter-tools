#! /usr/bin node
'use strict';

const parser = require('@macrome/parser-babylon');

const parseOptions = {
  plugins: ['decorators-legacy'],
  sourceType: 'module',
};

const tsParseOptions = {
  ...parseOptions,
  plugins: [...parseOptions.plugins, 'typescript'],
};

module.exports = {
  parser,
  parseOptions,
  generators: [
    ['./generate/generators/$methods', { ASYNC: true }],
    ['./generate/generators/$methods', { ASYNC: false }],
    ['./generate/generators/$types', { ASYNC: true, parseOptions: tsParseOptions }],
    ['./generate/generators/$types', { ASYNC: false, parseOptions: tsParseOptions }],
    ['./generate/generators/$tests', { ASYNC: true, parseOptions: tsParseOptions }],
    ['./generate/generators/$tests', { ASYNC: false, parseOptions: tsParseOptions }],
    // './generate/generators/methods-links',
    // './generate/generators/index-js',
    // './generate/generators/index-ts',
    ['./generate/generators/type-tests', { parseOptions: tsParseOptions }],
    // './generate/generators/api-md',
    // './generate/generators/gitattributes',
  ],
};
