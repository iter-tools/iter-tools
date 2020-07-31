'use strict';

const { Generator } = require('macrome');

const { FormatMixin } = require('../format-mixin');
const IndexJsGenerator = require('../index-js');

const t = `
/// <reference lib="es2018" />
/// <reference lib="esnext.asynciterable" />

export * from './index-interfaces';

files;
`;

class IndexTsGenerator extends FormatMixin(Generator) {
  constructor(api, options) {
    super(api, options);

    this.files = ['src/*.d.ts'];
    this.excludedFiles = ['src/index.d.ts', 'src/index-interfaces.d.ts'];
  }

  reduce(pathMap) {
    const destPath = 'src/index.d.ts';
    const { program } = this.parse(t);
    const leadingComments = program.body[0].comments;

    program.body.splice(1, 1, ...IndexJsGenerator.generateExports(destPath, pathMap));
    program.body[0].comments = leadingComments;

    this.decorate(program, this.getAnnotations(destPath));

    this.write(destPath, this.print(program).code);
  }
}

module.exports = IndexTsGenerator;
