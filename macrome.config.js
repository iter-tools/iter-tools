#! /usr/bin node
'use strict';

const BabylonParser = require('@macrome/parser-babylon');
const LinesParser = require('@macrome/parser-lines');

const babylonOptions = {
  parseOptions: { plugins: ['decorators-legacy'] },
};

module.exports = {
  // prettier-ignore
  parsers: [
    [BabylonParser, babylonOptions],
    LinesParser,
  ],

  parserOverrides: [
    {
      files: ['**/__tests__/$*.test.js'],
      parser: new BabylonParser(
        BabylonParser.mergeOptions(babylonOptions, { parseOptions: { plugins: ['typescript'] } }),
      ),
    },
  ],

  generators: [
    ['./generate/generators/$methods', { ASYNC: true }],
    ['./generate/generators/$methods', { ASYNC: false }],
    ['./generate/generators/$types', { ASYNC: true }],
    ['./generate/generators/$types', { ASYNC: false }],
    ['./generate/generators/$tests', { ASYNC: true }],
    ['./generate/generators/$tests', { ASYNC: false }],
    './generate/generators/methods-links',
    './generate/generators/index-js',
    './generate/generators/index-ts',
    './generate/generators/type-tests',
    './generate/generators/api-md',
    './generate/generators/gitattributes',
  ],
};
