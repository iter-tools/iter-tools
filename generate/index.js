const { argv, usage } = require('./argv');
const Generator = require('./generator');

if (argv.help) {
  console.log(usage);
  process.exit(0);
} else {
  new Generator().generate();
}


