# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [7.0.0] - UNRELEASED
### Removed
 - iter, asyncIter
 - chain, asyncChain (replaced by concat, asyncConcat)
 - count (use range instead)
 - zipLongest, asyncZipLongest (replaced by zipAll, asyncZipAll)
 - iterable, asyncIterable
 - tee, asyncTee
 - merge, asyncMerge, mergeByComparison, mergeByChance, mergeByPosition, asyncMergeByComparison, asyncMergeByChance, asyncMergeByPosition
 - Removed concurrency argument from asyncMap and asyncFilter.
 - Extra arguments removed from chaining methods (compose, pipe, pipeExec). Previously all initial arguments were given to the outermost function in the chain.

### Renamed
 - pipe to execPipe

### Added
 - pipe
 - splitAt/asyncSplitAt
 - call, apply
 - firstOr
 - asyncMapParallel, asyncFilterParallel, asyncFlatMapParallel

### Changes
 - All functions return iterables that can consumed multiple times.
 - takeSorted/asyncTakeSorted optional comparator is now the first argument.
 - Optional configuration arguments can no longer be undefined. This was at odds with considering undefined as a valid iterable.
 - find takes an extra optional argument: the value to return if the nothing is found.
 - fork/asyncFork takes an extra optional argument: the number of forks.
 - permutations, combinations, combinationsWithReplacement: order of arguments is changed. Can now be curried.
 - groupBy()/asyncGroupBy(null) now return a partial application instead of an iterable.
 - For most Typescript generic method types, the order of the generics has changed. (Note: this only matters if you are explicitly providing values for the generics.)

### Fixed
 - asyncMap, asyncFilter: they didn't work correctly with concurrency greater than 1

## [6.2.3] - 2019-1-23
### Added
 -  flat, asyncFlat, cursor, asyncCursor, merge, asyncMerge, pipe, partition, async-partition

### Fixed
 -  async function can take an async callback
 -  find, asyncFind: they return undefined when an item has not been found

### Changed
 -  async-map, async-filter takes an extra optional argument "concurrency"
 -  combinatory function generators return an iterable with an extra method to calculate the size

## [6.1.7] - 2018-11-06
### Fixed
 -  Added polyfills to transpiled versions

## [6.1.6] - 2018-11-06
### Fixed
 -  Bump all deps (code vulnerability)

## [6.1.5] - 2018-10-23
### Fixed
 -  Removed clone-regexp dependency

## [6.1.4] - 2018-9-22
### Fixed
 -  Typescript definitions

## [6.1.3] - 2018-9-12
### Fixed
 -  Typescript definitions


## [6.1.0] - 2018-9-9
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
