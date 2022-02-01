'use strict';

const { basename, dirname, join } = require('path');
const babylon = require('@babel/parser');
const fullExtname = require('path-complete-extname');

const { camelize, renameDollar } = require('../../names.cjs');
const apiMdFile = require('./template.cjs');
const extractMethodSignatures = require('./extract-method-signatures.cjs');
const BaseGenerator = require('../base-generator.cjs');

class ApiMdGenerator extends BaseGenerator {
  constructor(options) {
    super(options);

    this.include = ['src/impls/*/{README.md,README.async.md,DOCME.json}', 'src/impls/*/*.js'];
    this.exclude = ['src/impls/*/$*.js'];

    this.files = new Map();
    this.aliases = new Map();
  }

  getImplPath(dir, type = null) {
    const asyncPrefix = type ? 'async-' : '';
    const implName = renameDollar(basename(dir), false);
    return join(dir, `${asyncPrefix}${implName}.js`);
  }

  parse(path, content) {
    const ext = fullExtname(path);
    switch (ext) {
      case '.json':
        return JSON.parse(content);
      case '.js':
        return babylon.parse(content, {
          sourceType: 'module',
        });
      default:
        return content;
    }
  }

  getNameForDir(path) {
    return camelize(basename(path));
  }

  extractMethodSignatures(dir, docme, type) {
    const path = this.getImplPath(dir, type);
    const methodName = renameDollar(this.getNameForDir(dir), !!type);

    const file = this.files.get(path);

    if (!file) return null;

    return extractMethodSignatures(methodName, file, docme);
  }

  async map(api, change) {
    const content = await api.read(change.path);
    const parsedContent = this.parse(change.path, content);
    if (basename(change.path) === 'DOCME.json' && parsedContent.aliases) {
      for (const alias of parsedContent.aliases) {
        this.aliases.set(alias, this.getNameForDir(dirname(change.path)));
      }
    }
    return parsedContent;
  }

  async reduce(api, mappings) {
    await api.generate('API.md', async () => {
      const typesDoc = await api.read('src/types/API.md');

      const methods = [...mappings]
        .filter(([file]) => basename(file) === 'DOCME.json')
        .map(([path, docme]) => {
          const dir = dirname(path);
          const name = this.getNameForDir(dirname(path));
          return {
            name,
            aliasFor: this.aliases.get(name),
            docme,
            readme: mappings.get(join(dir, 'README.md')),
            asyncReadme: mappings.get(join(dir, 'README.async.md')),
            signatures: this.extractMethodSignatures(dir, docme),
            asyncSignatures: this.extractMethodSignatures(dir, docme, 'async'),
          };
        });

      return apiMdFile(typesDoc, methods, this.aliases);
    });
  }
}

module.exports = ApiMdGenerator;
