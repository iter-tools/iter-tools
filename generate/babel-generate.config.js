const isAsync = (caller) => caller && caller.ASYNC;

module.exports = api => {
  const ASYNC = api.caller(isAsync);

  return {
    babelrc: false,
    plugins: [
      ['../babel-plugin-resolve-$-import-paths', { ASYNC }],
      ['macros', { async: { ASYNC } }],
      // use dead code elimination to clean up if(false) {} and if(true) {}
      ['minify-dead-code-elimination', { keepFnName: true, keepFnArgs: true, keepClassName: true }],
    ],
  }
}
