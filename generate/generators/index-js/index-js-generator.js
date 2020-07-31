'use strict';

const { Generator } = require('macrome');
const camelcase = require('camelcase');
const { makeRe } = require('picomatch');
const { relative, dirname } = require('path');
const { statement } = require('@babel/template');

const { compareNames } = require('../../names');
const { stripExt } = require('../utils');
const { FormatMixin } = require('../format-mixin');

const methodNameMatcher = makeRe('src/*.*', { capture: true });
const getMethodName = path => {
  const match = methodNameMatcher.exec(path);
  return match && match[1];
};

class IndexJsGenerator extends FormatMixin(Generator) {
  constructor(api, options) {
    super(api, options);

    this.files = ['src/*.mjs'];
    this.excludedFiles = ['src/index.mjs'];
  }

  static generateExports(destPath, pathMap) {
    return [...pathMap.keys()]
      .map(path => [getMethodName(path), path])
      .sort(([a], [b]) => compareNames(a, b))
      .map(([name, path]) =>
        statement.ast(
          `export { default as ${camelcase(name)} } from './${stripExt(
            relative(dirname(destPath), path),
          )}';`,
        ),
      );
  }

  reduce(pathMap) {
    const destPath = 'src/index.mjs';

    const { program } = this.parse('');

    program.body = this.constructor.generateExports(destPath, pathMap);

    this.decorate(program, this.getAnnotations(destPath));

    this.write(destPath, this.print(program).code);
  }
}

module.exports = IndexJsGenerator;
