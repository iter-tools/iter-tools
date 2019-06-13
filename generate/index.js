const parseArgs = require('minimist');
const camelize = require('camelize');

const MultiGenerator = require('./generator/multi-generator');
const MethodsGenerator = require('./generators/methods');
const TestsGenerator = require('./generators/tests');
const TypesGenerator = require('./generators/types');
const TypeTestsGenerator = require('./generators/type-tests');

const argv = camelize(
  parseArgs(process.argv.slice(2), {
    alias: {
      h: 'help',
      w: 'watch',
      q: 'quiet',
    },
  }),
);

const usage = `For src/**/$*.js, generates adjacent method.js and async-method.js files.
Usage: npm run generate [options]

Options:
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
  const generator = new MultiGenerator(
    [MethodsGenerator, TestsGenerator, TypesGenerator, TypeTestsGenerator],
    argv,
  );

  generator.generate();
}
