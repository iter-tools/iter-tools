const git = require('git-state');

const { dirty, untracked } = git.checkSync('.');

if (dirty + untracked > 0) {
  console.log(
    'Building the project resulted in file changes.\n' +
      'This probably means that the `npm run generate` command was not run.',
  );
  process.exit(1);
}
