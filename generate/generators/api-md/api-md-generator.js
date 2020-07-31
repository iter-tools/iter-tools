'use strict';

const { basename, extname, dirname, join } = require('path');
const fs = require('fs');
const camelcase = require('camelcase');
const { Generator } = require('macrome');

const template = require('./template');
const { renameDollar } = require('../../names');
const extractMethodSignatures = require('./extract-method-signatures');

class ApiMdGenerator extends Generator {
  constructor(api, options) {
    super(api, options);

    this.files = [
      'src/methods/*/{README.md,README.{async,parallel}.md,DOCME.json}',
      'src/methods/*/*.{js,mjs}',
    ];
    this.excludedFiles = ['src/methods/*_/**', 'src/methods/*/$*.{js,mjs}'];

    this.aliases = new Map();
  }

  getImplPath(dir, type = null) {
    const asyncPrefix = type ? 'async-' : '';
    const parallelSuffix = type === 'parallel' ? '-parallel' : '';
    const implName = renameDollar(basename(dir), false);
    return join(dir, `${asyncPrefix}${implName}${parallelSuffix}.mjs`);
  }

  getNameForDir(path) {
    return camelcase(basename(path));
  }

  map(api, { path }) {
    const content = api.read(path, { shouldParse: false });
    const ext = extname(path);

    let parsedContent = content;

    if (ext === '.json') parsedContent = JSON.parse(content);
    if (ext === '.mjs') parsedContent = api.parserForPath(path).parse(content);

    if (basename(path) === 'DOCME.json' && parsedContent.aliases) {
      for (const alias of parsedContent.aliases) {
        // TODO could stale aliases from deleted files be problematic?
        // Why did I put aliases in DOCME not aliasFor?
        this.aliases.set(alias, this.getNameForDir(dirname(path)));
      }
    }
    return parsedContent;
  }

  extractMethodSignatures(pathMap, dir, docme, type) {
    const path = this.getImplPath(dir, type);
    const methodName_ = renameDollar(this.getNameForDir(dir), !!type);
    const methodName = type === 'parallel' ? `${methodName_}Parallel` : methodName_;

    const change = pathMap.get(path);

    if (!change) return null;

    return extractMethodSignatures(methodName, change.mapResult, docme);
  }

  buildMethods(pathMap) {
    return [...pathMap]
      .filter(([path]) => basename(path) === 'DOCME.json')
      .map(([path, { mapResult: docme }]) => {
        const dir = dirname(path);
        const name = this.getNameForDir(dirname(path));
        const readme = pathMap.get(join(dir, 'README.md'));
        const asyncReadme = pathMap.get(join(dir, 'README.async.md'));
        const parallelReadme = pathMap.get(join(dir, 'README.parallel.md'));

        return {
          name,
          aliasFor: this.aliases.get(name),
          docme,
          readme: readme && readme.mapResult,
          asyncReadme: asyncReadme && asyncReadme.mapResult,
          parallelReadme: parallelReadme && parallelReadme.mapResult,
          signatures: this.extractMethodSignatures(pathMap, dir, docme),
          asyncSignatures: this.extractMethodSignatures(pathMap, dir, docme, 'async'),
          parallelSignatures: this.extractMethodSignatures(pathMap, dir, docme, 'parallel'),
        };
      });
  }

  reduce(api, pathMap) {
    const typesDoc = fs.readFileSync(this.resolve('src/types/API.md'), 'utf8');
    api.write('API.md', template(typesDoc, this.buildMethods(pathMap), this.aliases));
  }
}

module.exports = ApiMdGenerator;
