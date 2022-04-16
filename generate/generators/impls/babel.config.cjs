'use strict';

const { join } = require('path');

const isAsync = (caller) => caller && caller.ASYNC;

module.exports = (api) => {
  const ASYNC = api.caller(isAsync);

  return {
    babelrc: false,
    plugins: [
      '@babel/plugin-syntax-typescript',
      ['@babel/plugin-syntax-decorators', { decoratorsBeforeExport: false }],
      ['macros', { async: { ASYNC } }],
      join(__dirname, 'babel-plugin-asyncish-generators.cjs'),
      [join(__dirname, 'babel-plugin-$-identifiers-and-imports.cjs'), { ASYNC }],
      // use dead code elimination to clean up if(false) {} and if(true) {}
      ['minify-dead-code-elimination', { keepFnName: true, keepFnArgs: true, keepClassName: true }],
      'babel-plugin-recast',
    ],
  };
};
