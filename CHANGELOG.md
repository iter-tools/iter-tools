# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## Unreleased
### Added
 -  Added `iterable` and `asyncIterable`. These methods are NOT the same as `iter` and `asyncIter`. What they do is exactly the opposite!
 -  Added `some`, `every`, `tap`, `first`, `takeSorted`, `asyncBuffer`, `toArray` and `asyncToArray` methods.
 -  Added aliases:
 	-  `concat` and `asyncConcat` for `chain` and `asyncChain`
 	-  `zipAll` and `asyncZipAll` for `zipLongest` and `asyncZipLongest`
 -  Added overload to `reduce`: `reduce(initialValue, reducer, iterable)`
 -  Added overload to `reduceAsync`: `reduceAsync(initialValue, reducer, iterable)`
 - slice/asyncSlice are now supporting negative start/end

### Deprecated
 -  Deprecated `iter` and `asyncIter`

### Removed
 -  Removed `asyncMapBatch`
 -  Removed filler argument from zipLongest: `zipLongest(filler, ...iterables)` => `zipLongest(...iterables)`

### Changed
 -  **All methods:** Object parameters are no longer implicitly treated as iterables, and will throw errors.
 -  **All curried methods:** passing `null` and `undefined` as the iterable will always result in those values being coerced to iterables. Currying happens based on `arguments.length`.
 -  `reduce` behavior now matches `Array.reduce`, which means that the initial come from a parameter with a default value. Such a reducer function might look like: `(acc = 0, val) => acc + val`.
 -  `compose([...fns])` => `compose(...fns)`
 -  `asyncRegexpExecIter` and `asyncRegexpSplitIter` now coerce sync iterables to async iterables, matching behavior of all other async methods.
 -  `regexpExec` now ensures its RegExp parameter is global unless it is already sticky.



## [5.0.0] - 2018-6-20
### Added
 -  Added `keys`, `values`, `entries`, `size`, and `find` methods.

### Changed
 -  The behavior of `iter(iter(iterable))` should now be considered undefined.
 -  `asyncZip` and `asyncZipLongest` now run items in parallel

### Fixed
 -  `iter({next: 'foo'})` now returns `Iterator[[next, 'foo']]` not `{next: 'foo'}`. This is particular to objects having any property named next.



## [4.1.0] - 2018-6-12
### Added
 - Added `asyncThrottle`, `consume`, `asyncConsume`, `batch`, `asyncBatch`, `asyncMapBatch`, `regexpExecIter`, and `asyncRegexpExecIter`.



## [4.0.0] - 2018-6-2
### Changed
 -  Changed **the whole way the library is imported.** Very breaking.



### Find earlier history [on GitHub](https://github.com/sithmel/iter-tools/commits/master?before=3c215852eae92417f3ea28ac2abfe56f1cea83fa+35)
