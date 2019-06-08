const parseArgs = require('minimist');

const argv = parseArgs(process.argv.slice(2), {
  alias: {
    h: 'help',
    w: 'watch',
    q: 'quiet',
  }
});

const usage =
`For src/**/*.template.js, generates adjacent method.js and async-method.js files.
Usage: npm run generate [options]
Options:
-w, --watch                   Watch for changed files and regenerate them
-q, --quiet                   Only log errors
-h, --help                    Print this message
`;

module.exports = { argv, usage };
