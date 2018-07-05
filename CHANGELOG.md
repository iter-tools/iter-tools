# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## Unreleased
### Added
 -  `zip`, `entries`, and `enumerate` all have additional `reuseEntry` parameter for performance optimization.

### Changed
 -  Removed `asyncMapBatch`
 -  `compose([...fns])` => `compose(...fns)`
 -  `zip(...iterables)` => `zip([...iterables])`
 -  `zipLongest(...iterables)` => `zipLongest([...iterables])`



## [5.0.0] - 2018-6-20
### Added
 -  Added `keys`, `values`, `entries`, `size`, and `find` methods.

### Changed
 -  `iter(iter(iterable))` is now an error.
 -  `asyncZip` and `asyncZipLongest` now run items in parallel

### Fixed
 -  `iter({next: 'foo'})` now returns `Iterator[[next, 'foo']]` not `{next: foo}`. This is particular to objects having any property named next.



## [4.1.0] - 2018-6-12
### Added
 - Added `asyncThrottle`, `consume`, `asyncConsume`, `batch`, `asyncBatch`, `asyncMapBatch`, `regexpExecIter`, and `asyncRegexpExecIter`.



## [4.0.0] - 2018-6-2
### Changed
 -  Changed **the whole way the library is imported.** Very breaking.


### Find earlier history [on GitHub](https://github.com/sithmel/iter-tools/commits/master?before=3c215852eae92417f3ea28ac2abfe56f1cea83fa+35)
