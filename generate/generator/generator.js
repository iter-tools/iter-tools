const fs = require('fs');
const { join } = require('path');
const sane = require('sane');
const loglevel = require('loglevel');
const { path: rootDir } = require('package.root');

const { debounce, filter, wrapWithArray } = require('./utils');
const { isGeneratedFromTemplate } = require('./comments');
const FileCache = require('./file-cache');
const traverse = require('./traverse');

const log = loglevel.getLogger('generator');

const ADD = 'ADD';
const REMOVE = 'REMOVE';

function handleError(e) {
  console.error(e);
  process.exit(1);
}

class Generator {
  constructor(options) {
    const { watch, quiet, multiGenerator } = options;

    this.configurations = [null];
    this.ignored = ['.git', 'node_modules'];
    this.glob = '**';
    this.inWatchMode = false;
    this.shouldWatch = watch;
    this.rootGenerator = multiGenerator || this;
    this.options = options;

    if (!multiGenerator) {
      // TODO How can I make this more DRY?
      this.pathsChanged = debounce(this.pathsChanged.bind(this), 50);
      this.generatedPaths = multiGenerator ? null : new FileCache();

      log.setLevel(quiet ? 'error' : 'info');
    }
  }

  get generatedPaths() {
    return this.rootGenerator.generatedPaths;
  }

  generatePathPerConfiguration(sourceFilename, operation) {
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

  resolve(path) {
    return join(rootDir, path);
  }

  write(path, content) {
    fs.writeFileSync(this.resolve(path), content);
    this.generatedPaths.add(path);
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

  addPath(path) {
    this.generatePathPerConfiguration(path, ADD);
    this.rootGenerator.pathsChanged();
  }

  removePath(path) {
    this.generatePathPerConfiguration(path, REMOVE);
    this.rootGenerator.pathsChanged();
  }

  updatePath(path) {
    if (this.generatedPaths.getAttribute(path, 'monolithic')) {
      this.rootGenerator.pathsChanged();
    } else {
      this.generatePathPerConfiguration(path);
    }
  }

  getSaneOptions() {
    const { poll, watchman, watchmanPath } = this.options;
    return { poll, watchman, watchmanPath };
  }

  /**
   * Use a file watcher to incrementally rebuild when files change
   */
  watch() {
    const { ignored, monolithicPaths, glob: _glob } = this;
    const glob = [...wrapWithArray(_glob), ...monolithicPaths];

    const watcher = sane(rootDir, Object.assign({ glob, ignored }, this.getSaneOptions()));

    this.inWatchMode = true;

    watcher.on('add', path => this.addPath(path));
    watcher.on('delete', path => this.removePath(path));
    watcher.on('change', path => this.updatePath(path));
  }

  initial() {
    const { ignored, glob, generatedPaths } = this;

    return traverse(rootDir, { glob, ignored })
      .then(initialPaths => {
        initialPaths.forEach(path => this.addPath(path));

        this.rootGenerator.pathsChanged.flush();

        this.monolithicPaths = [
          ...filter(path => generatedPaths.getAttribute(path, 'monolithic'), generatedPaths),
        ];
      })
      .catch(handleError);
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
