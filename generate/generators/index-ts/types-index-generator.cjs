'use strict';

const { makeRe } = require('picomatch');
const { camelize, compareNames } = require('../../names.cjs');

const glob = 'src/methods/*.d.ts';

const methodNameMatcher = makeRe(glob, { capture: true });
const getMethodName = (path) => {
  const match = methodNameMatcher.exec(path);
  return match && match[1];
};

class TypesIndexGenerator {
  constructor() {
    this.include = glob;
  }

  async map(_, change) {
    return getMethodName(change.path);
  }

  async reduce(api, mappings) {
    await api.generate('src/index.d.ts', async () => {
      const indexStatic = await api.read('src/index-static.d.ts');
      return `${[...mappings.values()]
        .filter((name) => name && name !== 'index')
        .sort(compareNames)
        .map(
          (name) =>
            `export { default as ${camelize(name)} } from './methods/${
              name.startsWith('__') ? name.slice(2) : name
            }';`,
        )
        .join('\n')}
    
    ${indexStatic}
    `;
    });
  }
}

module.exports = TypesIndexGenerator;
