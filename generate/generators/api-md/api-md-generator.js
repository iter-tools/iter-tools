'use strict';

const { basename, dirname, join } = require('path');
const fs = require('fs');
const camelcase = require('camelcase');
const Generator = require('../../generator');
const apiMdFile = require('../_templates/api-md-file');

const { REMOVE } = Generator;

class MonoliticGenerator extends Generator {
  constructor(options) {
    super(options);

    this.docsChanged = this.debounce(this.docsChanged);

    this.glob = ['src/methods/*/{README.md,README.async.md,README.parallel.md,DOCME.json}'];
    this.ignored = ['src/methods/*_/**'];

    this.files = new Map();
    this.aliases = new Map();
  }

  getNameForPath(path) {
    return camelcase(basename(dirname(path)));
  }

  recordOperation(path, operation) {
    const isJSON = /\.json$/.test(path);
    if (operation === REMOVE) {
      this.files.delete(path);
    } else {
      const content = fs.readFileSync(this.resolve(path));
      const parsedContent = isJSON ? JSON.parse(content) : content;
      if (basename(path) === 'DOCME.json' && parsedContent.aliases) {
        for (const alias of parsedContent.aliases) {
          this.aliases.set(alias, this.getNameForPath(path));
        }
      }
      this.files.set(path, parsedContent);
    }
    this.docsChanged();
  }

  buildMethods() {
    return [...this.files]
      .filter(([file]) => basename(file) === 'DOCME.json')
      .map(([path, content]) => {
        const name = this.getNameForPath(path);
        return {
          name,
          aliasFor: this.aliases.get(name),
          docme: content,
          readme: this.files.get(join(dirname(path), 'README.md')),
          asyncReadme: this.files.get(join(dirname(path), 'README.async.md')),
          parallelReadme: this.files.get(join(dirname(path), 'README.parallel.md')),
        };
      });
  }

  docsChanged() {
    this.writeMonolithic('API.md', apiMdFile(this.buildMethods(), this.aliases));
  }
}

module.exports = MonoliticGenerator;
