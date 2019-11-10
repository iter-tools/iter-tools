'use strict';

const loglevel = require('loglevel');
const { join } = require('path');
const { path: rootDir } = require('package.root');

const { traverse, watch } = require('./traverse');
const FileCache = require('./file-cache');
const { debounce, handleError } = require('./utils');

const log = loglevel.getLogger('generator');

class MultiGenerator {
  constructor(GeneratorClasses, options) {
    this.options = Object.assign({ ignored: [] }, options, { multiGenerator: this });

    this.pathsChanged = debounce(this.pathsChanged.bind(this), 50);
    this.debouncedMethods = [this.pathsChanged];
    this.generatedPaths = new FileCache();
    this.inWatchMode = false;

    log.setLevel(options.quiet ? 'error' : 'info');

    this.generators = GeneratorClasses.map(GeneratorClass => new GeneratorClass(this.options));
  }

  pathsChanged() {
    for (const gen of this.generators) {
      gen.pathsChanged();
    }
  }

  generate() {
    return traverse(rootDir)
      .then(initialPaths => {
        initialPaths.forEach(path => this.addPath(path));

        for (const debounced of this.debouncedMethods) {
          debounced.flush();
        }

        if (this.options.watch) {
          log.info('Initial generation completed; watching for changes...');

          const watcher = watch(rootDir, this.getSaneOptions());

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
