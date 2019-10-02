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
  }

  recordOperation(path, operation) {
    const isJSON = /\.json$/.test(path);
    if (operation === REMOVE) {
      this.files.delete(path);
    } else {
      const content = fs.readFileSync(this.resolve(path));
      this.files.set(path, isJSON ? JSON.parse(content) : content);
    }
    this.docsChanged();
  }

  buildMethods() {
    const methods = [...this.files]
      .filter(([file]) => basename(file) === 'DOCME.json')
      .map(([file, content]) => {
        const name = camelcase(basename(dirname(file)));

        return {
          name,
          docme: content,
          readme: this.files.get(join(dirname(file), 'README.md')),
          asyncReadme: this.files.get(join(dirname(file), 'README.async.md')),
          parallelReadme: this.files.get(join(dirname(file), 'README.parallel.md')),
        };
      });
    return methods.filter(m => m.docme);
  }

  docsChanged() {
    this.writeMonolithic('API.md', apiMdFile(this.buildMethods()));
  }
}

module.exports = MonoliticGenerator;
