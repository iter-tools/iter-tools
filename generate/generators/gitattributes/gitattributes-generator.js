'use strict';

const fs = require('fs');
const ignore = require('ignore');
const { Generator } = require('macrome');

const ignoredPaths = [
  // It's pretty useful to see what's changing in API.md since it can't be tested
  'API.md',
];

class GitattributesGenerator extends Generator {
  reduce() {
    const gitignore = ignore().add(fs.readFileSync('.gitignore', 'utf8'));

    const lines = [
      '.gitattributes',
      ...[...this.generatedPaths]
        .filter(path => !gitignore.ignores(path) && !ignoredPaths.includes(path))
        .sort(),
    ].map(path => `${path} linguist-generated=true`);

    this.decorate(lines, this.getAnnotations('.gitattributes'));

    this.write('.gitattributes', this.print(lines));
  }
}

module.exports = GitattributesGenerator;
