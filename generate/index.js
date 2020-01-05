#! /usr/bin node
'use strict';

const parseArgs = require('minimist');
const camelize = require('camelize');
const { Macrome } = require('macrome');
const pkgDir = require('pkg-dir');

const $MethodsGenerator = require('./generators/$methods');
const $TypesGenerator = require('./generators/$types');
const $TestsGenerator = require('./generators/$tests');
const MethodsLinksGenerator = require('./generators/methods-links');
const IndexJsGenerator = require('./generators/index-js');
const IndexTsGenerator = require('./generators/index-ts');
const TypeTestsGenerator = require('./generators/type-tests');
const ApiMDGenerator = require('./generators/api-md');
const MonolithicGenerator = require('./generators/monolithic');

const argv = camelize(
  parseArgs(process.argv.slice(2), {
    alias: {
      c: 'clean',
      h: 'help',
      w: 'watch',
      q: 'quiet',
    },
  }),
);

const usage = `For src/**/$*.js, generates adjacent method.js and async-method.js files.
Usage: npm run generate [options]

Options:
  -c, --clean               Don't build, but instead remove generated files
  -w, --watch               Watch for changed files and regenerate them
  -q, --quiet               Only log errors
  -h, --help                Print this message

Watching options, passed to the sane watcher:
  --poll                    Watch by polling files
  --watchman                Watch use watchman (if available)
  --watchman-path           When watching using watchman, the path to the watchman binary
`;

if (argv.help) {
  console.log(usage);
} else {
  const alwaysIgnored = ['es5', 'es2015', 'es2018', 'coverage'];

  const macrome = new Macrome(
    [
      new $MethodsGenerator({ ASYNC: true }),
      new $MethodsGenerator({ ASYNC: false }),
      new $TypesGenerator({ ASYNC: true }),
      new $TypesGenerator({ ASYNC: false }),
      new $TestsGenerator({ ASYNC: true }),
      new $TestsGenerator({ ASYNC: false }),
      new MethodsLinksGenerator(),
      new IndexJsGenerator(),
      new IndexTsGenerator(),
      new TypeTestsGenerator(),
      new ApiMDGenerator(),
      new MonolithicGenerator(),
    ],
    {
      rootDir: pkgDir.sync(__dirname),
      sourceControl: 'git',
      ...argv,
      alwaysIgnored,
    },
  );
  if (argv.clean) {
    macrome.clean();
  } else {
    macrome.generate();
  }
}
