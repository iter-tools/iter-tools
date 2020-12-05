# The iter-tools API

[![Documentation is automatically generated](https://img.shields.io/static/v1?label=docs&message=generated&color=informational)](https://github.com/iter-tools/iter-tools/blob/master/CONTRIBUTING.md#the-code-generator)

The API documentation is split into to main sections: [types](#types) and [methods](#methods).

## Types

Many APIs share types. These named types are used in the formal type definitions, but also throughout the documentation for consistency and clarify.

If you aren't already familiar with the technical definition of an iterable and an iterator, I strongly recommend you first read the MDN docs on [iterators and generators](https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Iterators_and_Generators) and [iteration protocols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols).

### Iterable

An object implementing the iterable protocol, which is to say possessing a `[Symbol.iterator]()` method

### AsyncIterable

An object implementing the async iterable protocol, which is to say possessing a `[Symbol.asyncIterator]()` method

### SourceIterable

`null`, `undefined`, or [Iterable](#iterable).

### AsyncSourceIterable

`null`, `undefined`, [AsyncIterable](#asynciterable), or [Iterable](#iterable).

### ResultIterable

An [Iterable](#iterable) which is also an iterator, which is to say that it has `next()`, `throw(error)`, and `return(value)` methods. It can be evaluated multiple times calling its `[Symbol.iterator]()` method repeatedly. Note that there is no guarantee that evaluating a result iterable more than once will produce the same values. The result will be repeatable only if any transformations are repeatable and the source iterable guarantees that multiple iterations will have the same result (e.g. `Object.freeze(array)`).

### AsyncResultIterable

The async version of a [ResultIterable](#resultiterable). Instead of working as an [Iterable](#iterable) and an iterator, it behaves like an [AsyncIterable](#asynciterable) and an async iterator. The same caveats apply regarding evaluating this kind of result iterable more than once.

### PartsIterable

A [ResultIterable](#resultiterable) of [PartIterables](#partiterable) which represents the result of some method-specic algorithm for choosing split points in a `source`. Parts are non-overlapping, and the ordering of values is maintained from `source`. While a parts iterable yields multiple part iterables, only one part -- the most recently taken -- can be active at a time. Trying to take values from a part which is not active will trigger an error. Working around this limitation is simple when needed, you just need to store the parts as they are generated. This can be done with `map(toArray, partsIterable)`.

### PartIterable

An [Iterable](#iterable) iterator yielded from a [PartsIterable](#partsiterable). A `PartIterable` is stateful, meaning that you can only consume it once (and only before the next part becomes active).

### AsyncPartsIterable

The async version of a [PartsIterable](#partsiterable), which is to say an [AsyncResultIterable](#asyncresultiterable) of [AsyncPartIterables](#asyncpartiterable). As with `PartsIterabe`, only one part is active at a time.

### AsyncPartIterable

An [AsyncIterable](#asynciterable) iterator yielded from an [AsyncPartsIterable](#asyncpartsiterable). An `AsyncPartIterable` is stateful, meaning that you can only consume it once (and only before the next part becomes active).

### Comparator

A comparator is used to determine sort order. Comparators in iter-tools exactly match the comparator API expected by `Array.prototype.sort`. Comparators are always sync functions, even when sorting async iterables.

#### The Default Comparator

The default comparator is the same as that used by `Array.prototype.sort`:
```js
(a, b) => a > b ? 1 : b > a ? -1 : 0;
```
It will sort numbers by their value, and strings lexicographically.


## Methods

Create iterables

[cycle](#cycle) ([async](#asynccycle))  
[cycleTimes](#cycletimes) ([async](#asynccycletimes))  
[range](#range)  
[repeat](#repeat)  
[repeatTimes](#repeattimes)  

Create iterables from objects

[objectEntries](#objectentries)  
[objectKeys](#objectkeys)  
[objectValues](#objectvalues)  

Use iterables from data structures

[wrapEntries](#wrapentries)  
[wrapKeys](#wrapkeys)  
[wrapValues](#wrapvalues)  

Transform a single iterable

[append](#append) ([async](#asyncappend))  
[drop](#drop) ([async](#asyncdrop))  
[dropWhile](#dropwhile) ([async](#asyncdropwhile))  
[enumerate](#enumerate) ([async](#asyncenumerate))  
[filter](#filter) ([async](#asyncfilter)) ([parallel-async](#asyncfilterparallel))  
[flat](#flat) ([async](#asyncflat))  
[flatMap](#flatmap) ([async](#asyncflatmap)) ([parallel-async](#asyncflatmapparallel))  
[interpose](#interpose) ([async](#asyncinterpose))  
[interposeSeq](#interposeseq) ([async](#asyncinterposeseq))  
[map](#map) ([async](#asyncmap)) ([parallel-async](#asyncmapparallel))  
[prepend](#prepend) ([async](#asyncprepend))  
[reverse](#reverse) ([async](#asyncreverse))  
[slice](#slice) ([async](#asyncslice))  
[take](#take) ([async](#asynctake))  
[takeSorted](#takesorted) ([async](#asynctakesorted))  
[takeWhile](#takewhile) ([async](#asynctakewhile))  
[tap](#tap) ([async](#asynctap))  
[window](#window) ([async](#asyncwindow))  
[leadingWindow](#leadingwindow) ([async](#asyncleadingwindow))  
[trailingWindow](#trailingwindow) ([async](#asynctrailingwindow))  
[wrap](#wrap) ([async](#asyncwrap))  

Separate an iterable into multiple iterables

[batch](#batch) ([async](#asyncbatch))  
[group](#group) ([async](#asyncgroup))  
[groupBy](#groupby) ([async](#asyncgroupby))  
[split](#split) ([async](#asyncsplit))  
[splitAt](#splitat) ([async](#asyncsplitat))  
[splitOn](#spliton) ([async](#asyncspliton))  
[splitOnAny](#splitonany) ([async](#asyncsplitonany))  
[splitOnAnySeq](#splitonanyseq) ([async](#asyncsplitonanyseq))  
[splitOnSeq](#splitonseq) ([async](#asyncsplitonseq))  
[splitWhen](#splitwhen) ([async](#asyncsplitwhen))  
[splitWith](#splitwith) ([async](#asyncsplitwith))  

Combine multiple iterables

[collate](#collate) ([async](#asynccollate))  
[compress](#compress) ([async](#asynccompress))  
[concat](#concat) ([async](#asyncconcat))  
[asyncInterleaveReady](#asyncinterleaveready)  
[join](#join) ([async](#asyncjoin))  
[joinWith](#joinwith) ([async](#asyncjoinwith))  
[joinWithSeq](#joinwithseq) ([async](#asyncjoinwithseq))  
[roundRobin](#roundrobin) ([async](#asyncroundrobin))  
[zip](#zip) ([async](#asynczip))  
[zipAll](#zipall) ([async](#asynczipall))  

Reduce an iterable to a single value

[equal](#equal) ([async](#asyncequal))  
[every](#every) ([async](#asyncevery))  
[find](#find) ([async](#asyncfind))  
[findOr](#findor) ([async](#asyncfindor))  
[first](#first) ([async](#asyncfirst))  
[firstOr](#firstor) ([async](#asyncfirstor))  
[includes](#includes) ([async](#asyncincludes))  
[includesAny](#includesany) ([async](#asyncincludesany))  
[includesAnySeq](#includesanyseq) ([async](#asyncincludesanyseq))  
[includesSeq](#includesseq) ([async](#asyncincludesseq))  
[isEmpty](#isempty) ([async](#asyncisempty))  
[isSorted](#issorted) ([async](#asyncissorted))  
[reduce](#reduce) ([async](#asyncreduce))  
[size](#size) ([async](#asyncsize))  
[some](#some) ([async](#asyncsome))  
[startsWith](#startswith) ([async](#asyncstartswith))  
[startsWithAny](#startswithany) ([async](#asyncstartswithany))  
[startsWithAnySeq](#startswithanyseq) ([async](#asyncstartswithanyseq))  
[startsWithSeq](#startswithseq) ([async](#asyncstartswithseq))  
[str](#stringfrom) ([async](#stringfromasync))  
[takeLast](#takelast) ([async](#asynctakelast))  
[takeLastOr](#takelastor) ([async](#asynctakelastor))  

Combinatory iterables

[combinations](#combinations)  
[combinationsWithReplacement](#combinationswithreplacement)  
[permutations](#permutations)  
[product](#product)  

Control timing inside an async iterable

[asyncBuffer](#asyncbuffer)  
[asyncThrottle](#asyncthrottle)  

Cache an iterable

[fork](#fork) ([async](#asyncfork))  

Consume an iterable

[arrayFrom](#arrayfrom)  
[arrayFromAsync](#arrayfromasync)  
[consume](#consume) ([async](#asyncconsume))  
[forEach](#foreach) ([async](#asyncforeach))  
[objectFrom](#objectfrom)  
[objectFromAsync](#objectfromasync)  
[stringFrom](#stringfrom)  
[stringFromAsync](#stringfromasync)  
[toArray](#arrayfrom) ([async](#arrayfromasync))  
[toObject](#objectfrom) ([async](#objectfromasync))  

Predicates (test a value)

[isAsyncIterable](#isasynciterable)  
[isAsyncLoopable](#isasyncloopable)  
[isAsyncWrappable](#isasyncwrappable)  
[isIterable](#isiterable)  
[isLoopable](#isloopable)  
[isNil](#isnil)  
[isNull](#isnull)  
[isUndefined](#isundefined)  
[isWrappable](#iswrappable)  
[notAsyncIterable](#notasynciterable)  
[notAsyncLoopable](#notasyncloopable)  
[notAsyncWrappable](#notasyncwrappable)  
[notIterable](#notiterable)  
[notLoopable](#notloopable)  
[notNil](#notnil)  
[notNull](#notnull)  
[notUndefined](#notundefined)  
[notWrappable](#notwrappable)  

Utilities

[apply](#apply)  
[arrayFirst](#arrayfirst)  
[arrayFirstOr](#arrayfirstor)  
[arrayLast](#arraylast)  
[arrayLastOr](#arraylastor)  
[arrayReverse](#arrayreverse)  
[call](#call)  
[compose](#compose)  
[execPipe](#execpipe)  
[getSize](#getsize)  
[pipe](#pipe)  
[when](#when)  

Generator helpers

[interleave](#interleave) ([async](#asyncinterleave))  
[peekerate](#peekerate) ([async](#asyncpeekerate))  
[spliterate](#spliterate) ([async](#asyncspliterate))  
[spliterateGrouped](#spliterategrouped) ([async](#asyncspliterategrouped))  


## Create iterables

### cycle

**cycle([source](#sourceiterable))**  
**__cycle([source](#iterable))**  

Yields the contents of `iterable` repeated for the longest time (forever).

```js
cycle(range(1, 4)); // Iterable[1, 2, 3, 1, 2, 3, 1, 2, 3, ...]
```

### asyncCycle

**asyncCycle([source](#asyncsourceiterable))**  
**__asyncCycle([source](#asynciterable))**  

See [cycle](#cycle)

### cycleTimes

**cycleTimes(n, [source](#sourceiterable))**  
**__cycleTimes([source](#iterable), n)**  

Yields the contents of `iterable` repeated `n` times.

```js
cycleTimes(2, range(1, 4)); // Iterable[1, 2, 3, 1, 2, 3]
```

### asyncCycleTimes

**asyncCycleTimes(n, [source](#asyncsourceiterable))**  
**__asyncCycleTimes([source](#asynciterable), n)**  

See [cycleTimes](#cycletimes)

### range

**range(start, end, ?step)**  
**range(?end)**  
**range({ start, end, step })**  
**__range(start, end, step)**  
**__range(start, end, step)**  

Defaults:

- `start`: 0
- `end`: Infinity
- `step`: 1

Create an iterable returning a sequence of numbers (the sequence can be infinite).

```js
range(); // 0, 1, 2 ... Infinity
range(3); // 0, 1, 2
range(3, 6); // 3, 4, 5
range(3, 10, 3); // 3, 6, 9
range(9, 3, -3 }); // 9, 6

range({ end: 3 }); // 0, 1, 2
range({ start: 3 }); // 3, 4, 5 ... Infinity
range({ start: 3, end: 6 }); // 3, 4, 5
range({ start: 3, end: 10, step: 3 }); // 3, 6, 9
```

### repeat

**repeat(value)**  
**__repeat(value)**  

Create an iterable that yields the same `value` ad infintum.

```js
repeat('x'); // Iterable['x', 'x', 'x', ... 'x', .........]
```

### repeatTimes

**repeatTimes(n, value)**  
**__repeatTimes(n, value)**  

Create an iterable that yields the same `value` `n` times.

```js
repeatTimes(4, 'x'); // Iterable['x', 'x', 'x', 'x']
```


## Create iterables from objects

### objectEntries

**objectEntries(obj)**  
**__objectEntries(obj)**  

Yields the `[key, value]` entries of own, iterable (in the object sense) properties of `obj`. When `obj` is `null` or `undefined` it yields nothing, but it is otherwise equivalent to `Object.keys`.

`objectEntries` is a great way to construct `Map` instances from objects!

```js
objectEntries({ foo: 'bar', fox: 'far' }); // Iterable[['foo': 'bar'], ['fox': 'far']]
new Map(objectEntries(obj)); // Map{foo => 'bar', fox => 'far'}
```

### objectKeys

**objectKeys(obj)**  
**__objectKeys(obj)**  

Yields the string names of the own, iterable (in the object sense) properties of `obj`. When `obj` is `null` or `undefined` it yields nothing, but it is otherwise equivalent to `Object.keys`.

```js
objectKeys({ foo: 'bar', fox: 'far' }); // Iterable['foo', 'fox'];
```

### objectValues

**objectValues(obj)**  
**__objectValues(obj)**  

Yields the values of own, iterable (in the object sense) properies of `obj`. When `obj` is `null` or `undefined` it yields nothing, but it is otherwise equivalent to `Object.values`.

```js
objectValues({ foo: 'bar', fox: 'far' }); // Iterable['bar', 'far']
```


## Use iterables from data structures

### wrapEntries

**wrapEntries(entriesable)**  
**__wrapEntries(entriesable)**  

Yields the values yielded by `entriesable.entries()`. When passed `null` or `undefined`, yields nothing.

<!-- prettier-ignore -->
```js
wrapEntries(new Map([
  ['foo', 'bar'],
  ['fox', 'far']
])); // Iterable[['foo', 'bar'], ['fox', 'far']]
```

### wrapKeys

**wrapKeys(keysable)**  
**__wrapKeys(keysable)**  

Yields the values yielded by `keysable.keys()`. When passed `null` or `undefined`, yields nothing.

<!-- prettier-ignore -->
```js
wrapKeys(new Map([
  ['foo', 'bar'],
  ['fox', 'far']
])); // Iterable['foo', 'fox']
```

### wrapValues

**wrapValues(valuesable)**  
**__wrapValues(valuesable)**  

Yields the values yielded by `valuesable.values()`. When passed `null` or `undefined`, yields nothing.

<!-- prettier-ignore -->
```js
wrapValues(new Map([
  ['foo', 'bar'],
  ['fox', 'far']
])); // Iterable['bar', 'far']
```


## Transform a single iterable

### append

**append(value, [source](#sourceiterable))**  
**__append([source](#iterable), value)**  

Yields values from `source` with `value` appended.

```js
append(4, [1, 2, 3]); // Iterable[1, 2, 3, 4]
```

### asyncAppend

**asyncAppend(value, [source](#asyncsourceiterable))**  
**__asyncAppend([source](#asynciterable), value)**  

See [append](#append)

### drop

**drop(n, [iterable](#sourceiterable))**  
**__drop([iterable](#iterable), n)**  

Yields values from `source`, omitting the first `n` values.

```js
drop(1, ['a', 'b', 'c']); // Iterable['b', 'c']
```

### asyncDrop

**asyncDrop(n, [iterable](#asyncsourceiterable))**  
**__asyncDrop([iterable](#asynciterable), n)**  

See [drop](#drop)

### dropWhile

**dropWhile(predicate, [source](#sourceiterable))**  
**__dropWhile([source](#iterable), predicate)**  

Returns values from `source`, omitting consecutive values at the beginning of `source` for which the result of `predicate(value, idx)` is truthy.

```js
dropWhile(isEven, range(5)); // 0, 2, 4
```

### asyncDropWhile

**asyncDropWhile(predicate, [source](#asyncsourceiterable))**  
**__asyncDropWhile([source](#asynciterable), predicate)**  

See [dropWhile](#dropwhile)

### enumerate

**enumerate(start, [source](#sourceiterable))**  
**enumerate([source](#sourceiterable))**  
**__enumerate([source](#iterable), ?start)**  

It is a shorthand for zipping an index to an iterable:

```js
enumerate(repeat('x')); // Iterable[[0, 'x'], [1, 'x'], [2, 'x'], ...]
```

You can also specify a **startIdx** which will be the index of the first value.

```js
enumerate(1, 'abc'); // Iterable[[1, 'a'], [2, 'b'], [3, 'c']]
```

### asyncEnumerate

**asyncEnumerate(start, [source](#asyncsourceiterable))**  
**asyncEnumerate([source](#asyncsourceiterable))**  
**__asyncEnumerate([source](#asynciterable), ?start)**  

See [enumerate](#enumerate)

### filter

**filter(predicate, [source](#sourceiterable))**  
**__filter([source](#iterable), predicate)**  

Yields only values from `source` for which the result of `predicate(value, idx)` is truthy. Equivalent to `Array.prototype.filter`.

```js
filter(isEven, range(4)); // Iterable[0, 2]
filter((animal) => animal.kind.slice(1) === 'at', [
  { type: 'cat' },
  { type: 'rat' },
  { type: 'dog' },
]); // Iterable[{type: 'cat'}, {type: 'rat'}]
```

### asyncFilter

**asyncFilter(predicate, [source](#asyncsourceiterable))**  
**__asyncFilter([source](#asynciterable), predicate)**  

See [filter](#filter)

### asyncFilterParallel

**asyncFilterParallel(concurrency, func, [iterable](#asyncsourceiterable))**  
**asyncFilterParallel(func, [iterable](#asyncsourceiterable))**  
**__asyncFilterParallel([iterable](#asynciterable), func, ?concurrency)**  

Defaults:

- `concurrency`: `4`

A variant of [filter](#filter) with more complicated logic that can optimize when you have both an async filter predicate and an async souce iterable. It starts fetching the next value in the source iterable while waiting for the async predicate to resolve. The optional concurrency paramater dictates how many values can be read ahead from the source iterable while still waiting for the results of previous async predicates.

```js
await asyncFilterParallel(asyncPredicate, asyncIterable);
await asyncFilterParallel(
  10,
  asyncPredicate,
  asyncIterable,
);
```

### flat

**flat(shouldFlat, depth, [source](#sourceiterable))**  
**flat({ shouldFlat, depth }, [source](#sourceiterable))**  
**flat(depth, [source](#sourceiterable))**  
**flat([source](#sourceiterable))**  
**__flat([source](#iterable), depth, shouldFlat)**  
**__flat([source](#iterable), ?depth, ?shouldFlat)**  

Defaults:

- `depth`: `1`
- `shouldFlat`: `value => isIterable(value) && !isString(value)`

Yields each nested value from `source` by recursing into values which are iterable -- up to the maximum recursion `depth`. In additon to checking `depth`, `flat` will only recurse if the result of `shouldFlat(value)` is truthy.

<!-- prettier-ignore -->
```js
const nested = [
  1,
  [2, 3],
  [
    4,
    [5, 6]
  ]
];
flat(nested); // Iterable[1, 2, 3, 4, Iterable[5, 6]]
flat(2, nested); // Iterable[1, 2, 3, 4, 5, 6]

const isString = value =>
  typeof value === 'string' && value.length > 1;

flat(isString, Infinity, ['Hel', ['lo', '!']]); // Iterable['H', 'e', 'l', 'l', 'o', '!]
```

### asyncFlat

**asyncFlat(shouldFlat, depth, [source](#asyncsourceiterable))**  
**asyncFlat({ shouldFlat, depth }, [source](#asyncsourceiterable))**  
**asyncFlat(depth, [source](#asyncsourceiterable))**  
**asyncFlat([source](#asyncsourceiterable))**  
**__asyncFlat([source](#asynciterable), depth, shouldFlat)**  
**__asyncFlat([source](#asynciterable), ?depth, ?shouldFlat)**  

See [flat](#flat)

### flatMap

**flatMap(func, [source](#sourceiterable))**  
**__flatMap([source](#iterable), func)**  

For each value in `source`, yields each value in `predicate(value, idx)`. Equivalent to `Array.prototype.flatMap`.

```js
flatMap((x) => [x - 1, x], [1, 3, 5]); // Iterable[0, 1, 2, 3, 4, 5]
```

### asyncFlatMap

**asyncFlatMap(func, [source](#asyncsourceiterable))**  
**__asyncFlatMap([source](#asynciterable), func)**  

See [flatMap](#flatmap)

### asyncFlatMapParallel

**asyncFlatMapParallel(concurrency, func, [iterable](#asyncsourceiterable))**  
**asyncFlatMapParallel(func, [iterable](#asyncsourceiterable))**  
**__asyncFlatMapParallel([iterable](#asynciterable), func, ?concurrency)**  

Defaults:

- `concurrency`: `4`

A variant of flatMap with more complicated logic that can optimize when you have both an async mapper callback and an async souce iterable. It starts fetching the next value in the source iterable while waiting for the async callback to resolve. The optional concurrency paramater dictates how many values can be read ahead from the source iterable while still waiting for the results of previous mapper callbacks.

```js
await asyncFlatMapParallel(asyncMapper, asyncIterable);
await asyncFlatMapParallel(10, asyncMapper, asyncIterable);
```

### interpose

**interpose(value, [source](#sourceiterable))**  
**__interpose([source](#iterable), value)**  

Yields `value` between each of the values in `source`.

```js
interpose(null, [1, 2, 3]); // Iterable[1, null, 2, null, 3]
```

Note: If `source` is a string you should instead use [interposeSeq](#interposeseq). A warning will be emitted if you do not.

### asyncInterpose

**asyncInterpose(value, [source](#asyncsourceiterable))**  
**__asyncInterpose([source](#asynciterable), value)**  

See [interpose](#interpose)

### interposeSeq

**interposeSeq(seq, [source](#sourceiterable))**  
**__interposeSeq([source](#iterable), seq)**  

Yields values from `seq` between each of the values in `source`.

```js
interposeSeq([0, 0], [1, 2, 3]); // Iterable[1, 0, 0, 2, 0, 0, 3]
```

### asyncInterposeSeq

**asyncInterposeSeq(seq, [source](#asyncsourceiterable))**  
**__asyncInterposeSeq([source](#asynciterable), seq)**  

See [interposeSeq](#interposeseq)

### map

**map(func, [source](#sourceiterable))**  
**__map([source](#iterable), func)**  

For each value in `source`, yields the result of `predicate(value, idx)`. Equivalent to `Array.prototype.map`.

```js
map((x) => x * x, [0, 1, 2, 3]); // Iterable[0, 1, 4, 9]
```

### asyncMap

**asyncMap(func, [source](#asyncsourceiterable))**  
**__asyncMap([source](#asynciterable), func)**  

See [map](#map)

### asyncMapParallel

**asyncMapParallel(concurrency, func, [iterable](#asyncsourceiterable))**  
**asyncMapParallel(func, [iterable](#asyncsourceiterable))**  
**__asyncMapParallel([iterable](#asynciterable), func, ?concurrency)**  

Defaults:

- `concurrency`: `4`

A variant of map with more complicated logic that can optimize when you have both an async mapper callback and an async souce iterable. It starts fetching the next value in the source iterable while waiting for the async callback to resolve. The optional concurrency paramater dictates how many values can be read ahead from the source iterable while
still waiting for the results of previous mapper callbacks.

```js
await asyncMapParallel(asyncMapper, asyncIterable);
await asyncMapParallel(10, asyncMapper, asyncIterable);
```

### prepend

**prepend(value, [source](#sourceiterable))**  
**__prepend([source](#iterable), value)**  

Yields `value` followed by values from `source`.

```js
prepend(0, [1, 2, 3]); // Iterable[0, 1, 2, 3]
```

### asyncPrepend

**asyncPrepend(value, [source](#asyncsourceiterable))**  
**__asyncPrepend([source](#asynciterable), value)**  

See [prepend](#prepend)

### reverse

**reverse([source](#sourceiterable))**  
**__reverse([source](#iterable))**  

Yields the values from `iterable` in reverse order. If `iterable` is not an array, this requires caching all its values in memory.

```js
reverse([1, 2, 3]); // Iterable[3, 2, 1]
```

### asyncReverse

**asyncReverse([source](#asyncsourceiterable))**  
**__asyncReverse([source](#asynciterable))**  

See [reverse](#reverse)

Note: Unlike `reverse`, `asyncReverse` will always make a cache of the entire input, even if the input is an array. If this is not acceptable, ensure that you use `reverse` on arrays.

### slice

**slice(start, end, step, [source](#sourceiterable))**  
**slice(start, end, [source](#sourceiterable))**  
**slice(start, [source](#sourceiterable))**  
**slice({ start, end, step }, [source](#sourceiterable))**  
**__slice([source](#iterable), start, end, step)**  
**__slice([source](#iterable), ?start, ?end, ?step)**  

Defaults:

- `end`: `Infinity`
- `step`: `1`

Yields a subsequence of values from `source`, starting at index `start` then advancing `step` values, until it reaches index `end`. The value at index `end` will not be part of the result.

```js
slice(0, 3, range(10)); // Iterable[0, 1, 2]
slice(2, range(10)); // Iterable[2, 3, 4, 5, 6, 7, 8, 9]
slice(2, 6, range(10)); // Iterable[2, 3, 4, 5]
slice(2, 6, 2, range(10)); // Iterable[2, 4]
```

`start` and `end` can also be negative. When they are, they refer to offsets from the end of `iterable`, as they do in `Array.prototype.slice`. This will always require consuming the entire iterable to figure out where the end is. `step` must not be negative.

```js
slice(0, -3, range(10)); // Iterable[0, 1, 2, 3, 4, 5, 6]
slice(-3, range(10)); // Iterable[7, 8, 9]
slice(-6, -2, range(10)); // Iterable[4, 5, 6, 7]
slice(-6, -2, 2, range(10)); // Iterable[4, 6]
```

When no arguments are passed to `slice` it is functionally equivalent to `wrap`.

### asyncSlice

**asyncSlice(start, end, step, [source](#asyncsourceiterable))**  
**asyncSlice(start, end, [source](#asyncsourceiterable))**  
**asyncSlice(start, [source](#asyncsourceiterable))**  
**asyncSlice({ start, end, step }, [source](#asyncsourceiterable))**  
**__asyncSlice([source](#asynciterable), start, end, step)**  
**__asyncSlice([source](#asynciterable), ?start, ?end, ?step)**  

See [slice](#slice)

### take

**take(n, [iterable](#sourceiterable))**  
**__take([iterable](#iterable), n)**  

Yields the first `n` values from `source`.

```js
take(2, ['a', 'b', 'c']); // Iterable['a', 'b']
```

You should also consider using destructuring if you want individual named values and not an iterable of values. It is not necessary to use `take` when destructuring. With destructuring the above would become:

```js
const [first, second] = ['a', 'b', 'c'];
```

### asyncTake

**asyncTake(n, [iterable](#asyncsourceiterable))**  
**__asyncTake([iterable](#asynciterable), n)**  

See [take](#take)

### takeSorted

**takeSorted(n, [comparator](#comparator), [source](#sourceiterable))**  
**takeSorted(n, [source](#sourceiterable))**  
**takeSorted([comparator](#comparator), [source](#sourceiterable))**  
**takeSorted([source](#sourceiterable))**  
**__takeSorted([source](#iterable), n, [comparator](#comparator))**  
**__takeSorted([source](#iterable), ?n, ?[comparator](#comparator))**  

Defaults:

- `comparator`: [default comparator](#the-default-comparator)

Returns `n` values from `source`, sorted in ascending order according to `comparator`. The function is both space efficient (only stores `n` values) and fast (`O(m log n)`), given `m` as the total number of values in `iterable`. It uses a heap internally.

```js
takeSorted(3, [4, 5, 2, 3, 1]); // Iterable[1, 2, 3]
takeSorted([4, 5, 2, 3, 1]); // Iterable[1, 2, 3, 4, 5]
takeSorted(3, (a, b) => b - a, [4, 5, 2, 3, 1]); // Iterable[5, 4, 3]
```

### asyncTakeSorted

**asyncTakeSorted(n, [comparator](#comparator), [source](#asyncsourceiterable))**  
**asyncTakeSorted(n, [source](#asyncsourceiterable))**  
**asyncTakeSorted([comparator](#comparator), [source](#asyncsourceiterable))**  
**asyncTakeSorted([source](#asyncsourceiterable))**  
**__asyncTakeSorted([source](#asynciterable), n, [comparator](#comparator))**  
**__asyncTakeSorted([source](#asynciterable), ?n, ?[comparator](#comparator))**  

See [takeSorted](#takesorted)

### takeWhile

**takeWhile(predicate, [source](#sourceiterable))**  
**__takeWhile([source](#iterable), predicate)**  

Returns values from `source`, starting at the beginning up until the first value for which the result of `predicate(value, idx)` is falsy.

```js
takeWhile(isEven, [2, 4, 1, 3]); // Iterable[2, 4]
takeWhile(isEven, [1, 2, 3, 4]); // Iterable[]
```

### asyncTakeWhile

**asyncTakeWhile(predicate, [source](#asyncsourceiterable))**  
**__asyncTakeWhile([source](#asynciterable), predicate)**  

See [takeWhile](#takewhile)

### tap

**tap(callback, [source](#sourceiterable))**  
**__tap([source](#iterable), callback)**  

For each value in `source`, executes `callback(value, idx)` and yields the value (unmodified). Note that while this looks similar to what a `for..of` loop or `forEach` method might do, the key difference is that `tap` does not force evaluation of the iterable.

```js
pipeExec(
  [0, 1, 2],
  filter((value) => !!value),
  tap((value) => console.log(value)),
  map((value) => value + 1),
); // Logs 1, 2 and returns Iterable[2, 3]
```

### asyncTap

**asyncTap(callback, [source](#asyncsourceiterable))**  
**__asyncTap([source](#asynciterable), callback)**  

See [tap](#tap)

### window

**window(size, [source](#sourceiterable))**  
**__window([source](#iterable), size)**  

For values in `source`, yields a `window` iterable of size `size` which starts with that value and also contains the next values from `source`. The `window` instance is the same on every iteration. Only emits full windows, which means fewer windows will be emitted than there are values in `source`. If you need a window for every value in `source`, use [leadingWindow](#leadingwindow) or [trailingWindow](#trailingwindow).

```js
window(3, [1, 2, 3, 4, 5]);
// Iterable[
//   Iterable[1, 2, 3],
//   Iterable[2, 3, 4]
//   Iterable[3, 4, 5]
// ]

window(5, [1, 2, 3]);
// Iterable[]
```

### asyncWindow

**asyncWindow(size, [source](#asyncsourceiterable))**  
**__asyncWindow([source](#asynciterable), size)**  

See [window](#window)

### leadingWindow

**leadingWindow(size, { filler, useFiller }, [source](#sourceiterable))**  
**leadingWindow(size, [source](#sourceiterable))**  
**__leadingWindow([source](#iterable), size, ?{ filler, useFiller })**  

Defaults:

- `filler`: `undefined`
- `useFiller`: `true`

For every value in `source`, yields an iterable `window` of size `size` which starts with that value and also contains the next values from `source`. The `window` instance is the same on every iteration. When there are not enough additional values in `source` to fill the window, `filler` will be used in place of the missing values. Alternatively if `useFiller` is `false`, missing values will create windows smaller than `size`.

```js
leadingWindow(3, [1, 2, 3, 4, 5]);
// Iterable[
//   Iterable[1, 2, 3],
//   Iterable[2, 3, 4]
//   Iterable[3, 4, 5]
//   Iterable[4, 5, undefined]
//   Iterable[5, undefined, undefined]
// ]

leadingWindow(3, { filler: Infinity }, [1, 2, 3, 4, 5]);
// Iterable[
//   Iterable[1, 2, 3],
//   Iterable[2, 3, 4]
//   Iterable[3, 4, 5]
//   Iterable[4, 5, Infinity]
//   Iterable[5, Infinity, Infinity]
// ]

leadingWindow(3, { useFiller: false }, [1, 2, 3, 4, 5]);
// Iterable[
//   Iterable[1, 2, 3],
//   Iterable[2, 3, 4]
//   Iterable[3, 4, 5]
//   Iterable[4, 5]
//   Iterable[5]
// ]
```

### asyncLeadingWindow

**asyncLeadingWindow(size, { filler, useFiller }, [source](#asyncsourceiterable))**  
**asyncLeadingWindow(size, [source](#asyncsourceiterable))**  
**__asyncLeadingWindow([source](#asynciterable), size, ?{ filler, useFiller })**  

See [leadingWindow](#leadingwindow)

### trailingWindow

**trailingWindow(size, { filler }, [source](#sourceiterable))**  
**trailingWindow(size, [source](#sourceiterable))**  
**__trailingWindow([source](#iterable), size, ?{ filler })**  

Defaults:

- `filler`: `undefined`

For every value in `source`, yields a `window` iterable of size `size` which contains the values leading up to and including that value. The `window` instance is the same on every iteration. When there are not enough prior values to fill the window, `filler` will be used in place of the missing values.

```js
trailingWindow(3, [1, 2, 3, 4, 5]);
// Iterable[
//   Iterable[undefined, undefined, 1],
//   Iterable[undefined, 1, 2]
//   Iterable[1, 2, 3]
//   Iterable[2, 3, 4]
//   Iterable[3, 4, 5]
// ]

trailingWindow(3, { filler: 0 }, [1, 2, 3, 4, 5]);
// Iterable[
//   Iterable[0, 0, 1]
//   Iterable[0, 1, 2]
//   Iterable[1, 2, 3]
//   Iterable[2, 3, 4]
//   Iterable[3, 4, 5]
// ]
```

### asyncTrailingWindow

**asyncTrailingWindow(size, { filler }, [source](#asyncsourceiterable))**  
**asyncTrailingWindow(size, [source](#asyncsourceiterable))**  
**__asyncTrailingWindow([source](#asynciterable), size, ?{ filler })**  

See [trailingWindow](#trailingwindow)

### wrap

**wrap([source](#sourceiterable))**  

Yields the values from `source`. Its main purposes include allowing nullable iterables to be treated as non-null iterables, and to give arbitrary iterables the semantics of iter-tools iterables.

```js
const maybeIterable =
  Math.random() > 0.5 ? [1, 2, 3] : null;

[...wrap(maybeIterable)]; // [1, 2, 3] OR []
```

### asyncWrap

**asyncWrap([source](#asyncsourceiterable))**  

See [wrap](#wrap)

Also turns sync iterables into async iterables and ensures async `next()` queueing semantics.

```js
await asyncWrap([1, 2, 3])[Symbol.asyncIterator]().next(); // { value: 1, done: false }
```


## Separate an iterable into multiple iterables

### batch

**batch(size, [source](#sourceiterable))**  
**__batch([source](#iterable), size)**  

Yields non-overlapping subsequences each containing `size` values from `source`.

```js
batch(2, range(5)); // [0, 1], [2, 3], [4]
```

### asyncBatch

**asyncBatch(size, [source](#asyncsourceiterable))**  
**__asyncBatch([source](#asynciterable), size)**  

See [batch](#batch)

### group

**group([iterable](#sourceiterable))**  
**__group([iterable](#iterable))**  

Eqivalent to `groupBy(_ => _, source)`. For more information see [groupBy](#groupby).

```js
group([1, 1, -1, -1, -1, 4, -1]);
// Iterable[
//   [1, Iterable[1, 1]]
//   [-1, Iterable[-1, -1, -1]]
//   [4, Iterable[4]]
//   [-1, Iterable[-1]]
// ]
```

### asyncGroup

**asyncGroup([iterable](#asyncsourceiterable))**  
**__asyncGroup([iterable](#asynciterable))**  

See [group](#group)

### groupBy

**groupBy(getKey, [source](#sourceiterable))**  
**__groupBy([source](#iterable), getKey)**  

Yields a [PartsIterable](#partsiterable) of [`key`, `group`] pairs from `source`, where `group` is a subsequence of `values` from `source` for which every `value` has the same `key` as returned by `getKey(value, idx)` (as compared with `===`).

```js
groupBy(Math.abs, [1, 1, -1, -1, 4, -1]);
// Iterable [
//   [1, Iterable[1, 1, -1, -1]]
//   [4, Iterable[4]]
//   [1, Iterable[-1]]
// ]
```

### asyncGroupBy

**asyncGroupBy(getKey, [source](#asyncsourceiterable))**  
**__asyncGroupBy([source](#asynciterable), getKey)**  

See [groupBy](#groupby)

### split

**split([source](#sourceiterable))**  
**__split([source](#iterable))**  

Yields each value in `source` as an iterable of one value.

```js
split([1, 2, 3]); // Iterable[Iterable[1], Iterable[2], Iterable[3]]
```

### asyncSplit

**asyncSplit([source](#asyncsourceiterable))**  
**__asyncSplit([source](#asynciterable))**  

See [split](#split)

### splitAt

**splitAt(idx, [source](#sourceiterable))**  
**__splitAt([source](#iterable), idx)**  

Yields two `part` subsequences of `source`. The first `part` yields the values occurring before index `idx` in `source`, the second `part` yields all the values at or after index `idx`. `idx` can also be negative, in which case it refers to an offset from the end of `source`.

`splitAt` is specially designed to work with destructuring, but this comes at a cost: for resources to be released properly you must use the second half of the split. If you only need the first half you would instead use [take](#take), e.g. by changing `const [seq] = splitAt(i, source)` into `const seq = take(i, source)`.

```js
const [
  firstThree, // Iterable[0, 1, 2]
  others, // Iterable[3, 4, 5, 6, 7, 8, 9]
] = splitAt(3, range(10));

const [, lastThree] = splitAt(-3, range(10));
lastThree; // Iterable[7, 8, 9]
```

### asyncSplitAt

**asyncSplitAt(idx, [source](#asyncsourceiterable))**  
**__asyncSplitAt([source](#asynciterable), idx)**  

Synchronously yields two async `part` subsequences of `source`. The first `part` yields the values occurring before index `idx` in `source`, the second `part` yields all the values at or after index `idx`. `idx` can also be negative, in which case it refers to an offset from the end of `source`.

Like its sync counterpart, `asyncSplitAt` is also intended for use with destructuring assignment, and does not allow you to destructure only the first part.

```js
const [
  firstThree, // AsyncIterable[0, 1, 2]
  others, // AsyncIterable[3, 4, 5, 6, 7, 8, 9]
] = asyncSplitAt(3, asyncWrap(range(100)));

if (!othersNeeded) await others.return();

const [, lastThree] = asyncSplitAt(-3, range(10));
lastThree; // AsyncIterable[7, 8, 9]
```

### splitOn

**splitOn(separator, [source](#sourceiterable))**  
**__splitOn([source](#iterable), separator)**  

Yields a [PartsIterable](#partsiterable) of parts from `source`, where `separatorValue` is used to mark the boundary between parts in `source`. `separatorValue` will not occur in the output. `separatorValue` is compared using `===`.

```js
splitOn(null, [1, null, 2, null, 3]); // Iterable[[1], [2], [3]]
```

Note: If `source` is a string you should instead use [splitOnSeq](#splitonseq). A warning will be emitted if you do not.

### asyncSplitOn

**asyncSplitOn(separator, [source](#asyncsourceiterable))**  
**__asyncSplitOn([source](#asynciterable), separator)**  

See [splitOn](#spliton)

### splitOnAny

**splitOnAny(separators, [source](#sourceiterable))**  
**__splitOnAny([source](#iterable), separators)**  

Yields a [PartsIterable](#partsiterable) of parts from `source`, where `separatorValues` are used to mark the boundary between parts in `source`. None of the `separatorValues` will not occur in the output. `separatorValues` are compared using `===`.

```js
splitOnAny([null, undefined], [1, null, 2, undefined, 3]); // Iterable[[1], [2], [3]]
```

Note: If `source` is a string you should instead use [splitOnAnySeq](#splitonanyseq). A warning will be emitted if you do not.

### asyncSplitOnAny

**asyncSplitOnAny(separators, [source](#asyncsourceiterable))**  
**__asyncSplitOnAny([source](#asynciterable), separators)**  

See [splitOnAny](#splitonany)

### splitOnAnySeq

**splitOnAnySeq(separatorSeqs, [source](#sourceiterable))**  
**__splitOnAnySeq([source](#iterable), separatorSeqs)**  

Yields a [PartsIterable](#partsiterable) of parts from `source`, where `separatorSeqs` are used to mark the boundary between parts in `source`. When any `separatorSeq` in `separatorSeqs` is matched, all matched values are consumed from `source` and will not appear in any `part`, nor may they be part of any other `separatorSeq` match. Matches greedily, which is to say the longest possible separator match will be prioritized. Each value in a `separatorSeq` is compared using `===`.

```js
splitOnAnySeq(
  [['\n'], ['\r\n']],
  'mixed\r\nline\nterminators',
); // Iterable['mixed', 'line', 'terminators']
```

### asyncSplitOnAnySeq

**asyncSplitOnAnySeq(separatorSeqs, [source](#asyncsourceiterable))**  
**__asyncSplitOnAnySeq([source](#asynciterable), separatorSeqs)**  

See [splitOnAnySeq](#splitonanyseq)

### splitOnSeq

**splitOnSeq(separatorSeq, [source](#sourceiterable))**  
**__splitOnSeq([source](#iterable), separatorSeq)**  

Yields a [PartsIterable](#partsiterable) of parts from `source`, where `separatorSeq` is used to mark the boundary between parts in `source`. When `separatorSeq` is matched, all matched values are consumed from `source`. They will not appear in any `part`, nor may they be part of any other `separatorSeq` match. Each value in `separatorSeq` is compared using `===`.

```js
splitOnSeq([0, 0], [1, 0, 0, 2, 0, 0, 3]); // Iterable[[1], [2], [3]]

//`separatorSeq` is in the result because separators overlap in `source`.
splitOnSeq([0, 0], [0, 0, 0, 1, 2]); // Iterable[[], [0, 1, 2]]
```

### asyncSplitOnSeq

**asyncSplitOnSeq(separatorSeq, [source](#asyncsourceiterable))**  
**__asyncSplitOnSeq([source](#asynciterable), separatorSeq)**  

See [splitOnSeq](#splitonseq)

### splitWhen

**splitWhen(predicate, [source](#sourceiterable))**  
**__splitWhen([source](#iterable), predicate)**  

Yields two `part` subsequences of `source`. The first `part` yields the values where `predicate(value, i)` is falsy. The second `part` yields all the values including and after the first value for which `predicate(value, i)` is truthy.

`splitAt` is specially designed to work with destructuring, but this comes at a cost: for resources to be released properly you must use the second half of the split. If you only need the first half you would instead use [takeWhen](#takewhen), e.g. by changing `const [seq] = splitWhen(cond, source)` into `const seq = takeWhen((v, i) => !cond(v, i), source)`.

```js
const source = [-2, -1, 0, 1, 2];
const [negatives, positives] = splitWhen(
  (i) => i >= 0,
  source,
);
negatives; // Iterable[-2, -1]
positives; // Iterable[0, 1, 2]
```

### asyncSplitWhen

**asyncSplitWhen(predicate, [source](#asyncsourceiterable))**  
**__asyncSplitWhen([source](#asynciterable), predicate)**  

See [splitWhen](#splitwhen)

### splitWith

**splitWith(predicate, [source](#sourceiterable))**  
**__splitWith([source](#iterable), predicate)**  

Yields a [PartsIterable](#partsiterable) of parts from `source`, a `value` from `source` for which the result of `predicate(value, idx)` is truthy is considered a separator, and will not occur in the output. If `source` is a string you may also specify a regex predicate, in which case the behavior will match `str.split(RegExp)`. This is the only situation in which you will be able to match more than one value from `source` at a time.

<!-- prettier-ignore -->
```js
splitWith(
  x => x == null,
  [1, null, 2, undefined, 3]
); // Iterable[Iterable[1], Iterable[2], Iterable[3]]
splitWith(',', 'foo,bar,baz'); // Iterable['foo', 'bar', 'baz']
splitWith(/, /, 'foo, bar, baz'); // Iterable['foo', 'bar', 'baz']
```

### asyncSplitWith

**asyncSplitWith(predicate, [source](#asyncsourceiterable))**  
**__asyncSplitWith([source](#asynciterable), predicate)**  

See [splitWith](#splitwith)


## Combine multiple iterables

### collate

**collate([comparator](#comparator), ...[sources](#sourceiterable))**  
**__collate([sources](#iterable), [comparator](#comparator))**  

Combines values from each `source` in `sources` into a single iterable, peserving the ordering of values within each `source`. Collate uses `comparator` to establish a partial ordering of values at the head of each `source`. At each step it yields the lowest value in the ordering then recomputes the ordering.

```js
collate([1, 2, 5, 6], [3, 4]); // Iterable[1, 2, 3, 4, 5, 6]
collate((a, b) => b - a, [6, 5, 2, 1], [4, 3]); // Iterable[6, 5, 4, 3, 2, 1]
```

### asyncCollate

**asyncCollate([comparator](#comparator), ...[sources](#asyncsourceiterable))**  
**__asyncCollate([sources](#asynciterable), [comparator](#comparator))**  

See [collate](#collate)

### compress

**compress([source](#sourceiterable), [included](#sourceiterable))**  
**__compress(source, included)**  
**__compress(source, included)**  

Consumes values from `source` and `included` iterables in parallel, at each step yielding the `source` value if the `included` value is truthy.

```js
compress([0, 1, 2, 3, 4], [0, 0, 1, 1]); // 2, 3
compress([0, 1, 2, 3, 4], cycle([true, false])); // 0, 2, 4
```

### asyncCompress

**asyncCompress([source](#asyncsourceiterable), [included](#asyncsourceiterable))**  
**__asyncCompress(source, included)**  
**__asyncCompress(source, included)**  

See [compress](#compress)

### concat

**concat(...sources)**  
**__concat(...sources)**  

Yields each value from each `source` in `sources`. First all values from the first `source` are yielded, then then from the second, etc.

```js
concat([3, 5, 6], [1, 1], [10]); // 3, 5, 6, 1, 1, 10
```

### asyncConcat

**asyncConcat(...sources)**  
**__asyncConcat(...sources)**  

See [concat](#concat)

### asyncInterleaveReady

**asyncInterleaveReady(...[sources](#asyncsourceiterable))**  
**__asyncInterleaveReady([sources](#asynciterable))**  

Interleaves values from each `source` in `sources`, yielding values in whatever order they resolve (become ready). Note that this means that the results of this interleave will usually not be repeatable.

```js
asyncInterleaveReady(aValues, bValues);
```

### join

**join(source)**  
**__join(source)**  

Given `source`, an iterable of iterables, yields all values from each iterable. It is the inverse of `split`.

```js
join([[1], [2], [3]]); // Iterable[1, 2, 3]
```

### asyncJoin

**asyncJoin(source)**  
**__asyncJoin(source)**  

See [join](#join)

### joinWith

**joinWith(separator, [source](#sourceiterable))**  
**__joinWith([source](#iterable), separator)**  

Given `source`, an iterable of iterables, yields all values from each iterable with `separator` in between. It is the inverse of `splitOn`.

```js
joinWith(null, [[1], [2], [3]]); // Iterable[1, null, 2, null, 3]
```

### asyncJoinWith

**asyncJoinWith(separator, [source](#asyncsourceiterable))**  
**__asyncJoinWith([source](#asynciterable), separator)**  

See [joinWith](#joinwith)

### joinWithSeq

**joinWithSeq(separatorSeq, [source](#sourceiterable))**  
**__joinWithSeq([source](#iterable), separatorSeq)**  

Given `source`, an iterable of iterables, yields all values from each iterable with the `separatorSeq` values in between. It is the inverse of `splitOnSeq`.

```js
joinWithSeq([null, null], [[1], [2], [3]]); // Iterable[1, null, null, 2, null, null, 3]
```

### asyncJoinWithSeq

**asyncJoinWithSeq(separatorSeq, [source](#asyncsourceiterable))**  
**__asyncJoinWithSeq([source](#asynciterable), separatorSeq)**  

See [joinWithSeq](#joinwithseq)

### roundRobin

**roundRobin(start, step, ...[sources](#sourceiterable))**  
**roundRobin(step, ...[sources](#sourceiterable))**  
**roundRobin(...[sources](#sourceiterable))**  
**__roundRobin([sources](#iterable), ?step, ?start)**  

Defaults:

- `start`: `0`
- `step`: `1`

Combines values from each `source` in `sources` into a single iterable, peserving the ordering of values within each `source`. First yields a value from the `source` with index `start`, then one from the `source` with index `start + step`, and so on, wrapping the indexes of sources using `% sources.length`.

```js
roundRobin([1, 3, 5], [2, 4, 6]); // Iterable[1, 2, 3, 4, 5, 6]
roundRobin(2, [1, 4], [3, 6], [2, 5]); // Iterable[1, 2, 3, 4, 5, 6]
roundRobin({ start: 1, step: 1 }, [2, 4, 6], [1, 3, 5]); // Iterable[1, 2, 3, 4, 5, 6]
```

### asyncRoundRobin

**asyncRoundRobin(start, step, ...[sources](#asyncsourceiterable))**  
**asyncRoundRobin(step, ...[sources](#asyncsourceiterable))**  
**asyncRoundRobin(...[sources](#asyncsourceiterable))**  
**__asyncRoundRobin([sources](#asynciterable), ?step, ?start)**  

See [roundRobin](#roundrobin)

### zip

**zip(...[sources](#sourceiterable))**  
**__zip([sources](#iterable))**  

Consumes each `source` in `sources` in parallel, at each step yielding an array with one value from every `source`. Stops when the shortest source iterable is exausted.

```js
zip([1, 2], [3, 4], [5, 6, 7]); // [1, 3, 5], [2, 4, 6]
```

### asyncZip

**asyncZip(...[sources](#asyncsourceiterable))**  
**__asyncZip([sources](#asynciterable))**  

See [zip](#zip)

### zipAll

**zipAll({ filler }, ...[sources](#sourceiterable))**  
**zipAll(...[sources](#sourceiterable))**  
**__zipAll([sources](#iterable), ?{ filler })**  

Defaults:

- `filler`: `undefined`

Consumes each `source` in `sources` in parallel, at each step yielding an array with one value from every `source`. Stops when the shortest source iterable is exausted. Where some `sources` are exhausted before all `sources` are exchausted, `filler` will be used in place of the missing values.

```js
zipAll([1, 2], [3, 4], [5, 6, 7]); // [1, 3, 5], [2, 4, 6], [undefined, undefined, 7]
zipAll({ filler: null }, [1, 2], []); // [1, null], [2, null]
```

### asyncZipAll

**asyncZipAll({ filler }, ...[sources](#asyncsourceiterable))**  
**asyncZipAll(...[sources](#asyncsourceiterable))**  
**__asyncZipAll([sources](#asynciterable), ?{ filler })**  

See [zipAll](#zipall)


## Reduce an iterable to a single value

### equal

**equal(...[iterables](#sourceiterable))**  
**__equal([iterables](#iterable))**  

Returns `true` if all `iterables` are equal to each other, and `false` otherwise. Only considers the values yielded by the iterables, which it compares with `===`.

```js
equals([1, 2, 3], [1, 2, 3], [1, 2, 3]); // true
equals([1, 2, 3], [3, 2, 1]); // false
```

### asyncEqual

**asyncEqual(...[iterables](#asyncsourceiterable))**  
**__asyncEqual([iterables](#asynciterable))**  

See [equal](#equal)

### every

**every(predicate, [iterable](#sourceiterable))**  
**__every([iterable](#iterable), predicate)**  

Returns `true` if, for every value in `source`, the result of `predicate(value, idx)` is truthy. Otherwise returns `false`.

```js
every(isEven, [1, 2, 3]); // returns false
every(isEven, [2, 4, 6]); // returns true
```

### asyncEvery

**asyncEvery(predicate, [iterable](#asyncsourceiterable))**  
**__asyncEvery([iterable](#asynciterable), predicate)**  

See [every](#every)

### find

**find(predicate, [iterable](#sourceiterable))**  
**__find([iterable](#iterable), predicate)**  

Returns the first value in `iterable` for which `predicate(value, idx)` returns a truthy value. It is the equivalent of `Array.prototype.find`.

```js
find((animal) => animal.kind === 'dog', [
  { type: 'cat' },
  { type: 'dog' },
]); // {type: 'dog'}
```

### asyncFind

**asyncFind(predicate, [iterable](#asyncsourceiterable))**  
**__asyncFind([iterable](#asynciterable), predicate)**  

See [find](#find)

### findOr

**findOr(notFoundValue, func, [iterable](#sourceiterable))**  
**__findOr([iterable](#iterable), notFoundValue, func)**  

Returns the first value in `iterable` for which `predicate(value, idx)` returns a truthy value, or `notFoundValue` if no value satisfied the predicate.

```js
findOr(0, (x) => x > 10, [1, 2, 3]); // 0
```

### asyncFindOr

**asyncFindOr(notFoundValue, func, [iterable](#asyncsourceiterable))**  
**__asyncFindOr([iterable](#asynciterable), notFoundValue, func)**  

See [findOr](#findor)

### first

**first([iterable](#sourceiterable))**  
**__first([iterable](#iterable))**  

Returns the first value from `iterable`, or `undefined` when `iterable` is empty.

```js
first([1, 2, 3]); // 1
first([]); // undefined
```

### asyncFirst

**asyncFirst([iterable](#asyncsourceiterable))**  
**__asyncFirst([iterable](#asynciterable))**  

See [first](#first)

### firstOr

**firstOr(whenEmpty, [iterable](#sourceiterable))**  
**__firstOr([iterable](#iterable), whenEmpty)**  

Returns the first value from `iterable`, or `whenEmpty` when `iterable` is empty.

```js
firstOr(0, [1, 2, 3]); // 1
firstOr(0, []); // 0
```

### asyncFirstOr

**asyncFirstOr(whenEmpty, [iterable](#asyncsourceiterable))**  
**__asyncFirstOr([iterable](#asynciterable), whenEmpty)**  

See [firstOr](#firstor)

### includes

**includes(value, [iterable](#sourceiterable))**  
**__includes([iterable](#iterable), value)**  

Retuns `true` if `iterable` includes the specified `value`, or `false` otherwise. Compares values with `===`.

```js
includes(2, [1, 2, 3]); // true
includes(0, [1, 2, 3]); // false
```

Note: If `source` is a string you should instead use [includesSeq](#includesseq). A warning will be emitted if you do not.

### asyncIncludes

**asyncIncludes(value, [iterable](#asyncsourceiterable))**  
**__asyncIncludes([iterable](#asynciterable), value)**  

See [includes](#includes)

### includesAny

**includesAny(values, [iterable](#sourceiterable))**  
**__includesAny([iterable](#iterable), values)**  

Retuns `true` if `iterable` includes any of the specified `values`, or `false` otherwise. Compares values with `===`.

```js
includesAny([0, 1], [1, 2, 3]); // true
includesAny([0, 1], [2, 3, 4]); // false
```

Note: If `source` is a string you should instead use [includesAnySeq](#includesanyseq). A warning will be emitted if you do not.

### asyncIncludesAny

**asyncIncludesAny(values, [iterable](#asyncsourceiterable))**  
**__asyncIncludesAny([iterable](#asynciterable), values)**  

See [includesAny](#includesany)

### includesAnySeq

**includesAnySeq(seqs, [iterable](#sourceiterable))**  
**__includesAnySeq([iterable](#iterable), seqs)**  

Retuns `true` if any of the the `seqs` (subsequences) of values can be found somewhere in `iterable`, or `false` otherwise. Compares values with `===`.

```js
includesAnySeq(
  [
    [1, 2],
    [2, 3],
  ],
  [1, 2, 3],
); // true
includesAnySeq(
  [
    [2, 3],
    [3, 4],
  ],
  [1, 2, 3],
); // true
includesAnySeq(
  [
    [0, 1],
    [3, 4],
  ],
  [1, 2, 3],
); // false
```

### asyncIncludesAnySeq

**asyncIncludesAnySeq(seqs, [iterable](#asyncsourceiterable))**  
**__asyncIncludesAnySeq([iterable](#asynciterable), seqs)**  

See [includesAnySeq](#includesanyseq)

### includesSeq

**includesSeq(seq, [iterable](#sourceiterable))**  
**__includesSeq([iterable](#iterable), seq)**  

Retuns `true` if the `seq` (subsequence) of values can be found somewhere in `iterable`, or `false` otherwise. Compares values with `===`.

```js
includesSeq([1, 2], [1, 2, 3]); // true
includesSeq([1, 2, 3], [1, 2, 3]); // true
includesSeq([2, 3, 4], [1, 2, 3]); // false
```

### asyncIncludesSeq

**asyncIncludesSeq(seq, [iterable](#asyncsourceiterable))**  
**__asyncIncludesSeq([iterable](#asynciterable), seq)**  

See [includesSeq](#includesseq)

### isEmpty

**isEmpty([iterable](#sourceiterable))**  
**__isEmpty([iterable](#iterable))**  

Returns `true` if `iterable` contains no values, and `false` otherwise.

```js
isEmpty([]); // true
isEmpty(null); // true
isEmpty(range(1)); // false
isEmpty([undefined]); // false
```

### asyncIsEmpty

**asyncIsEmpty([iterable](#asyncsourceiterable))**  
**__asyncIsEmpty([iterable](#asynciterable))**  

See [isEmpty](#isempty)

### isSorted

**isSorted([comparator](#comparator), [iterable](#sourceiterable))**  
**isSorted([iterable](#sourceiterable))**  
**__isSorted([iterable](#iterable), ?[comparator](#comparator))**  

Returns `true` if the values in `iterable` are sorted in ascending order according to `comparator`, and `false` otherwise.

```js
isSorted([1, 2, 3]); // true
isSorted((a, b) => b - a, [3, 2, 1]); // true
```

### asyncIsSorted

**asyncIsSorted([comparator](#comparator), [iterable](#asyncsourceiterable))**  
**asyncIsSorted([iterable](#asyncsourceiterable))**  
**__asyncIsSorted([iterable](#asynciterable), ?[comparator](#comparator))**  

See [isSorted](#issorted)

### reduce

**reduce(initial, reducer, [iterable](#sourceiterable))**  
**reduce(reducer, [iterable](#sourceiterable))**  
**__reduce([iterable](#iterable), reducer, ?initial)**  

Defaults:

- `initial`: `first(iterable)`

Turns `iterable` into a single `result` value using a reducer function. For each `value` in `iterable`, calls `reducer(result, value, idx)`, where result `result` is either the `initial` for the first value in `iterable`, otherwise the value returned from the last call to `reducer`. It is equivalent to `Array.prototype.reduce`.

```js
reduce(0, (result, v) => result + v, [1, 2, 3]); // 6
reduce(10, (result, v) => result + v, [1, 2, 3]); // 16
reduce((result, v) => result + v, [1, 2, 3]); // 6
```

### asyncReduce

**asyncReduce(initial, reducer, [iterable](#asyncsourceiterable))**  
**asyncReduce(reducer, [iterable](#asyncsourceiterable))**  
**__asyncReduce([iterable](#asynciterable), reducer, ?initial)**  

See [reduce](#reduce)

### size

**size(iterable)**  
**__size(iterable)**  

Returns the number of values in `iterable` **by iterating over it**. This is more work than is neccessary for any concrete type like `Array`, `Map`, or `Set`. If you know your data is one of those types, use [getSize](#getsize) instead.

```js
size([1, 2, 3]); // 3
```

### asyncSize

**asyncSize(iterable)**  
**__asyncSize(iterable)**  

See [size](#size)

### some

**some(func, [iterable](#sourceiterable))**  
**__some([iterable](#iterable), func)**  

Returns `true` if the result of `predicate(value, idx)` is truthy for at least one value in `iterable`, and `false` otherwise.

```js
some(isEven, [1, 2, 3]); // true
some(isEven, [1, 3, 7]); // false
```

### asyncSome

**asyncSome(func, [iterable](#asyncsourceiterable))**  
**__asyncSome([iterable](#asynciterable), func)**  

See [some](#some)

### startsWith

**startsWith(values, [iterable](#sourceiterable))**  
**__startsWith([iterable](#iterable), values)**  

Returns `true` if the first value in `source` is `value`, as compared with `===`. Otherwise returns `false`.

```js
startsWith(1, [1, 2, 3]); // true
```

Note: If `source` is a string you should instead use [startsWithSeq](#startswithseq). A warning will be emitted if you do not.

### asyncStartsWith

**asyncStartsWith(values, [iterable](#asyncsourceiterable))**  
**__asyncStartsWith([iterable](#asynciterable), values)**  

See [startsWith](#startswith)

### startsWithAny

**startsWithAny(values, [iterable](#sourceiterable))**  
**__startsWithAny([iterable](#iterable), values)**  

Returns `true` if the first value in `source` is any `value` in `values`, as compared with `===`. Otherwise returns `false`.

```js
startsWithAny([0, 1], [1, 2, 3]); // true
```

Note: If `source` is a string you should instead use [startsWithAnySeq](#startswithanyseq). A warning will be emitted if you do not.

### asyncStartsWithAny

**asyncStartsWithAny(values, [iterable](#asyncsourceiterable))**  
**__asyncStartsWithAny([iterable](#asynciterable), values)**  

See [startsWithAny](#startswithany)

### startsWithAnySeq

**startsWithAnySeq(seqs, [iterable](#sourceiterable))**  
**__startsWithAnySeq([iterable](#iterable), seqs)**  

Returns `true` if the first subsequence of values in `source` match any `valueSeq` in `valueSeqs`, where each value is compared with `===`. Otherwise returns `false`.

```js
startsWithAnySeq(
  [
    [0, 1],
    [1, 2],
  ],
  [1, 2, 3],
); // true
```

### asyncStartsWithAnySeq

**asyncStartsWithAnySeq(seqs, [iterable](#asyncsourceiterable))**  
**__asyncStartsWithAnySeq([iterable](#asynciterable), seqs)**  

See [startsWithAnySeq](#startswithanyseq)

### startsWithSeq

**startsWithSeq(seq, [iterable](#sourceiterable))**  
**__startsWithSeq([iterable](#iterable), seq)**  

Returns `true` if the first subsequence of values in `source` matches `valueSeq`, where each value is compared with `===`. Otherwise returns `false`.

```js
startsWithSeq([1, 2], [1, 2, 3]); // true
```

### asyncStartsWithSeq

**asyncStartsWithSeq(seq, [iterable](#asyncsourceiterable))**  
**__asyncStartsWithSeq([iterable](#asynciterable), seq)**  

See [startsWithSeq](#startswithseq)

### str

**str([chars](#sourceiterable))**  
**__str([chars](#iterable))**  

See [stingFrom](#stringfrom)

### asyncStr

**asyncStr([chars](#asyncsourceiterable))**  
**__asyncStr([chars](#asynciterable))**  

See [stringFromAsync](#stringfromasync)

### takeLast

**takeLast([iterable](#sourceiterable))**  
**__takeLast([iterable](#iterable))**  

Returns the last value from `iterable`, or `undefined` when `iterable` is empty.

Performance note: this requires consuming the entire iterable. If `iterable` is an array this method will do a lot of unnecessary work compared to `arrayLast(array)`.

```js
takeLast([1, 2, 3]); // 3
takeLast([]); // undefined
```

### asyncTakeLast

**asyncTakeLast([iterable](#asyncsourceiterable))**  
**__asyncTakeLast([iterable](#asynciterable))**  

See [takeLast](#takelast)

### takeLastOr

**takeLastOr(whenEmpty, [iterable](#sourceiterable))**  
**__takeLastOr([iterable](#iterable), whenEmpty)**  

Returns the last value from `iterable`, or `whenEmpty` when `iterable` is empty.

Performance note: this requires consuming the entire iterable. If `iterable` is an array this method will do a lot of unnecessary work compared to `arrayLastOr(array, whenEmpty)`.

```js
takeLastOr(0, [1, 2, 3]); // 3
takeLastOr(0, []); // 0
```

### asyncTakeLastOr

**asyncTakeLastOr(whenEmpty, [iterable](#asyncsourceiterable))**  
**__asyncTakeLastOr([iterable](#asynciterable), whenEmpty)**  

See [takeLastOr](#takelastor)


## Combinatory iterables

### combinations

**combinations(n, [iterable](#sourceiterable))**  
**combinations([iterable](#sourceiterable))**  
**__combinations([iterable](#iterable), ?n)**  

Defaults:

`n`: `size(iterable)`

Yields combinations of length `n` of values from `iterable`.

```js
combinations([0, 1]); // Iterable[[0, 1]]
combinations(2, [1, 2, 3, 4]);
// Iterable [
//   [ 1, 2 ],
//   [ 1, 3 ],
//   [ 1, 4 ],
//   [ 2, 3 ],
//   [ 2, 4 ],
//   [ 3, 4 ]
// ]
```

The number of values that will be yielded is accessible through a `size` property.
Note that the actual combinations are not computed in the example below

```js
combinations(2, [1, 2, 3, 4]).size === 6;
```

### combinationsWithReplacement

**combinationsWithReplacement(n, [iterable](#sourceiterable))**  
**combinationsWithReplacement([iterable](#sourceiterable))**  
**__combinationsWithReplacement([iterable](#iterable), ?n)**  

Defaults:

`n`: `size(iterable)`

Yields combinations of length `n` of values from `iterable`, allowing replacement.

```js
combinationsWithReplacement([0, 1]); // Iterable[[0, 0] [0, 1] [1, 1]]
combinationsWithReplacement(2, [1, 2, 3, 4]);
// Iterable[
//   [ 1, 1 ],
//   [ 1, 2 ],
//   [ 1, 3 ],
//   [ 1, 4 ],
//   [ 2, 2 ],
//   [ 2, 3 ],
//   [ 2, 4 ],
//   [ 3, 3 ],
//   [ 3, 4 ],
//   [ 4, 4 ]
// ]
```

The number of values that will be yielded is accessible through a `size` property.
Note that the actual combinations are not computed in the example below

```js
combinationsWithReplacement(2, [1, 2, 3, 4]).size === 10;
```

### permutations

**permutations(k, [iterable](#sourceiterable))**  
**permutations([iterable](#sourceiterable))**  
**__permutations([iterable](#iterable), ?k)**  

Defaults:

`n`: `size(iterable)`

Yields permutations of length `n` of values from `iterable`.

```js
permutations([0, 1]); // Iterable[[0, 1] [1, 0]]
permutations(2, [1, 2, 3, 4]);
// Iterable[
//   [ 1, 2 ],
//   [ 1, 3 ],
//   [ 1, 4 ],
//   [ 2, 1 ],
//   [ 2, 3 ],
//   [ 2, 4 ],
//   [ 3, 1 ],
//   [ 3, 2 ],
//   [ 3, 4 ],
//   [ 4, 1 ],
//   [ 4, 2 ],
//   [ 4, 3 ]
// ]
```

The number of values that will be yielded is accessible through a `size` property.
Note that the actual combinations are not computed in the example below

```js
permutations([0, 1]).size === 2;
```

### product

**product(...[iterables](#sourceiterable))**  
**__product([iterables](#iterable))**  

This returns the [cartesian product](https://en.wikipedia.org/wiki/Cartesian_product) of two or more `iterables`.

```js
product([1, 2], [3, 4], [5, 6]);
// Iterable [
//   [1, 3, 5],
//   [1, 3, 6],
//   [1, 4, 5],
//   [1, 4, 6],
//   [2, 3, 5],
//   [2, 3, 6],
//   [2, 4, 5],
//   [2, 4, 6]
// ]

// You can use fork to get the prodcut of an iterable with itself.
product(...fork(2, [0, 1])); // Iterable[[0, 0], [0, 1], [1, 0], [1, 1]]
```

The number of values that will be yielded is accessible through a `size` property.
Note that the actual combinations are not computed in the example below

```js
product([1, 2], [3, 4], [5, 6]).size === 8;
```


## Control timing inside an async iterable

### asyncBuffer

**asyncBuffer(n, [source](#asyncsourceiterable))**  
**__asyncBuffer([source](#asynciterable), n)**  

Starts fetching the next `n` values of `source` so that the wait for a value should be minimal by the time it is needed. Yields the same values in the same order as `source`.

```js
const source = asyncMap(
  (_) => new Promise((resolve) => setTimeout(resolve, 200)),
  range(),
);

const buffered = asyncBuffer(6, source); // Values start buffering

await new Promise((resolve) => setTimeout(resolve, 800));

// Four values are already buffered here
await buffered.next(); // ~0ms
await buffered.next(); // ~0ms
await buffered.next(); // ~0ms
await buffered.next(); // ~0ms
// After this point values are being requested as fast as they
// can possibly be fulfilled, so buffer offers no additional benefits.
await buffered.next(); // ~200ms
await buffered.next(); // ~200ms
// But if additional delays are incurred in processing values,
// it has value again!
await new Promise((resolve) => setTimeout(resolve, 300));
await buffered.next(); // ~0ms
await buffered.next(); // ~100ms
await buffered.next(); // ~200ms
// ...
```

### asyncThrottle

**asyncThrottle(intervalMs, [source](#asyncsourceiterable))**  
**__asyncThrottle([source](#asynciterable), intervalMs)**  

Rate-limits `source`, ensuring that requests for the next value in `source` are made at intervals of no less than `intervalMs` milliseconds. Yields the same values in the same order as `source`.

```js
async function* pollHealth() {
  while (true) {
    yield fetch('/health').json();
  }
}

for (const response of asyncThrottle(100, pollHealth)) {
  // This happens only once every 100 milliseconds
  renderHealth(response);
}
```


## Cache an iterable

### fork

**fork([source](#sourceiterable))**  
**__fork([source](#iterable))**  

Returns an iterable of `forks` of `source`. Each fork contains the same values as `source`, and can be consumed independently. This works even if `source` cannot itself be consumed more than once, for example because it is a generator. Values are buffered until they have been consumed by all forks. Each fork can only be consumed once. Note that fork caches values, and these cached values can never be released until `forks.return()` is called on the iterable of forks. If you are consuming `forks` using destructuring syntax (as in this example) or a `for..of` loop, this is done for you.

```js
const [forkA, forkB, forkC] = fork(function* () {
  yield 1;
  yield 2;
  yield 3;
});

forkA.next().value; // 1
forkB.next().value; // 1
forkC.next().value; // 1

forkA.next().value; // 2
forkB.next().value; // 2
forkC.next().value; // 2

forkA.next().value; // 3
forkB.next().value; // 3
forkC.next().value; // 3
```

**WARNING**

There is a really good chance that you'd be better off using `toArray` to cache an iterable instead of `fork`. `fork` is only better when you have multiple consumers of an infinite (or very large) iterable, and you are sure that they will be consuming in parallel.

### asyncFork

**asyncFork([source](#asyncsourceiterable))**  
**__asyncFork([source](#asynciterable))**  

See [fork](#fork)

Note: Returns an iterable (sync) of async iterables.


## Consume an iterable

### arrayFrom

**arrayFrom([strings](#sourceiterable))**  

Aliases: `toArray`

Transform `source` into an array. Roughly equivalent to `Array.from`, except that it turns `null` and `undefined` into `[]`. Since arrays are iterable, this method can also be thought of as a way to cache all values in an iterable.

```js
arrayFrom(slice(0, 3, range())); // [1, 2, 3]
arrayFrom(null); // []
```

### arrayFromAsync

**arrayFromAsync([source](#asyncsourceiterable))**  

Aliases: `asyncToArray`

Transform an async `source` into an array. Since arrays are valid inputs to async methods, can also be thought of as a way to cache all values in an async iterable.

```js
await arrayFromAsync(asyncWrap(slice(0, 3, range()))); // [1, 2, 3]
await arrayFromAsync(null); // []
```

### consume

**consume(callback, [iterable](#sourceiterable))**  
**consume([iterable](#sourceiterable))**  
**__consume([iterable](#iterable), ?callback)**  

Consumes `iterable`.

`consume(callback, iterable)` is a deprecated alias for `forEach(callback, iterable)`.

```js
function* log123() {
  console.log('1');
  yield;
  console.log('2');
  yield;
  console.log('3');
}

consume(log123); // prints 1 2 3
```

### asyncConsume

**asyncConsume(callback, [iterable](#asyncsourceiterable))**  
**asyncConsume([iterable](#asyncsourceiterable))**  
**__asyncConsume([iterable](#asynciterable), ?callback)**  

See [consume](#consume)

### forEach

**forEach(callback, [iterable](#sourceiterable))**  
**__forEach([iterable](#iterable), callback)**  

Calls `callback(value, idx)` for each value in `iterable`. Note that as a consuming method, `forEach` is not lazy. It will trigger evaluation of `iterable`.

```js
forEach((value) => console.log(value), [1, 2, 3]); // prints 1, 2, 3
forEach((value) => console.log(value), null); //
```

### asyncForEach

**asyncForEach(callback, [iterable](#asyncsourceiterable))**  
**__asyncForEach([iterable](#asynciterable), callback)**  

See [forEach](#foreach)

### objectFrom

**objectFrom([entries](#sourceiterable), ?prototype)**  

Aliases: `toObject`

Transforms an `entries` iterable into an object. Each entry should be of the form `[key, value]`. Roughly equivalent to `Object.fromEntries`, except that it turns `null` and `undefined` into `{}`. An optional `prototype` will be passed to `Object.create` if specified.

```js
objectFrom([
  ['droids', ['R2', '3PO']],
  ['people', ['Luke', 'Leia', 'Han']],
]); // { droids: ['R2', '3PO'], people: ['Luke', 'Leia', 'Han'] }
objectFrom(null); // {}
```

### objectFromAsync

**objectFromAsync([entries](#asyncsourceiterable), ?prototype)**  

Aliases: `asyncToObject`

Transform an async `entries` iterable (or a sync one) into an object. Each entry should be of the form `[key, value]`. An optional `prototype` will be passed to `Object.create` if specified.

```js
objectFromAsync(
  asyncWrap([
    ['droids', ['R2', '3PO']],
    [('people': ['Luke', 'Leia', 'Han'])],
  ]),
); // { droids: ['R2', '3PO'], people: ['Luke', 'Leia', 'Han'] }
await objectFromAsync(null); // []
```

### stringFrom

**stringFrom([source](#sourceiterable))**  

Aliases: `str`

Concatenate `chars` into a string.

```js
stringFrom(['a', 'b', 'c', 'def']); // 'abcdef'
stringFrom(null); // ''
```

### stringFromAsync

**stringFromAsync([strings](#sourceiterable))**  

Aliases: `asyncStr`

See [stringFrom](#string-from).

### toArray

**toArray(source)**  
**__toArray(source)**  

See [arrayFrom](#arrayfrom)

### asyncToArray

**asyncToArray(source)**  
**__asyncToArray(source)**  

See [arrayFromAsync](#arrayfromasync)

### toObject

**toObject(iterable, proto)**  
**__toObject(iterable, proto)**  

See [objectFrom](#objectfrom)

### asyncToObject

**asyncToObject(iterable, proto)**  
**__asyncToObject(iterable, proto)**  

See [objectFromAsync](#objectfromasync)


## Predicates (test a value)

### isAsyncIterable

**isAsyncIterable(value)**  

Returns `true` if `value` has a `Symbol.asyncIterator` property and `false` otherwise. Type-safe in typescript.

```js
isAsyncIterable((async function* () {})()); // true
isAsyncIterable((function* () {})()); // false
isAsyncIterable([]); // false
isAsyncIterable({}); // false
isAsyncIterable(undefined); // false
isAsyncIterable(null); // false
```

### isAsyncLoopable

**isAsyncLoopable(value)**  

Returns `true` if `value` has a `Symbol.asyncIterator` or `Symbol.iterator` property and `false` otherwise. If `isAsyncLoopable(value)` then `value` may be used as the subject of a `for await..of` loop. Type-safe in typescript.

```js
isAsyncLoopable((async function* () {})()); // true
isAsyncLoopable((function* () {})()); // true
isAsyncLoopable([]); // true
isAsyncLoopable({}); // false
isAsyncLoopable(undefined); // false
isAsyncLoopable(null); // false
```

### isAsyncWrappable

**isAsyncWrappable(value)**  

Returns `true` if `value` [isAsyncIterable](#isasynciterable), [isIterable](#isiterable), or [isNil](#isnil) (and `false` otherwise). When `isAsyncWrappable(value)`, it is safe to pass value to [asyncWrap](#asyncwrap) as well as other methods that take an [AsyncSourceIterable](#asyncsourceiterable), which is usually named `iterable` or `source`. Type-safe in typescript.

```js
isAsyncWrappable((async function* () {})()); // true
isAsyncWrappable((function* () {})()); // true
isAsyncWrappable([]); // true
isAsyncWrappable(undefined); // true
isAsyncWrappable(null); // true
isAsyncWrappable({}); // false
isAsyncWrappable(4); // false
```

### isIterable

**isIterable(value)**  

Returns `true` if `value` is iterable (which is to say it has a `Symbol.iterator` property) and `false` otherwise. Iterables are inputs (often named `source` or `iterable`) to most `iter-tools` methods, so it is useful to know all the ways you can create them:

Javascript's builtin data types are iterable:

```js
isIterable([]); // true
isIterable(new Map()); // true
isIterable(new Set()); // true
```

Any class can be iterable if it defines a `Symbol.iterator` method. Note that something similar works just as well if you are still constructing your prototype chains without the help of the `class` keyword.

```js
class MyClass {
  constructor(data = []) {
    this.data = data;
  },

  [Symbol.iterator]() {
    return this.data[Symbol.iterator]();
  }
}
isIterable(new MyClass())
```

The result of calling a generator function is an iterable iterator. Generator functions are highly useful implementing any kind of operation. Most `iter-tools` are implemented using them internally.

```js
function* range() {
  for (let i = 0; ; i++) yield i;
}
isIterable(range()); // true
```

All iterators _should_ also be iterables. This can be achieved by returning `this` from the `Symbol.iterator` method like so:

```js
const yesIterator = {
  next() {
    return { value: 'yes', done: false }
  }
  [Symbol.iterator]() {
    return this;
  }
}
isIterable(yesIterator); // true
```

Many iterators use `return this` (as above) to ensure they can be used anywhere an iterable can be. This means you can write confusing things like `[Symbol.iterator]()[Symbol.iterator]()`. Beware however! While this is often safe you must remember that the value returned by `[Symbol.iterator]()` is not required to be an iterable: it must only be an iterator.

Other kinds of values are not iterable, though `iter-tools` chooses to allow `null` and `undefined` in most places an iterable is expected.

```js
isIterable(undefined); // false
isIterable(null); // false
isIterable(42); // false
isIterable({}); // false
```

Note: `isIterable` does not check to make sure that `Symbol.iterator` is a method. Code in which `Symbol.iterator` is not a method is always incorrect, and attempted usage of such an "iterable" will trigger an appropriate error at the language level.

### isLoopable

See [isIterable](#isiterable). For sync iterables these methods share the same implementation.

### isNil

**isNil(value)**  

Returns `true` if `value` is `null` or `undefined` and `false` otherwise. Type-safe in typescript.

```js
isNil(undefined); // true
isNil(null); // true
isNil(0); // false
isNil({}); // false
isNil(NaN); // false
```

### isNull

**isNull(value)**  

Returns `true` if `value` is `null` and `false` otherwise. Type-safe in typescript.

```js
isNull(null); // true
isNull(undefined); // false
```

### isUndefined

**isUndefined(value)**  

Returns `true` if `value` is `undefined` and `false` otherwise. Implemented using `typeof`. Type-safe in typescript.

```js
isUndefined(undefined); // true
isUndefined(null); // false
```

### isWrappable

**isWrappable(value)**  

Returns `true` if `value` [isIterable](#isiterable) or `value` [isNil](#isnil) (and `false` otherwise). When `isWrappable(value)`, it is safe to pass value to [wrap](#wrap) (and any other method which exepects a [SourceIterable](#sourceiterable)). Type-safe in typescript.

```js
isWrappable([]); // true
isWrappable(undefined); // true
isWrappable(null); // true
isWrappable({}); // false
```

### notAsyncIterable

**notAsyncIterable(value)**  

Returns `false` if `value` has a `Symbol.asyncIterator` property and `true` otherwise. Type-safe in typescript.

```js
notAsyncIterable((async function* () {})()); // false
notAsyncIterable((function* () {})()); // true
notAsyncIterable([]); // true
notAsyncIterable({}); // true
notAsyncIterable(undefined); // true
notAsyncIterable(null); // true
```

### notAsyncLoopable

**notAsyncLoopable(value)**  

Returns `false` if `value` has a `Symbol.asyncIterator` or `Symbol.iterator` property and `true` otherwise. When `notAsyncLoopable(value)`, using value as the subject of a `for await..of` loop will throw an error.

```js
notAsyncLoopable((async function* () {})()); // false
notAsyncLoopable((function* () {})()); // false
notAsyncLoopable([]); // false
notAsyncLoopable(undefined); // true
notAsyncLoopable(null); // true
notAsyncLoopable({}); // true
```

### notAsyncWrappable

**notAsyncWrappable(value)**  

Returns `false` if `value` [isAsyncIterable](#isasynciterable), [isIterable](#isiterable), or [isNil](#isnil) (and `true` otherwise). When `notAsyncWrappable(value)`, passing `value` to [asyncWrap](#asyncwrap) (or any other method which expects a [AsyncSourceIterable](#asyncsourceiterable)) will throw an error.

```js
notAsyncWrappable([]); // false
notAsyncWrappable(undefined); // false
notAsyncWrappable(null); // false
notAsyncWrappable((function* () {})()); // false
notAsyncWrappable((async function* () {})()); // false
notAsyncWrappable({}); // true
notAsyncWrappable(4); // true
```

### notIterable

**notIterable(value)**  

Returns `false` if `value` is iterable (has a `Symbol.iterator` property) and `true` otherwise. For more details see the method's inverse: [isIterable](#isiterable). Type-safe in typescript.

```js
notIterable({}); // true
notIterable(undefined); // true
notIterable(null); // true
notIterable((function* () {})()); // false
notIterable([]); // false
```

### notLoopable

See [notIterable](#notiterable). For sync iterables these methods share the same implementation.

### notNil

**notNil(value)**  

Returns `false` if `value` is `null` or `undefined` and `true` otherwise. Type-safe in typescript.

```js
notNil(0); // true
notNil(undefined); // false
notNil(null); // false
```

### notNull

**notNull(value)**  

Returns `false` if `value` is `null` and `true` otherwise. Type-safe in typescript.

```js
notNull(undefined); // true
notNull(null); // false
```

### notUndefined

**notUndefined(value)**  

Returns `false` if `value` is `undefined` and `true` otherwise. Implemented using `typeof`. Type-safe in typescript.

```js
notUndefined(null); // true
notUndefined(undefined); // false
```

### notWrappable

**notWrappable(value)**  

Returns `false` if `value` [isIterable](#isiterable) or `value` [isNil](#isnil) (and `true` otherwise). When `notWrappable(value)`, passing `value` to [wrap](#wrap) (or any other method which expects a [SourceIterable](#sourceiterable)) will throw an error.

```js
notWrappable([]); // false
notWrappable(undefined); // false
notWrappable(null); // false
notWrappable({}); // true
notWrappable(4); // true
```


## Utilities

### apply

**apply(fn, args)**  
**__apply(fn, args)**  

`apply` is a convenience method. Its implementation is:

```js
(fn, args = []) => fn(...args);
```

`apply` has three main differences from `Function.prototype.apply`. It does not take a `thisArg`, the args to apply may be specified as an iterable, and if you do not pass the `args` iterable, the result is a partial application, not a no-args call to `fn`.

### arrayFirst

**arrayFirst(array)**  

`return array ? array[0] : undefined`

### arrayFirstOr

**arrayFirstOr(whenEmpty, array)**  

`return array && array.length ? array[0] : whenEmpty`

### arrayLast

**arrayLast(array)**  

`return array ? array[array.length - 1] : undefined`

### arrayLastOr

**arrayLastOr(whenEmpty, array)**  

`return array && array.length ? array[array.length - 1] : whenEmpty`

### arrayReverse

**arrayReverse(source)**  
**__arrayReverse(source)**  

Yields the elements from `source` in reverse order. `source` must be an array, string, `null`, or `undefined`.

### call

**call(fn, ...args)**  
**__call(fn, ...args)**  

`call` is a convenience method. Its implementation is:

```js
(fn, ...args) => fn(...args);
```

`call` has only one difference from `Function.prototype.call`, which is that it does not take a `thisArg`.

### compose

**compose(...fns)**  

Allows nested calls to be flattened out for improved readability. `compose(a, b, c)` is equivalent to `a(b(c))`, where `a`, `b`, and `c`, are functions. `compose` is usually combined with curryied forms of other methods so that the `source` (or `iterable`) argument is passed between the composed methods.

```js
const filterMap = compose(
  map((x) => x + 1),
  filter((x) => x % 2 === 0),
);

filterMap([0, 1, 2, 3, 4]); // Iterable[1, 3, 5]
```

Note: If seems backwards to you that `filter` appears below `map` yet runs first, you're probably looking for [pipe](#pipe).

### execPipe

**execPipe(initial, ...fns)**  

`execPipe(inital, ...fns)` is sugar for `pipe(...fns)(initial)`. See [pipe](#pipe)

```js
execPipe(
  [0, 1, 2, 3, 4],
  filter(x => x % 2 === 0)
  map(x => x + 1),
); // Iterable[1, 3, 5]
```

### getSize

**getSize(sequence)**  

Returns the size of `sequence` as determined by accessing `length` if `Array.isArray(sequence)`, or `sequence.size` otherwise. The size of `null` or `undefined` is `0`. Throws an error if a numeric size cannot be found in this way. If you have an iterable with no cached size you should instead use [size](#size).

```js
getSize([1, 2, 3]); // 3
getSize(new Map([1, 2, 3])); // 3
getSize(null); // 0
```

### pipe

**pipe(...fns)**  

Allows nested calls to be flattened out for improved readability. `pipe(a, b, c)` is equivalent to `c(b(a))`, where `a`, `b`, and `c`, are functions. `pipe` is usually combined with curryied forms of other methods so that the `source` (or `iterable`) argument is passed between the composed methods.

```js
const filterMap = pipe(
  filter((x) => x % 2 === 0),
  map((x) => x + 1),
);

filterMap([0, 1, 2, 3, 4]); // Iterable[1, 3, 5]
```

Note: `pipe` is equivalent to [compose](#compose) but with inverted order of operations.

### when

**when(condition, value)**  

`when` is a helper for use with the es6 spread syntax (the `...` operator). When `condition` is truthy its result is `value`. When condition is falsy its result is an empty iterable object. This is useful to avoid an unnecessarily difficult to read pattern that often causes code formatters (prettier, specifically) to emit an undesireable number of lines:

```js
const always = true;
const sometimes = Math.random() > 0.5;

const arr = [always, ...(sometimes ? [sometimes] : [])]; // [true, true] OR [true]
```

Instead, you can use the when method like so:

```js
const whenArr = [
  always,
  ...when(sometimes, [sometimes]),
  ...when(sometimes, null), // nothing to spread? no problem
]; // [true, true] OR [true]
```

The pattern works equally well with objects.

```js
const whenObj = {
  always,
  ...when(sometimes, { sometimes }),
  ...when(sometimes, null),
}; // { always: true } OR { always: true, somtimes: true }
```


## Generator helpers

### interleave

**interleave(strategy, options, ...[sources](#sourceiterable))**  
**interleave(strategy, ...[sources](#sourceiterable))**  
**__interleave([sources](#iterable), strategy, ?options)**  

Facilitates the creation of new strategies for interleaving values from multiple iterables. It does this by decorating the `strategy` [generator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*), which is to say providing it with arguments and yielding its values. The responsibilities of the wrapping code are to forward any provided `options`, decorate the source iterables with [peekerators](#peekerate), manage the special `all` peekerator, and to call `return()` on any incomplete peekerators. The `all` peekerator provides `all.done` to indicate whether interleaving is complete, and `all.value`: a reference to the first peekerator which is not done. The `all` peekerator cannot be advanced.

Both [collate](#collate) and [roundRobin](#roundrobin) are implemented using `interleave`, and it is expected that most use cases will be served by one or the other. Their implementations also serve as useful examples.

```js
function* alternatingStrategy(
  options,
  all,
  ...peekerators
) {
  const { count = 1 } = options;

  while (!all.done) {
    for (const peekr of peekerators) {
      for (let i = 0; i < count; i++) {
        if (!peekr.done) {
          yield peekr.value;
          peekr.advance();
        }
      }
    }
  }
}

const alternatingInterleave = interleave(
  alternatingStrategy,
);

const a = [1, 2, 5, 6];
const b = [3, 4, 7];

alternatingInterleave({ count: 2 }, a, b); // [1, 2, 3, 4, 5, 6, 7]
```

Note: This method has only cursory Typecript support because Typescript lacks the power to describe it. Instead you should include your own type definitions. The example code with typedefs might look like this:

```js
function* alternatingStrategy<T>(
  options: { count: number },
  all: Peekerator<Peekerator<T>>,
  ...peekerators: Array<Peekerator<T>>
) {
  // implementation is unchanged, but now type-safe
}

function alternatingInterleave<T>(
  count: number,
  ...sources: Array<Iterable<T>>
): IterableIterator<T> {
  return interleave(alternatingStrategy, { count }, ...sources);
});
```

A final note: if you are creating a strategy which takes no options, it would be wise to bind an empty options object to avoid the confusion that iter-tools' partial application rules could cause.

```js
const myInterleave = interleave(myStrategy, {});
```

### asyncInterleave

**asyncInterleave(strategy, options, ...[sources](#asyncsourceiterable))**  
**asyncInterleave(strategy, ...[sources](#asyncsourceiterable))**  
**__asyncInterleave([sources](#asynciterable), strategy, ?options)**  

See [interleave](#interleave)

### peekerate

**peekerate(source)**  
**__peekerate(source)**  

Turns `source` into a peekerator (often shortened to `peekr`), which is conceptually equivalent to an iterator but is often easier to work with. Peekerators always have a `{done, value}` step from the source iterator stored as `peekr.current`. For convenience `peekr.done` and `peekr.value` are also present. To load the next step call `peekr.advance()`. No value is returned.

Peekerators allow an iterator to be used as internal state. Normal iterators are of course stateful, but less useful for this purpose as it is not possible to access their state without altering it. Peekerators are also have safer typedefs than iterators.

```js
const peekerator = peekerate([0, 1, 2]);

while (!peekerator.done) {
  log(peekerator.value + 1);
  peekerator.advance();
}

// logs 1, 2, 3
```

Also exported is the `Peekerator` base class. Instances should be made using `Peekerator.from(iteratable)`.

Note that in typescript definitions `Peekerator` is a type not a class, so if you need the class e.g. for `extends` or `instanceof` I have included an alias for `Peekerator` named `PeekeratorClass`. The alias has different typedefs that are less safe but also will not throw errors on value usages.

### asyncPeekerate

**asyncPeekerate(source)**  
**__asyncPeekerate(source)**  

See [peekerate](#peekerate)

Note: Returns a promise of a peekerator, which is necessary for the first value to be fetched.

```js
const peekerator = await asyncPeekerate([1, 2, 3]);

while (!peekerator.done) {
  log(peekerator.value + 1);
  await peekerator.advance();
}
```

### spliterate

**spliterate(strategy, options, [source](#sourceiterable))**  
**spliterate(strategy, [source](#sourceiterable))**  
**__spliterate([source](#iterable), strategy, ?options)**  

Facilitates the creation of methods which split a `source` iterable into multiple parts. The `strategy` generator yield a flat output containing values from `source` as well as special `split` sentinel values. `spliterate` decorates the values yielded from `strategy()`. Each instance of the `split` sentinel will yield a new part. Thus for a `strategy` which yields `split` `n` times, `n + 1` parts will be yielded.

Other methods in the split\* family (e.g. [splitAt](#splitat), [splitOn](#spliton), [splitWith](#splitwith)) are implemented using `spliterate` under the hood. It is expected that most use cases will be served by one of these existing methods. Their implementations also serve as useful examples.

Here is a slightly simplified implementation of [batch](#batch):

<!-- prettier-ignore -->
```js
function* batchStrategy(split { size }, source) {
  for (const [value, i] of enumerate(source)) {
    if (i % size === 0) yield split;
    yield value;
  }
}

const batch = spliterate(batchStrategy);

const iterable = [0, 'a', 1, 'b', 2, 'c'];

for (const [idx, letter] of batch({ size: 2 }, iterable)) {
  log(idx, letter);
}
// 0 a
// 1 b
// 2 c
```

Note: This method has only cursory Typecript support because Typescript lacks the power to describe it. Instead you should include your own type definitions. The example code with typedefs might look like this:

```js
function* batchStrategy<T>(
  split: symbol,
  options: { size: number },
  source: Iterable<T>,
) {
  // implementation is unchanged
}

function batch<T>(
  size: number,
  source: Iterable<T>,
): IterableIterator<IterableIterator<T>> {
  return spliterate(batchStrategy, { size }, source);
}
```

A final note: if you are creating a strategy which takes no options, it would be wise to bind an empty options object to avoid the confusion that iter-tools' partial application rules could cause.

```js
const mySpliterate = spliterate(myStrategy, {});
```

### asyncSpliterate

**asyncSpliterate(strategy, options, [source](#asyncsourceiterable))**  
**asyncSpliterate(strategy, [source](#asyncsourceiterable))**  
**__asyncSpliterate([source](#asynciterable), strategy, ?options)**  

See [spliterate](#spliterate)

### spliterateGrouped

**spliterateGrouped(strategy, options, [source](#sourceiterable))**  
**spliterateGrouped(strategy, [source](#sourceiterable))**  
**__spliterateGrouped([source](#iterable), strategy, ?options)**  

Facilitates the creation of methods which split a `source` iterable into multiple keyed groups. The `strategy` generator yield a flat output containing values from `source` as well as special `split` sentinel values. `spliterate` decorates the values yielded from `strategy()`. Each instance of the `split` sentinel starts a new group. The value immediately following a `split` is the key for the group. This means that a `strategy` which yields `split` `n` times, `n` groups will be yielded.

[groupBy](#groupby) is implemented using `spliterateGrouped` under the hood. It is expected that most use cases will be served by using that method instead.

Included as an example is a lightly edited version of the implementation of `groupBy`. It is expected that in the vast majority of circumstances it will be correct to use the actual [groupBy](#groupby) method and not this one.

<!-- prettier-ignore -->
```js
function* groupingSpliterator(split, { getKey }, source) {
  const peekr = peekerate(source);
  let key = Symbol();

  while (!peekr.done) {
    const lastKey = key;

    key = getKey(peekr.value);

    if (lastKey !== key) {
      yield split;
      yield key;
    }

    yield peekr.value;

    peekr.advance();
  }
}

function groupBy(source, getKey) {
  return spliterateGrouped({ getKey }, source);
}
```

Note: This method has only cursory Typecript support because Typescript lacks the power to describe it. Instead you should include your own type definitions. The example code with typedefs might look like this:

```js
function* groupingSpliterator<T>(
  split: symbol,
  options: { getKey: Function },
  source: Iterable<T>,
) {
  // implementation is unchanged
}

function groupBy<K, T>(
  getKey: (value: T) => K,
  source: Iterable<T>,
): IterableIterator<[K, IterableIterator<T>]> {
  return spliterateGrouped(
    groupingSpliterator,
    { getKey },
    source,
  );
}
```

A final note: if you are creating a strategy which takes no options, it would be wise to bind an empty options object to avoid the confusion that iter-tools' partial application rules could cause.

```js
const mySpliterate = spliterate(myStrategy, {});
```

### asyncSpliterateGrouped

**asyncSpliterateGrouped(strategy, options, [source](#asyncsourceiterable))**  
**asyncSpliterateGrouped(strategy, [source](#asyncsourceiterable))**  
**__asyncSpliterateGrouped([source](#asynciterable), strategy, ?options)**  

See [spliterateGrouped](#spliterategrouped)


