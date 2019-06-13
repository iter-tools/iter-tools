const loglevel = require('loglevel');

const FileCache = require('./file-cache');
const { debounce } = require('./utils');

const log = loglevel.getLogger('generator');

class MultiGenerator {
  constructor(GeneratorClasses, options) {
    this.options = Object.assign(options, { multiGenerator: this });

    this.generators = GeneratorClasses.map(GeneratorClass => new GeneratorClass(options));

    this.pathsChanged = debounce(this.pathsChanged.bind(this), 50);
    this.generatedPaths = new FileCache();

    log.setLevel(options.quiet ? 'error' : 'info');
  }

  pathsChanged() {
    for (const gen of this.generators) {
      gen.pathsChanged();
    }
  }

  generate() {
    Promise.all(this.generators.map(gen => gen.initial())).then(() => {
      if (this.options.watch) {
        log.info('Initial generation completed; watching for changes...');

        for (const gen of this.generators) gen.watch();
      }
    });
  }
}

module.exports = MultiGenerator;
