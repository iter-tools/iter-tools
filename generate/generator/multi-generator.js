const loglevel = require('loglevel');
const sane = require('sane');
const { join } = require('path');
const { path: rootDir } = require('package.root');

const traverse = require('./traverse');
const FileCache = require('./file-cache');
const { debounce, handleError } = require('./utils');

const log = loglevel.getLogger('generator');

class MultiGenerator {
  constructor(GeneratorClasses, options) {
    this.options = Object.assign({ ignored: [] }, options, { multiGenerator: this });

    this.generators = GeneratorClasses.map(GeneratorClass => new GeneratorClass(this.options));

    this.pathsChanged = debounce(this.pathsChanged.bind(this), 50);
    this.generatedPaths = new FileCache();

    this.alwaysIgnored = ['.git', 'node_modules', ...this.options.ignored];

    log.setLevel(options.quiet ? 'error' : 'info');
  }

  pathsChanged() {
    for (const gen of this.generators) {
      gen.pathsChanged();
    }
  }

  generate() {
    const { alwaysIgnored } = this;

    return traverse(rootDir, { ignored: alwaysIgnored })
      .then(initialPaths => {
        initialPaths.forEach(path => this.addPath(path));

        this.pathsChanged.flush();

        if (this.options.watch) {
          log.info('Initial generation completed; watching for changes...');

          const watcher = sane(
            rootDir,
            Object.assign({ ignored: alwaysIgnored }, this.getSaneOptions()),
          );

          this.inWatchMode = true;

          watcher.on('add', path => this.addPath(path));
          watcher.on('delete', path => this.removePath(path));
          watcher.on('change', path => this.updatePath(path));
        }
      })
      .catch(handleError);
  }

  getSaneOptions() {
    const { poll, watchman, watchmanPath } = this.options;
    return { poll, watchman, watchmanPath };
  }

  resolve(path) {
    return join(rootDir, path);
  }

  addPath(path) {
    for (const gen of this.generators) {
      if (gen.shouldProcess(path)) gen.pathAdded(path);
    }
    this.pathsChanged();
  }

  removePath(path) {
    for (const gen of this.generators) {
      if (gen.shouldProcess(path)) gen.pathRemoved(path);
    }
    this.pathsChanged();
  }

  updatePath(path) {
    for (const gen of this.generators) {
      if (gen.shouldProcess(path)) gen.pathUpdated(path);
    }
  }
}

module.exports = MultiGenerator;
