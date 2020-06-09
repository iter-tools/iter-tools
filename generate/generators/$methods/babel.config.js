'use strict';

const { join } = require('path');

const callerIsAsync = caller => caller && caller.ASYNC;
const callerHasTypes = caller => caller && caller.hasTypes;

module.exports = api => {
  const ASYNC = api.caller(callerIsAsync);
  const hasTypes = api.caller(callerHasTypes);

  return {
    babelrc: false,
    plugins: [
      [join(__dirname, 'babel-plugin-$-identifiers-and-imports'), { ASYNC }],
      ['macros', { async: { ASYNC, hasTypes } }],
      // use dead code elimination to clean up if(false) {} and if(true) {}
      ['minify-dead-code-elimination', { keepFnName: true, keepFnArgs: true, keepClassName: true }],
    ],
  };
};
