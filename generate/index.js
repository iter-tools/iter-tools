#! /usr/bin node
'use strict';

const parseArgs = require('minimist');
const camelize = require('camelize');

const MultiGenerator = require('./generator/multi-generator');
const MethodsGenerator = require('./generators/methods');
const MethodsLinksGenerator = require('./generators/methods-links');
const TestsGenerator = require('./generators/tests');
const TypesGenerator = require('./generators/types');
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
  const alwaysIgnored = ['coverage', 'dist'];
  if (argv.clean) {
    require('./generator/clean')('.', { glob: ['src/**'], ignored: alwaysIgnored });
  } else {
    const generator = new MultiGenerator(
      [
        MethodsGenerator,
        MethodsLinksGenerator,
        TestsGenerator,
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
