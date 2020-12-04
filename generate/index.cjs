#! /usr/bin node
'use strict';

const parseArgs = require('minimist');
const camelize = require('camelize');

const MultiGenerator = require('./generator/multi-generator.cjs');
const ImplsGenerator = require('./generators/impls/index.cjs');
const __MethodsLinksGenerator = require('./generators/__methods-links/index.cjs');
const MethodsLinksGenerator = require('./generators/methods-links/index.cjs');
const TypesGenerator = require('./generators/types/index.cjs');
const TypeTestsGenerator = require('./generators/type-tests/index.cjs');
const ApiMDGenerator = require('./generators/api-md/index.cjs');
const MonolithicGenerator = require('./generators/monolithic.cjs');

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
  const alwaysIgnored = ['coverage', 'dist'];
  if (argv.clean) {
    require('./generator/clean.cjs')('.', { glob: ['src/**'], ignored: alwaysIgnored });
  } else {
    const generator = new MultiGenerator(
      [
        ImplsGenerator,
        __MethodsLinksGenerator,
        MethodsLinksGenerator,
        TypesGenerator,
        TypeTestsGenerator,
        ApiMDGenerator,
        MonolithicGenerator,
      ],
      {
        ...argv,
        alwaysIgnored,
      },
    );

    generator.generate();
  }
}
