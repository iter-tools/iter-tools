'use strict';

const { makeRe } = require('picomatch');
const { camelize, compareNames } = require('../../names.cjs');

const glob = 'src/?(__)methods/*.js';

const methodNameMatcher = makeRe(glob, { capture: true });
const getMethodName = (path) => {
  const match = methodNameMatcher.exec(path);
  return match && `${match[1] || ''}${match[2]}`;
};

class IndexGenerator {
  constructor() {
    this.include = glob;
  }

  async map(_, change) {
    return getMethodName(change.path);
  }

  async reduce(api, mappings) {
    await api.generate('src/index.js', () => {
      return `${[...mappings.values()]
        .filter((name) => name)
        .sort(compareNames)
        .map((name) => {
          const source = name.startsWith('__')
            ? `./__methods/${name.slice(2)}`
            : `./methods/${name}`;
          return `export { default as ${camelize(name)} } from '${source}.js';`;
        })
        .join('\n')}
`;
    });
  }
}

module.exports = IndexGenerator;
