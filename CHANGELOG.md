# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).


## [Unreleased]
### Changed
 -  `splitAt` and `asyncSplitAt` now return string parts when splitting strings.

### Added
**Methods**
 -  `equalFactory`
 -  `deepEqual`, `deepEqualFactory`
 -  `sort`, `asyncSort`

**Arguments**
 -  `compare` argument of form `(a, b) => boolean` appended to:
    -  `startsWith`, `startsWithAny`, `startsWithSubseq`, `startsWithAnySubseq`
    -  `includes`, `includesAny`, `includesSubseq`, `includesAnySubseq`
    -  `splitOn`, `splitOnAny`, `splitOnSubseq`, `splitOnAnySubseq`



## [7.0.0-rc.0] - 2019-12-13
### Removed
**Methods**
 -  `iter`, `asyncIter`
 -  `iterable`, `asyncIterable`
 -  `tee`, `asyncTee`
 -  `execute`, `asyncExecute` (Instead use `map(_ => callback(), range())` (or `asyncMap(...)`))
 -  `merge`, `asyncMerge` (Instead use `collate`, `roundRobin`, `interleave` (or async equivalents))
 -  `splitLines`, `asyncSplitLines` (Instead use `asyncMap(asyncJoinAsString, asyncSplitOnAnySubseq(['\r\n', '\n'], asyncFlat(fileChunks)))` or `splitOnAnySubseq(['\r\n', 'n'], fileString)`. Sorry, a better way is coming soon!)
 -  `regexpSplit` (Instead use `splitWith(regexp, str)`)
 -  `cursor`, `asyncCursor` (Instead use `leadingWindow` or `trailingWindow` (or async equivalents))
 -  `keys` (Instead use `objectKeys(obj)` or `wrapKeys({ keys(); }))`)
 -  `values` (Instead use `objectValues(obj)` or `wrapValues({ values(); }))`)
 -  `entries` (Instead use `objectEntries(obj)` or `wrapEntries({ entries(); }))`)

**Overloads**
 -  `size({ size })` and `size(array)` (Instead use `getSize`)
 -  `cycle(times, iterable)`, `asyncCycle(times, iterable)` and `repeat(times, value)` (Instead use `cycleTimes(n, iterable)` (or `asyncCycleTimes`), and `repeatTimes(n, iterable)`)

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
 -  `roundRobin`, `asyncRoundRobin`
 -  `call`, `apply`
 -  `wrap`, `asyncWrap`
 -  `wrapKeys`
 -  `wrapValues`
 -  `wrapEntries`
 -  `objectKeys`
 -  `objectValues`
 -  `objectEntries`
 -  `toObject`, `asyncToObject`
 -  `findOr`, `asyncFindOr`
 -  `firstOr`, `asyncFirstOr`
 -  `last`, `asyncLast`
 -  `lastOr`, `asyncLastOr`
 -  `take`, `asyncTake`
 -  `drop`, `asyncDrop`
 -  `when`
 -  `isEmpty`, `asyncIsEmpty`
 -  `asyncMapParallel`, `asyncFilterParallel`, `asyncFlatMapParallel`
 -  `interleave`, `asyncInterleave`, `asyncInterleaveReady`
 -  `equal`, `asyncEqual`
 -  `includes`, `includesAny`, `includesSubseq`, `includesAnySubseq`, `asyncIncludes`, `asyncIncludesAny`, `asyncIncludesSubseq`, `asyncIncludesAnySubseq`
 -  `startsWith`, `startsWithAny`, `startsWithSubseq`, `startsWithAnySubseq`, `asyncStartsWith`, `asyncStartsWithAny`, `asyncStartsWithSubseq`, `asyncStartsWithAnySubseq`
 -  `splitOn`, `splitOnAny`, `splitOnSubseq`, `splitOnAnySubseq`, `asyncSplitOn`, `asyncSplitOnAny`, `asyncSplitOnSubseq`, `asyncSplitOnAnySubseq`
 -  `split`, `asyncSplit`
 -  `splitWith`, `asyncSplitWith`
 -  `splitAt`, `asyncSplitAt`
 -  `join`, `asyncJoin`
 -  `joinWith`, `joinWithSubseq`, `asyncJoinWith`, `asyncJoinWithSubseq`
 -  `joinAsString`, `joinAsStringWith`, `asyncJoinAsString`, `asyncJoinAsStringWith`
 -  `group`, `asyncGroup`
 -  `explode`, `asyncExplode`
 -  `reverse`, `asyncReverse`
 -  `leadingWindow`, `asyncLeadingWindow`
 -  `trailingWindow`, `asyncTrailingWindow`
 -  `cycleTimes`, `asyncCycleTimes`
 -  `repeatTimes`
 -  `getSize`

**Aliases**
 -  `arrayFrom`, `arrayFromAsync` as aliases for `toArray`, `asyncToArray`
 -  `objectFrom`, `objectFromAsync` as aliases for `toObject`, `asyncToObject`

**Arguments**
 -  [optional] `n` (count) for `fork` and `asyncFork`
 -  [optional] `n` (count) for `cycle` and `asyncCycle`
 -  [optional] `filler` (specified as `{ filler }`) for `zip` and `zipAll`
 -  [optional] `notFoundValue` for `find` and `asyncFind`

**Overloads**
 -  `range(start, end, [step])` (Matches Python.)

### Deprecated
**Overloads**
 -  `groupBy(null, source)` and `asyncGroupBy(null, source)`. Instead use `group(source)` and `asyncGroup(source)`.
 -  `consume(callback, source)` and `asyncConsume(callback, source)`. Instead use `forEach(callback, source)` and `asyncForEach(callback, source)`.

### Changed
 -  `import 'iter-tools/es5/method'` should now be `import 'iter-tools/method'`.
 -  **IMPORTANT**; **BREAKING**: `slice(n)` is now equivalent to `[].slice(n)`, not `[].slice(0, n)`. You should now write `slice(0, n, iterable)`.
 -  **IMPORTANT**; **BREAKING**: `repeat` order of arguments changed. You must now write `repeat(3, 'x')` instead of `repeat(x, 3)`.
 -  All functions return iterables that can consumed multiple times.
 -  It is now an error to make an empty partial application, e.g. `map()`.
 -  `size(iterable)` now always consumes `iterable`. Use `getSize` if you know this is unnecessary.
 -  `takeSorted` and `asyncTakeSorted`: Both `n` and `comparator` arguments are now optional.
 -  `enumerate` and `asyncEnumerate`: optional starting idx is now specified before iterable. 
 -  Optional configuration arguments can no longer be undefined. This was at odds with considering undefined as a valid iterable.
 -  `range` can now called as either `range(end)` or `range(start, end, step)`. This matches Python.
 -  `zipAll` now takes optional `filler` argument to use in place of values from exhausted iterables.
 -  `fork` and `asyncFork` now take an extra optional argument: the number of forks.
 -  `permutations`, `combinations`, `combinationsWithReplacement`: order of arguments is changed. Can now be curried.
 -  `permutations`, `combinations`, `combinationsWithReplacement`, and `product`: `getSize()` is now just `size`.
 -  `groupBy()` and `asyncGroupBy(null)` now return a partial application instead of an iterable.
 -  `groupBy` now throws an error if the groups are accessed out of order.
 -  `asyncBuffer` now starts buffering immediately instead of when the first item is taken.
 -  For most Typescript generic method types, the order of the generics has changed. (Note: this only matters if you are explicitly providing values for the generics.)

 ### Fixed
 -  A wide variety of Typescript type bugs were identified and squashed. You can see the full list [on Github](https://github.com/iter-tools/iter-tools/issues?utf8=%E2%9C%93&q=is%3Aissue+label%3Agenerate-types)



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
