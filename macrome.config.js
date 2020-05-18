#! /usr/bin node
'use strict';

module.exports = {
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
