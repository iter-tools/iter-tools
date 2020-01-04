'use strict';

const { basename, dirname, join } = require('path');
const fs = require('fs');
const camelcase = require('camelcase');
const babylon = require('@babel/parser');
const fullExtname = require('path-complete-extname');
const { Generator, REMOVE } = require('macrome');

const apiMdFile = require('../_templates/api-md-file');
const { renameDollar } = require('../../names');
const extractMethodSignatures = require('./extract-method-signatures');

class ApiMdGenerator extends Generator {
  constructor() {
    super();

    this.docsChanged = this.debounce(this.docsChanged);

    this.glob = [
      'src/methods/*/{README.md,README.async.md,README.parallel.md,DOCME.json}',
      'src/methods/*/*.{js,mjs}',
    ];
    this.ignored = ['src/methods/*_/**', 'src/methods/*/$*.{js,mjs}'];

    this.files = new Map();
    this.aliases = new Map();
  }

  getImplPath(dir, type = null) {
    const asyncPrefix = type ? 'async-' : '';
    const parallelSuffix = type === 'parallel' ? '-parallel' : '';
    const implName = renameDollar(basename(dir), false);
    return join(dir, `${asyncPrefix}${implName}${parallelSuffix}.mjs`);
  }

  parse(path, content) {
    const ext = fullExtname(path);
    switch (ext) {
      case '.json':
        return JSON.parse(content);
      case '.mjs':
        return babylon.parse(content, {
          sourceType: 'module',
        });
      default:
        return content;
    }
  }

  getNameForDir(path) {
    return camelcase(basename(path));
  }

  recordChange({ path, operation }) {
    if (operation === REMOVE) {
      this.files.delete(path);
    } else {
      const content = fs.readFileSync(this.resolve(path), 'utf8');
      const parsedContent = this.parse(path, content);
      if (basename(path) === 'DOCME.json' && parsedContent.aliases) {
        for (const alias of parsedContent.aliases) {
          this.aliases.set(alias, this.getNameForDir(dirname(path)));
        }
      }
      this.files.set(path, parsedContent);
    }
    this.docsChanged();
  }

  extractMethodSignatures(dir, docme, type) {
    const path = this.getImplPath(dir, type);
    const methodName_ = renameDollar(this.getNameForDir(dir), !!type);
    const methodName = type === 'parallel' ? `${methodName_}Parallel` : methodName_;

    const file = this.files.get(path);

    if (!file) return null;

    return extractMethodSignatures(methodName, file, docme);
  }

  buildMethods() {
    return [...this.files]
      .filter(([file]) => basename(file) === 'DOCME.json')
      .map(([path, docme]) => {
        const dir = dirname(path);
        const name = this.getNameForDir(dirname(path));
        return {
          name,
          aliasFor: this.aliases.get(name),
          docme,
          readme: this.files.get(join(dir, 'README.md')),
          asyncReadme: this.files.get(join(dir, 'README.async.md')),
          parallelReadme: this.files.get(join(dir, 'README.parallel.md')),
          signatures: this.extractMethodSignatures(dir, docme),
          asyncSignatures: this.extractMethodSignatures(dir, docme, 'async'),
          parallelSignatures: this.extractMethodSignatures(dir, docme, 'parallel'),
        };
      });
  }

  docsChanged() {
    const typesDoc = fs.readFileSync(this.resolve('src/types/API.md'), 'utf8');
    this.writeMonolithic('API.md', apiMdFile(typesDoc, this.buildMethods(), this.aliases));
  }
}

module.exports = ApiMdGenerator;
