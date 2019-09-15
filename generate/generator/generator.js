const fs = require('fs');
const loglevel = require('loglevel');

const { handleError } = require('./utils');
const { matcher } = require('./matcher');
const { isGeneratedFromTemplate } = require('./comments');

const log = loglevel.getLogger('generator');

const ADD = 'ADD';
const REMOVE = 'REMOVE';

class Generator {
  static get ADD() {
    return ADD;
  }
  static get REMOVE() {
    return REMOVE;
  }

  constructor(options) {
    const { watch, multiGenerator } = options;

    this.configurations = [null];
    this.ignored = [];
    this.glob = '**';
    this.inWatchMode = false;
    this.shouldWatch = watch;
    this.multiGenerator = multiGenerator;
    this.options = options;
  }

  get generatedPaths() {
    return this.multiGenerator.generatedPaths;
  }

  resolve(path) {
    return this.multiGenerator.resolve(path);
  }

  shouldProcess(path) {
    this._matcher = this._matcher || matcher(this.glob);
    this._ignoreMatcher = this._ignoreMatcher || matcher(this.ignored);

    return this._matcher(path) && !this._ignoreMatcher(path);
  }

  generatePathPerConfiguration(sourceFilename, operation) {
    if (this.recordOperation) this.recordOperation(sourceFilename, operation);
    if (!this.getDestPath) return;

    for (const configuration of this.configurations) {
      const destPath = this.getDestPath(sourceFilename, configuration);

      if (operation === REMOVE) {
        this.generatedPaths.delete(destPath);
        try {
          if (isGeneratedFromTemplate(destPath)) {
            fs.unlinkSync(destPath);
          }
        } catch (e) {}
      } else {
        try {
          const content = this.generatePath(sourceFilename, destPath, configuration);
          if (content !== null) {
            this.write(destPath, content);
          }
        } catch (e) {
          console.warn(`Failed generating ${destPath}`);
          handleError(e);
        }
      }
    }
  }

  write(path, content) {
    fs.writeFileSync(this.resolve(path), content);
    this.generatedPaths.add(path);
    if (!this.inWatchMode) {
      this.multiGenerator.addPath(path);
    }
  }

  writeMonolithic(path, content) {
    if (this.generatedPaths.isStale(path, content)) {
      fs.writeFileSync(this.resolve(path), content);
      this.generatedPaths.cache(path, { monolithic: true });
    }
  }

  pathsChanged() {
    if (this.afterPathsChanged) {
      this.afterPathsChanged();
    }
  }

  pathAdded(path) {
    this.generatePathPerConfiguration(path, ADD);
  }

  pathRemoved(path) {
    this.generatePathPerConfiguration(path, REMOVE);
  }

  pathUpdated(path) {
    if (this.generatedPaths.getAttribute(path, 'monolithic')) {
      this.pathsChanged();
    } else {
      this.generatePathPerConfiguration(path);
    }
  }

  /**
   * Do an initial tree traversal, then watch for changes
   */
  generate() {
    this.initial().then(() => {
      if (this.shouldWatch) {
        log.info('Initial generation completed; watching for changes...');
        this.watch();
      }
    });
  }
}

module.exports = Generator;
