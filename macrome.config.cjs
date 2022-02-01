'use strict';

module.exports = {
  generators: [
    ['./generate/generators/impls', { ASYNC: true }],
    ['./generate/generators/impls', { ASYNC: false }],
    ['./generate/generators/types', { ASYNC: true }],
    ['./generate/generators/types', { ASYNC: false }],
    './generate/generators/methods-links',
    './generate/generators/__methods-links',
    './generate/generators/index-js',
    './generate/generators/index-ts',
    './generate/generators/api-md',
    //  './generate/generators/gitattributes',
  ],
};
