# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).


## [7.0.0-rc.1] - UNRELEASED
### Removed
**Methods**
 -  `iter`, `asyncIter`
 -  `iterable`, `asyncIterable`
 -  `tee`, `asyncTee`
 -  `merge`, `asyncMerge` (Instead use either `collate` or `interleave`.)
 -  `splitLines`, `asyncSplitLines`

**Aliases**
 -  `count` was an alias for `range`
 -  `chain`, `asyncChain` were aliases for `concat`, `asyncConcat`
 -  `zipLongest`, `asyncZipLongest` were aliases for `zipAll`, `asyncZipAll`

**Arguments**
 -  `concurrency` from `asyncMap`, `asyncFilter`.
 -  Extra arguments from `compose`, `pipe`, `pipeExec`. Previously all initial arguments were given to the outermost composed function.

**Helper methods**
 -  `mergeByComparison`, `mergeByChance`, `mergeByPosition`, `asyncMergeByComparison`, `asyncMergeByChance`, `asyncMergeByPosition`

### Renamed
**Methods**
 -  `pipe` to `execPipe`

### Added
**Methods**
 -  `pipe`
 -  `collate`, `asyncCollate`
 -  `call`, `apply`
 -  `wrap`, `asyncWrap`
 -  `firstOr`, `asyncFirstOr`
 -  `when`
 -  `isEmpty`, `asyncIsEmpty`
 -  `asyncMapParallel`, `asyncFilterParallel`, `asyncFlatMapParallel`
 -  `interleave`, `asyncInterleave`, `asyncInterleaveReady`
 -  `equal`, `asyncEqual`
 -  `includes`, `includesAny`, `includesSubseq`, `includesAnySubseq`, `asyncIncludes`, `asyncIncludesAny`, `asyncIncludesSubseq`, `asyncIncludesAnySubseq`
 -  `startsWith`, `startsWithAny`, `startsWithSubseq`, `startsWithAnySubseq`, `asyncStartsWith`, `asyncStartsWithAny`, `asyncStartsWithSubseq`, `asyncStartsWithAnySubseq`
 -  `splitOn`, `splitOnAny`, `splitOnSubseq`, `splitOnAnySubseq`, `asyncSplitOn`, `asyncSplitOnAny`, `asyncSplitOnSubseq`, `asyncSplitOnAnySubseq`
 -  `splitWith`, `asyncSplitWith`
 -  `splitAt`, `asyncSplitAt`
 -  `joinWith`, `joinWithSubseq`, `asyncJoinWith`, `asyncJoinWithSubseq`
 -  `joinAsStringWith`, `asyncJoinAsStringWith`
 -  `explode`, `asyncExplode`

**Arguments**
 -  [optional] `forks` (count) for `fork` and `asyncFork`
 -  [optional] `filler` (specified as `{ filler }`) for `zip` and `zipAll`
 -  [optional] `notFoundValue` for `find` and `asyncFind`

**Overloads**
 -  `range(start, end, [step])` (Matches Python.)

 ### Fixed
 -  A wide variety of Typescript type bugs were identified and squashed. You can see the full list [on Github](https://github.com/iter-tools/iter-tools/issues?utf8=%E2%9C%93&q=is%3Aissue+label%3Agenerate-types)

### Changed
 - **IMPORTANT**; **BREAKING**: `slice(n)` is now equivalent to `[].slice(n)`, not `[].slice(0, n)`. You should now write `slice(0, n, iterable)`.
 - All functions return iterables that can consumed multiple times.
 - `takeSorted` and `asyncTakeSorted`: optional comparator is now the first argument.
 - Optional configuration arguments can no longer be undefined. This was at odds with considering undefined as a valid iterable.
 - `find` takes an extra optional argument: the value to return if the nothing is found.
 - `range` can now called as either `range(end)` or `range(start, end, step)`. This matches Python.
 - `zipAll` now takes optional `filler` argument to use in place of values from exhausted iterables.
 - `fork` and `asyncFork` now take an extra optional argument: the number of forks.
 - `permutations`, `combinations`, `combinationsWithReplacement`: order of arguments is changed. Can now be curried.
 - `permutations`, `combinations`, `combinationsWithReplacement`, and `product`: `getSize()` is now just `size`.
 - `groupBy()` and `asyncGroupBy(null)` now return a partial application instead of an iterable.
 - For most Typescript generic method types, the order of the generics has changed. (Note: this only matters if you are explicitly providing values for the generics.)


## [6.2.3] - 2019-1-23
### Added
**Methods**
 -  `flat`, `asyncFlat`
 -  `cursor`, `asyncCursor`
 -  `merge`, `asyncMerge`
 -  `pipe`
 -  `partition`, `asyncPartition`

**Helper methods**
 -  `mergeByComparison`, `mergeByChance`, `mergeByPosition`, `asyncMergeByComparison`, `asyncMergeByChance`, `asyncMergeByPosition`

**Arguments**
 -  [optional] `concurrency` for `asyncMap`, `asyncFilter`

### Fixed
 -  async function can take an async callback
 -  `find` and `asyncFind`: now return undefined when an item has not been found

### Changed
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
### Removed
**Methods**
 -  `asyncMapBatch`

**Arguments**
 -  `filler` argument from `zipLongest`, `asyncZipLongest`
 
### Deprecated
 -  `iter`, `asyncIter`

### Added
**Methods**
 -  `iterable`, `asyncIterable` (NOTE: These methods are NOT the same as `iter` and `asyncIter`. What they do is exactly the opposite!)
 -  `some`, `asyncSome`
 -  `every`, `asyncEvery`
 -  `tap`, `asyncTap`
 -  `first`, `asyncFirst`,
 -  `takeSorted`, `asyncTakeSorted`
 -  `toArray`, `asyncToArray`
 -  `asyncBuffer`

**Aliases**
 -  `concat` and `asyncConcat` for `chain` and `asyncChain`
 -  `zipAll` and `asyncZipAll` for `zipLongest` and `asyncZipLongest`

**Arguments**
-  [optional] `initial` for `reduce` and `asyncReduce`. If no initial value is specified, the first item will be used.

### Changed
 -  **All methods:** Object parameters are no longer implicitly treated as iterables, and will throw errors.
 -  **All curried methods:** passing `null` and `undefined` as the iterable will always result in those values being coerced to iterables. Currying happens based on `arguments.length`.
 -  `compose([...fns])` => `compose(...fns)`
 -  `asyncRegexpExecIter` and `asyncRegexpSplitIter` now coerce sync iterables to async iterables, matching behavior of all other async methods.
 -  `regexpExec` now ensures its RegExp parameter is global unless it is already sticky.
 -  `slice` and `asyncSlice` now support negative `start` and `end`.


## [5.0.0] - 2018-6-20
### Added
**Methods**
 -  `keys`, `values`, `entries`
 -  `size`
 -  `find`

### Changed
 -  The behavior of `iter(iter(iterable))` should now be considered undefined.
 -  `asyncZip` and `asyncZipLongest` now run items in parallel

### Fixed
 -  `iter({next: 'foo'})` now returns `Iterator[[next, 'foo']]` not `{next: 'foo'}`. This is particular to objects having any property named next.


## [4.1.0] - 2018-6-12
### Added
**Methods**
 -  `consume`, `asyncConsume`
 -  `batch`, `asyncBatch`, `asyncMapBatch`
 -  `regexpExecIter`, `asyncRegexpExecIter`
 -  `asyncThrottle`

## [4.0.0] - 2018-6-2
### Changed
 -  Changed **the whole way the library is imported.** Very breaking.


### Find earlier history [on GitHub](https://github.com/sithmel/iter-tools/commits/master?before=3c215852eae92417f3ea28ac2abfe56f1cea83fa+35)
