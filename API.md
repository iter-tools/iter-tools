# The iter-tools API

[![Documentation is automatically generated](https://img.shields.io/static/v1?label=docs&message=generated&color=informational)](https://github.com/iter-tools/iter-tools/blob/master/CONTRIBUTING.md#the-code-generator)

**The API documentation is split into these sections:**
 - **[Types](#types)**
 - **[Methods](#methods)**

## Types

Many APIs share types. These named types are used in the formal type definitions, but also throughout the documentation for consistency and clarify.

If you aren't already familiar with the technical definition of an iterable and an iterator, I strongly recommend you first read the MDN docs on [iterators and generators](https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Iterators_and_Generators) and [iteration protocols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols).

## Iterable Types

### Iterable

An object implementing the iterable protocol, which is to say possessing a `Symbol.iterator` method.

### Wrappable

`null`, `undefined`, or [Iterable](#iterable).

### IterableIterator

An [Iterable](#iterable) which is also an iterator, which is to say that it has `next()`, `throw(error)`, and `return(value)` methods. It can be evaluated multiple times calling its `[Symbol.iterator]()` method repeatedly. Note that there is no guarantee that evaluating a result iterable more than once will produce the same values. The result will be repeatable only if any transformations are repeatable and the source iterable returns the same results on each iteration.

### SingletonIterableIterator

A single iterator with a `Symbol.iterator` implementation of `return this`. Once exhausted it will only ever produce empty results, which is a common source of errors.

### PartsIterable

An [IterableIterator](#IterableIterator) of [SingletonIterableIterators](#singletoniterableiterator) which represents the result of some method-specic algorithm for choosing split points in a `source`. Parts are thus non-overlapping subsequences of values from `source`, and each part is (under the hood). Parts are essentially decoration on a single iterator over `source`, so advancing to the next part will cause any attempt to take values from previous parts to throw an error. Working around this limitation is simple when needed: just store each part in an array with `map(toArray, partsIterable)`.

## Async Iterable Types

### AsyncIterable

An object implementing the async iterable protocol, which is to say possessing a `Symbol.asyncIterator` method

### AsyncWrappable

`null`, `undefined`, [AsyncIterable](#asynciterable), or [Iterable](#iterable).

### AsyncIterableIterator

The async version of a [IterableIterator](#IterableIterator). Instead of working as an [Iterable](#iterable) and an iterator, it behaves like an [AsyncIterable](#asynciterable) and an async iterator. The same caveats apply regarding evaluating this kind of result iterable more than once.

### SingletonAsyncIterableIterator

A single async iterator with a `Symbol.asyncIterator` implementation of `return this`. Once exhausted it will only ever produce empty results.

### AsyncPartsIterable

The async version of a [PartsIterable](#partsiterable), which is to say an [AsyncIterableIterator](#asyncIterableIterator) of [SingletonAsyncIterableIterators](#singletonasynciterableiterator). As with `PartsIterable`, only one part can be active at a time.

## Other types

### compare

A `compare` callback is used to determine sort order. These methods have the same API the callback used in `Array.prototype.sort`. `compare` callbacks must always return synchronously, even when sorting async iterables.

A default value is always provided, again the same as is used by `Array.prototype.sort`:

```js
(a, b) => (a > b ? 1 : b > a ? -1 : 0);
```

This code sorts numbers by their value, and strings lexicographically.


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
[filter](#filter) ([async](#asyncfilter))  
[flat](#flat) ([async](#asyncflat))  
[flatMap](#flatmap) ([async](#asyncflatmap))  
[interpose](#interpose) ([async](#asyncinterpose))  
[interposeSeq](#interposeseq) ([async](#asyncinterposeseq))  
[map](#map) ([async](#asyncmap))  
[prepend](#prepend) ([async](#asyncprepend))  
[reverse](#reverse) ([async](#asyncreverse))  
[slice](#slice) ([async](#asyncslice))  
[take](#take) ([async](#asynctake))  
[takeSorted](#takesorted) ([async](#asynctakesorted))  
[takeWhile](#takewhile) ([async](#asynctakewhile))  
[tap](#tap) ([async](#asynctap))  
[window](#window) ([async](#asyncwindow))  
[windowAhead](#windowahead) ([async](#asyncwindowahead))  
[windowBehind](#windowbehind) ([async](#asyncwindowbehind))  
[wrap](#wrap) ([async](#asyncwrap))  

Separate an iterable into multiple iterables

[batch](#batch) ([async](#asyncbatch))  
[bisect](#bisect) ([async](#asyncbisect))  
[split](#split) ([async](#asyncsplit))  
[splitGroups](#splitgroups) ([async](#asyncsplitgroups))  
[splitOn](#spliton) ([async](#asyncspliton))  
[splitOnAny](#splitonany) ([async](#asyncsplitonany))  
[splitOnAnySeq](#splitonanyseq) ([async](#asyncsplitonanyseq))  
[splitOnSeq](#splitonseq) ([async](#asyncsplitonseq))  
[splitWhen](#splitwhen) ([async](#asyncsplitwhen))  

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

[deepEqual](#deepequal) ([async](#asyncdeepequal))  
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

[isArray](#isarray)  
[isAsyncIterable](#isasynciterable)  
[isAsyncLoopable](#isasyncloopable)  
[isAsyncWrappable](#isasyncwrappable)  
[isIterable](#isiterable)  
[isLoopable](#isloopable)  
[isNil](#isnil)  
[isNull](#isnull)  
[isObject](#isobject)  
[isString](#isstring)  
[isUndefined](#isundefined)  
[isWrappable](#iswrappable)  
[notArray](#notarray)  
[notAsyncIterable](#notasynciterable)  
[notAsyncLoopable](#notasyncloopable)  
[notAsyncWrappable](#notasyncwrappable)  
[notIterable](#notiterable)  
[notLoopable](#notloopable)  
[notNil](#notnil)  
[notNull](#notnull)  
[notObject](#notobject)  
[notString](#notstring)  
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

[forkerate](#forkerate) ([async](#asyncforkerate))  
[interleave](#interleave) ([async](#asyncinterleave))  
[peekerate](#peekerate) ([async](#asyncpeekerate))  
[spliterate](#spliterate) ([async](#asyncspliterate))  
[spliterateGrouped](#spliterategrouped) ([async](#asyncspliterategrouped))  


## Create iterables

### cycle

**cycle([source](#wrappable))**  
**__cycle([source](#iterable))**  

Yields the contents of `iterable` repeated for the longest time (forever).

```js
cycle(range(1, 4)); // Iterable[1, 2, 3, 1, 2, 3, 1, 2, 3, ...]
```

### asyncCycle

**asyncCycle([source](#asyncwrappable))**  
**__asyncCycle([source](#asynciterable))**  

See [cycle](#cycle)

### cycleTimes

**cycleTimes(n, [source](#wrappable))**  
**__cycleTimes([source](#iterable), n)**  

Yields the contents of `iterable` repeated `n` times.

```js
cycleTimes(2, range(1, 4)); // Iterable[1, 2, 3, 1, 2, 3]
```

### asyncCycleTimes

**asyncCycleTimes(n, [source](#asyncwrappable))**  
**__asyncCycleTimes([source](#asynciterable), n)**  

See [cycleTimes](#cycletimes)

### range

**range(start, end, ?step)**  
**range(?end)**  
**range({ start, end, step })**  
**__range(?start, ?end, ?step)**  

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

**append(value, [source](#wrappable))**  
**__append([source](#iterable), value)**  

Yields values from `source` with `value` appended.

```js
append(4, [1, 2, 3]); // Iterable[1, 2, 3, 4]
```

### asyncAppend

**asyncAppend(value, [source](#asyncwrappable))**  
**__asyncAppend([source](#asynciterable), value)**  

See [append](#append)

### drop

**drop(n, [iterable](#wrappable))**  
**__drop([iterable](#iterable), n)**  

Yields values from `source`, omitting the first `n` values.

```js
drop(1, ['a', 'b', 'c']); // Iterable['b', 'c']
```

### asyncDrop

**asyncDrop(n, [iterable](#asyncwrappable))**  
**__asyncDrop([iterable](#asynciterable), n)**  

See [drop](#drop)

### dropWhile

**dropWhile(predicate, [source](#wrappable))**  
**__dropWhile([source](#iterable), predicate)**  

Returns values from `source`, omitting consecutive values at the beginning of `source` for which the result of `predicate(value, idx)` is truthy.

```js
dropWhile(isEven, range(5)); // 0, 2, 4
```

### asyncDropWhile

**asyncDropWhile(predicate, [source](#asyncwrappable))**  
**__asyncDropWhile([source](#asynciterable), predicate)**  

See [dropWhile](#dropwhile)

### enumerate

**enumerate(start, [source](#wrappable))**  
**enumerate([source](#wrappable))**  
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

**asyncEnumerate(start, [source](#asyncwrappable))**  
**asyncEnumerate([source](#asyncwrappable))**  
**__asyncEnumerate([source](#asynciterable), ?start)**  

See [enumerate](#enumerate)

### filter

**filter(predicate, [source](#wrappable))**  
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

**asyncFilter(predicate, [source](#asyncwrappable))**  
**__asyncFilter([source](#asynciterable), predicate)**  

See [filter](#filter)

### flat

**flat(shouldFlat, depth, [source](#wrappable))**  
**flat({ shouldFlat, depth }, [source](#wrappable))**  
**flat(depth, [source](#wrappable))**  
**flat([source](#wrappable))**  
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

**asyncFlat(shouldFlat, depth, [source](#asyncwrappable))**  
**asyncFlat({ shouldFlat, depth }, [source](#asyncwrappable))**  
**asyncFlat(depth, [source](#asyncwrappable))**  
**asyncFlat([source](#asyncwrappable))**  
**__asyncFlat([source](#asynciterable), ?depth, ?shouldFlat)**  

See [flat](#flat)

### flatMap

**flatMap(func, [source](#wrappable))**  
**__flatMap([source](#iterable), func)**  

For each value in `source`, yields each value in `predicate(value, idx)`. Equivalent to `Array.prototype.flatMap`.

```js
flatMap((x) => [x - 1, x], [1, 3, 5]); // Iterable[0, 1, 2, 3, 4, 5]
```

### asyncFlatMap

**asyncFlatMap(func, [source](#asyncwrappable))**  
**__asyncFlatMap([source](#asynciterable), func)**  

See [flatMap](#flatmap)

### interpose

**interpose(value, [source](#wrappable))**  
**__interpose([source](#iterable), value)**  

Yields `value` between each of the values in `source`.

```js
interpose(null, [1, 2, 3]); // Iterable[1, null, 2, null, 3]
```

Note: If `source` is a string you should instead use [interposeSeq](#interposeseq). A warning will be emitted if you do not.

### asyncInterpose

**asyncInterpose(value, [source](#asyncwrappable))**  
**__asyncInterpose([source](#asynciterable), value)**  

See [interpose](#interpose)

### interposeSeq

**interposeSeq(seq, [source](#wrappable))**  
**__interposeSeq([source](#iterable), seq)**  

Yields values from `seq` between each of the values in `source`.

```js
interposeSeq([0, 0], [1, 2, 3]); // Iterable[1, 0, 0, 2, 0, 0, 3]
```

### asyncInterposeSeq

**asyncInterposeSeq(seq, [source](#asyncwrappable))**  
**__asyncInterposeSeq([source](#asynciterable), seq)**  

See [interposeSeq](#interposeseq)

### map

**map(func, [source](#wrappable))**  
**__map([source](#iterable), func)**  

For each value in `source`, yields the result of `predicate(value, idx)`. Equivalent to `Array.prototype.map`.

```js
map((x) => x * x, [0, 1, 2, 3]); // Iterable[0, 1, 4, 9]
```

### asyncMap

**asyncMap(func, [source](#asyncwrappable))**  
**__asyncMap([source](#asynciterable), func)**  

See [map](#map)

### prepend

**prepend(value, [source](#wrappable))**  
**__prepend([source](#iterable), value)**  

Yields `value` followed by values from `source`.

```js
prepend(0, [1, 2, 3]); // Iterable[0, 1, 2, 3]
```

### asyncPrepend

**asyncPrepend(value, [source](#asyncwrappable))**  
**__asyncPrepend([source](#asynciterable), value)**  

See [prepend](#prepend)

### reverse

**reverse([source](#wrappable))**  
**__reverse([source](#iterable))**  

Yields the values from `iterable` in reverse order. If `iterable` is not an array, this requires caching all its values in memory.

```js
reverse([1, 2, 3]); // Iterable[3, 2, 1]
```

### asyncReverse

**asyncReverse([source](#asyncwrappable))**  
**__asyncReverse([source](#asynciterable))**  

See [reverse](#reverse)

Note: Unlike `reverse`, `asyncReverse` will always make a cache of the entire input, even if the input is an array. If this is not acceptable, ensure that you use `reverse` on arrays.

### slice

**slice(start, end, step, [source](#wrappable))**  
**slice(start, end, [source](#wrappable))**  
**slice(start, [source](#wrappable))**  
**slice({ start, end, step }, [source](#wrappable))**  
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

**asyncSlice(start, end, step, [source](#asyncwrappable))**  
**asyncSlice(start, end, [source](#asyncwrappable))**  
**asyncSlice(start, [source](#asyncwrappable))**  
**asyncSlice({ start, end, step }, [source](#asyncwrappable))**  
**__asyncSlice([source](#asynciterable), ?start, ?end, ?step)**  

See [slice](#slice)

### take

**take(n, [iterable](#wrappable))**  
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

**asyncTake(n, [iterable](#asyncwrappable))**  
**__asyncTake([iterable](#asynciterable), n)**  

See [take](#take)

### takeSorted

**takeSorted(n, [compare](#compare), [source](#wrappable))**  
**takeSorted(n, [source](#wrappable))**  
**takeSorted([compare](#compare), [source](#wrappable))**  
**takeSorted([source](#wrappable))**  
**__takeSorted([source](#iterable), ?n, ?[compare](#compare))**  

Defaults:

- `comparator`: [default comparator](#the-default-comparator)

Returns `n` values from `source`, sorted in ascending order according to `comparator`. The function is both space efficient (only stores `n` values) and fast (`O(m log n)`), given `m` as the total number of values in `iterable`. It uses a heap internally.

```js
takeSorted(3, [4, 5, 2, 3, 1]); // Iterable[1, 2, 3]
takeSorted([4, 5, 2, 3, 1]); // Iterable[1, 2, 3, 4, 5]
takeSorted(3, (a, b) => b - a, [4, 5, 2, 3, 1]); // Iterable[5, 4, 3]
```

### asyncTakeSorted

**asyncTakeSorted(n, [compare](#compare), [source](#asyncwrappable))**  
**asyncTakeSorted(n, [source](#asyncwrappable))**  
**asyncTakeSorted([compare](#compare), [source](#asyncwrappable))**  
**asyncTakeSorted([source](#asyncwrappable))**  
**__asyncTakeSorted([source](#asynciterable), ?n, ?[compare](#compare))**  

See [takeSorted](#takesorted)

### takeWhile

**takeWhile(predicate, [source](#wrappable))**  
**__takeWhile([source](#iterable), predicate)**  

Returns values from `source`, starting at the beginning up until the first value for which the result of `predicate(value, idx)` is falsy.

```js
takeWhile(isEven, [2, 4, 1, 3]); // Iterable[2, 4]
takeWhile(isEven, [1, 2, 3, 4]); // Iterable[]
```

### asyncTakeWhile

**asyncTakeWhile(predicate, [source](#asyncwrappable))**  
**__asyncTakeWhile([source](#asynciterable), predicate)**  

See [takeWhile](#takewhile)

### tap

**tap(callback, [source](#wrappable))**  
**__tap([source](#iterable), callback)**  

For each value in `source`, executes `callback(value, idx)` and yields the value (unmodified). Note that while this looks similar to what a `for..of` loop or `forEach` method might do, the key difference is that `tap` does not force evaluation of the iterable.

```js
execPipe(
  [0, 1, 2],
  filter((value) => !!value),
  tap((value) => console.log(value)),
  map((value) => value + 1),
); // Logs 1, 2 and returns Iterable[2, 3]
```

### asyncTap

**asyncTap(callback, [source](#asyncwrappable))**  
**__asyncTap([source](#asynciterable), callback)**  

See [tap](#tap)

### window

**window(size, [source](#wrappable))**  
**__window([source](#iterable), size)**  

For values in `source`, yields a `window` iterable of size `size` which starts with that value and also contains the next values from `source`. The `window` instance is the same on every iteration. Only emits full windows, which means fewer windows will be emitted than there are values in `source`. If you need a window for every value in `source`, use [windowAhead](#windowAhead) or [windowBehind](#windowBehind).

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

**asyncWindow(size, [source](#asyncwrappable))**  
**__asyncWindow([source](#asynciterable), size)**  

See [window](#window)

### windowAhead

**windowAhead({ filler, useFiller }, size, [source](#wrappable))**  
**windowAhead(size, [source](#wrappable))**  
**__windowAhead([source](#iterable), size, ?{ filler, useFiller })**  

Defaults:

- `filler`: `undefined`
- `useFiller`: `true`

For every value in `source`, yields an iterable `window` of size `size` which starts with that value and also contains the next values from `source`. The `window` instance is the same on every iteration. When there are not enough additional values in `source` to fill the window, `filler` will be used in place of the missing values. Alternatively if `useFiller` is `false`, missing values will create windows smaller than `size`.

```js
windowAhead(3, [1, 2, 3, 4, 5]);
// Iterable[
//   Iterable[1, 2, 3],
//   Iterable[2, 3, 4]
//   Iterable[3, 4, 5]
//   Iterable[4, 5, undefined]
//   Iterable[5, undefined, undefined]
// ]

windowAhead(3, { filler: Infinity }, [1, 2, 3, 4, 5]);
// Iterable[
//   Iterable[1, 2, 3],
//   Iterable[2, 3, 4]
//   Iterable[3, 4, 5]
//   Iterable[4, 5, Infinity]
//   Iterable[5, Infinity, Infinity]
// ]

windowAhead(3, { useFiller: false }, [1, 2, 3, 4, 5]);
// Iterable[
//   Iterable[1, 2, 3],
//   Iterable[2, 3, 4]
//   Iterable[3, 4, 5]
//   Iterable[4, 5]
//   Iterable[5]
// ]
```

### asyncWindowAhead

**asyncWindowAhead({ filler, useFiller }, size, [source](#asyncwrappable))**  
**asyncWindowAhead(size, [source](#asyncwrappable))**  
**__asyncWindowAhead([source](#asynciterable), size, ?{ filler, useFiller })**  

See [windowAhead](#windowahead)

### windowBehind

**windowBehind({ filler }, size, [source](#wrappable))**  
**windowBehind(size, [source](#wrappable))**  
**__windowBehind([source](#iterable), size, ?{ filler })**  

Defaults:

- `filler`: `undefined`

For every value in `source`, yields a `window` iterable of size `size` which contains the values leading up to and including that value. The `window` instance is the same on every iteration. When there are not enough prior values to fill the window, `filler` will be used in place of the missing values.

```js
windowBehind(3, [1, 2, 3, 4, 5]);
// Iterable[
//   Iterable[undefined, undefined, 1],
//   Iterable[undefined, 1, 2]
//   Iterable[1, 2, 3]
//   Iterable[2, 3, 4]
//   Iterable[3, 4, 5]
// ]

windowBehind(3, { filler: 0 }, [1, 2, 3, 4, 5]);
// Iterable[
//   Iterable[0, 0, 1]
//   Iterable[0, 1, 2]
//   Iterable[1, 2, 3]
//   Iterable[2, 3, 4]
//   Iterable[3, 4, 5]
// ]
```

### asyncWindowBehind

**asyncWindowBehind({ filler }, size, [source](#asyncwrappable))**  
**asyncWindowBehind(size, [source](#asyncwrappable))**  
**__asyncWindowBehind([source](#asynciterable), size, ?{ filler })**  

See [windowBehind](#windowbehind)

### wrap

**wrap([source](#wrappable))**  

Yields the values from `source`. Its main purposes include allowing nullable iterables to be treated as non-null iterables, and to give arbitrary iterables the semantics of iter-tools iterables.

```js
const maybeIterable =
  Math.random() > 0.5 ? [1, 2, 3] : null;

[...wrap(maybeIterable)]; // [1, 2, 3] OR []
```

### asyncWrap

**asyncWrap([source](#asyncwrappable))**  

See [wrap](#wrap)

Also turns sync iterables into async iterables and ensures async `next()` queueing semantics.

```js
await asyncWrap([1, 2, 3])[Symbol.asyncIterator]().next(); // { value: 1, done: false }
```


## Separate an iterable into multiple iterables

### batch

**batch(size, [source](#wrappable))**  
**__batch([source](#iterable), size)**  

Yields non-overlapping subsequences each containing `size` values from `source`.

```js
batch(2, range(5)); // [0, 1], [2, 3], [4]
```

### asyncBatch

**asyncBatch(size, [source](#asyncwrappable))**  
**__asyncBatch([source](#asynciterable), size)**  

See [batch](#batch)

### bisect

**bisect(at, [source](#wrappable))**  
**__bisect([source](#iterable), at)**  

Yields two `part` subsequences of `source`. The split position is chosen with `at`. If `at` is a number, the first part will contain that number of values. If `at` is a negative number the second part will contain that number of values. If `at` is a function the split will be before the first `value` for which the result of `at(value, idx)` is truthy.

`bisect` is specially designed to work with destructuring, but this comes at a cost: for resources to be released properly you must use the second half of the split. If you only need the first half you must instead use [take](#take) or [takeWhile](#takewhile). For example instead of `const [seq] = bisect(cond, source)` you must write `const seq = takeWhile((v, i) => !cond(v, i), source)`.

```js
const source = [-2, -1, 0, 1, 2];
const [negatives, positives] = bisect(
  (i) => i >= 0,
  source,
);
negatives; // Iterable[-2, -1]
positives; // Iterable[0, 1, 2]

const [
  firstThree, // Iterable[0, 1, 2]
  others, // Iterable[3, 4, 5, 6, 7, 8, 9]
] = bisect(3, range(10));

const [, lastThree] = bisect(-3, range(10));
lastThree; // Iterable[7, 8, 9]
```

### asyncBisect

**asyncBisect(at, [source](#asyncwrappable))**  
**__asyncBisect([source](#asynciterable), at)**  

Synchronously yields two async `part` subsequences of `source`. This means that it is still possible to use the result with destructuring, e.g. `const [first, second] = asyncBisect(source)`. For more on how the split is performed (and how the result can be used) see [bisect](#bisect).

### split

**split([source](#wrappable))**  
**__split([source](#iterable))**  

Yields each value in `source` as an iterable of one value.

```js
split([1, 2, 3]); // Iterable[Iterable[1], Iterable[2], Iterable[3]]
```

### asyncSplit

**asyncSplit([source](#asyncwrappable))**  
**__asyncSplit([source](#asynciterable))**  

See [split](#split)

### splitGroups

**splitGroups(getKey, [source](#wrappable))**  
**splitGroups([source](#wrappable))**  
**__splitGroups([source](#iterable), ?getKey)**  

Defaults:

- `getKey`: `(value) => value`

Yields a [PartsIterable](#partsiterable) of [`key`, `group`] pairs from `source`, where `group` is a subsequence of `values` from `source` for which every `value` has the same `key` as returned by `getKey(value, idx)` (as compared with `===`).

```js
splitGroups(Math.abs, [1, 1, -1, -1, 4, -1]);
// Iterable [
//   [1, Iterable[1, 1, -1, -1]]
//   [4, Iterable[4]]
//   [1, Iterable[-1]]
// ]
```

### asyncSplitGroups

**asyncSplitGroups(getKey, [source](#asyncwrappable))**  
**asyncSplitGroups([source](#asyncwrappable))**  
**__asyncSplitGroups([source](#asynciterable), ?getKey)**  

See [splitGroups](#splitgroups)

### splitOn

**splitOn(same, separator, [source](#wrappable))**  
**splitOn(separator, [source](#wrappable))**  
**__splitOn([source](#iterable), separator, ?same)**  

Defaults:

- `same`: `Object.is`

Yields a [PartsIterable](#partsiterable) of parts from `source`, where `separatorValue` is used to mark the boundary between parts in `source`. `separatorValue` will not occur in the output. Two values are considered to be the same if the result of `same(a, b)` is truthy.

```js
splitOn(null, [1, null, 2, null, 3]); // Iterable[[1], [2], [3]]
```

Note: If `source` is a string you should instead use [splitOnSeq](#splitonseq). A warning will be emitted if you do not.

### asyncSplitOn

**asyncSplitOn(same, separator, [source](#asyncwrappable))**  
**asyncSplitOn(separator, [source](#asyncwrappable))**  
**__asyncSplitOn([source](#asynciterable), separator, ?same)**  

See [splitOn](#spliton)

### splitOnAny

**splitOnAny(same, separators, [source](#wrappable))**  
**splitOnAny(separators, [source](#wrappable))**  
**__splitOnAny([source](#iterable), separators, ?same)**  

Defaults:

- `same`: `Object.is`

Yields a [PartsIterable](#partsiterable) of parts from `source`, where `separatorValues` are used to mark the boundary between parts in `source`. None of the `separatorValues` will not occur in the output. Two values are considered to be the same if the result of `same(a, b)` is truthy.

```js
splitOnAny([null, undefined], [1, null, 2, undefined, 3]); // Iterable[[1], [2], [3]]
```

Note: If `source` is a string you should instead use [splitOnAnySeq](#splitonanyseq). A warning will be emitted if you do not.

### asyncSplitOnAny

**asyncSplitOnAny(same, separators, [source](#asyncwrappable))**  
**asyncSplitOnAny(separators, [source](#asyncwrappable))**  
**__asyncSplitOnAny([source](#asynciterable), separators, ?same)**  

See [splitOnAny](#splitonany)

### splitOnAnySeq

**splitOnAnySeq(same, separatorSeqs, [source](#wrappable))**  
**splitOnAnySeq(separatorSeqs, [source](#wrappable))**  
**__splitOnAnySeq([source](#iterable), separatorSeqs, ?same)**  

Defaults:

- `same`: `Object.is`

Yields a [PartsIterable](#partsiterable) of parts from `source`, where `separatorSeqs` are used to mark the boundary between parts in `source`. When any `separatorSeq` in `separatorSeqs` is matched, all matched values are consumed from `source` and will not appear in any `part`, nor may they be part of any other `separatorSeq` match. Matches greedily, which is to say the longest possible separator match will be prioritized. Two values are considered to be the same if the result of `same(a, b)` is truthy.

```js
splitOnAnySeq(
  [['\n'], ['\r\n']],
  'mixed\r\nline\nterminators',
); // Iterable['mixed', 'line', 'terminators']
```

### asyncSplitOnAnySeq

**asyncSplitOnAnySeq(same, separatorSeqs, [source](#asyncwrappable))**  
**asyncSplitOnAnySeq(separatorSeqs, [source](#asyncwrappable))**  
**__asyncSplitOnAnySeq([source](#asynciterable), separatorSeqs, ?same)**  

See [splitOnAnySeq](#splitonanyseq)

### splitOnSeq

**splitOnSeq(same, separatorSeq, [source](#wrappable))**  
**splitOnSeq(separatorSeq, [source](#wrappable))**  
**__splitOnSeq([source](#iterable), separatorSeq, ?same)**  

Defaults:

- `same`: `Object.is`

Yields a [PartsIterable](#partsiterable) of parts from `source`, where `separatorSeq` is used to mark the boundary between parts in `source`. When `separatorSeq` is matched, all matched values are consumed from `source`. They will not appear in any `part`, nor may they be part of any other `separatorSeq` match. Two values are considered to be the same if the result of `same(a, b)` is truthy.

```js
splitOnSeq([0, 0], [1, 0, 0, 2, 0, 0, 3]); // Iterable[[1], [2], [3]]

//`separatorSeq` is in the result because separators overlap in `source`.
splitOnSeq([0, 0], [0, 0, 0, 1, 2]); // Iterable[[], [0, 1, 2]]
```

### asyncSplitOnSeq

**asyncSplitOnSeq(same, separatorSeq, [source](#asyncwrappable))**  
**asyncSplitOnSeq(separatorSeq, [source](#asyncwrappable))**  
**__asyncSplitOnSeq([source](#asynciterable), separatorSeq, ?same)**  

See [splitOnSeq](#splitonseq)

### splitWhen

**splitWhen(predicate, [source](#wrappable))**  
**__splitWhen([source](#iterable), predicate)**  

Yields a [PartsIterable](#partsiterable) of parts from `source`, a `value` from `source` for which the result of `predicate(value, idx)` is truthy is considered a separator, and will not occur in the output.

<!-- prettier-ignore -->
```js
splitWhen(
  x => x == null,
  [1, null, 2, undefined, 3]
); // Iterable[Iterable[1], Iterable[2], Iterable[3]]
splitWhen(',', 'foo,bar,baz'); // Iterable['foo', 'bar', 'baz']
splitWhen(/, /, 'foo, bar, baz'); // Iterable['foo', 'bar', 'baz']
```

### asyncSplitWhen

**asyncSplitWhen(predicate, [source](#asyncwrappable))**  
**__asyncSplitWhen([source](#asynciterable), predicate)**  

See [splitWhen](#splitwhen)


## Combine multiple iterables

### collate

**collate([compare](#compare), ...[sources](#wrappable))**  
**__collate([sources](#iterable), [compare](#compare))**  

Combines values from each `source` in `sources` into a single iterable, peserving the ordering of values within each `source`. Collate uses `comparator` to establish a partial ordering of values at the head of each `source`. At each step it yields the lowest value in the ordering then recomputes the ordering.

```js
collate((a, b) => a - b, [1, 2, 5, 6], [3, 4]); // Iterable[1, 2, 3, 4, 5, 6]
collate((a, b) => b - a, [6, 5, 2, 1], [4, 3]); // Iterable[6, 5, 4, 3, 2, 1]
```

### asyncCollate

**asyncCollate([compare](#compare), ...[sources](#asyncwrappable))**  
**__asyncCollate([sources](#asynciterable), [compare](#compare))**  

See [collate](#collate)

### compress

**compress([source](#wrappable), [included](#wrappable))**  
**__compress(source, included)**  

Consumes values from `source` and `included` iterables in parallel, at each step yielding the `source` value if the `included` value is truthy.

```js
compress([0, 1, 2, 3, 4], [0, 0, 1, 1]); // 2, 3
compress([0, 1, 2, 3, 4], cycle([true, false])); // 0, 2, 4
```

### asyncCompress

**asyncCompress([source](#asyncwrappable), [included](#asyncwrappable))**  
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

**asyncInterleaveReady(...[sources](#asyncwrappable))**  
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

**joinWith(separator, [source](#wrappable))**  
**__joinWith([source](#iterable), separator)**  

Given `source`, an iterable of iterables, yields all values from each iterable with `separator` in between. It is the inverse of `splitOn`.

```js
joinWith(null, [[1], [2], [3]]); // Iterable[1, null, 2, null, 3]
```

### asyncJoinWith

**asyncJoinWith(separator, [source](#asyncwrappable))**  
**__asyncJoinWith([source](#asynciterable), separator)**  

See [joinWith](#joinwith)

### joinWithSeq

**joinWithSeq(separatorSeq, [source](#wrappable))**  
**__joinWithSeq([source](#iterable), separatorSeq)**  

Given `source`, an iterable of iterables, yields all values from each iterable with the `separatorSeq` values in between. It is the inverse of `splitOnSeq`.

```js
joinWithSeq([null, null], [[1], [2], [3]]); // Iterable[1, null, null, 2, null, null, 3]
```

### asyncJoinWithSeq

**asyncJoinWithSeq(separatorSeq, [source](#asyncwrappable))**  
**__asyncJoinWithSeq([source](#asynciterable), separatorSeq)**  

See [joinWithSeq](#joinwithseq)

### roundRobin

**roundRobin(start, step, ...[sources](#wrappable))**  
**roundRobin(step, ...[sources](#wrappable))**  
**roundRobin(...[sources](#wrappable))**  
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

**asyncRoundRobin(start, step, ...[sources](#asyncwrappable))**  
**asyncRoundRobin(step, ...[sources](#asyncwrappable))**  
**asyncRoundRobin(...[sources](#asyncwrappable))**  
**__asyncRoundRobin([sources](#asynciterable), ?step, ?start)**  

See [roundRobin](#roundrobin)

### zip

**zip(...[sources](#wrappable))**  
**__zip([sources](#iterable))**  

Consumes each `source` in `sources` in parallel, at each step yielding an array with one value from every `source`. Stops when the shortest source iterable is exausted.

```js
zip([1, 2], [3, 4], [5, 6, 7]); // [1, 3, 5], [2, 4, 6]
```

### asyncZip

**asyncZip(...[sources](#asyncwrappable))**  
**__asyncZip([sources](#asynciterable))**  

See [zip](#zip)

### zipAll

**zipAll({ filler }, ...[sources](#wrappable))**  
**zipAll(...[sources](#wrappable))**  
**__zipAll([sources](#iterable), ?{ filler })**  

Defaults:

- `filler`: `undefined`

Consumes each `source` in `sources` in parallel, at each step yielding an array with one value from every `source`. Stops when the shortest source iterable is exausted. Where some `sources` are exhausted before all `sources` are exchausted, `filler` will be used in place of the missing values.

```js
zipAll([1, 2], [3, 4], [5, 6, 7]); // [1, 3, 5], [2, 4, 6], [undefined, undefined, 7]
zipAll({ filler: null }, [1, 2], []); // [1, null], [2, null]
```

### asyncZipAll

**asyncZipAll({ filler }, ...[sources](#asyncwrappable))**  
**asyncZipAll(...[sources](#asyncwrappable))**  
**__asyncZipAll([sources](#asynciterable), ?{ filler })**  

See [zipAll](#zipall)


## Reduce an iterable to a single value

### deepEqual

**deepEqual(...values)**  
**__deepEqual(values, ?same, ?coerceNil)**  

Defaults:

- `same`: `Object.is`
- `coerceNil`: `true`

Returns `true` if all `values` are deepEqual to each other and `false` otherwise. Values are considered equal if they are iterables containing the same values, or if the result of `same(a, b, depth)` is truthy. `depth` represents the number of iterables wrapping the value. If `coerceNil` is `true` then `null` and `undefined` are considered to be iterables.

Notes:

- `deepEqual` does not consider strings to be iterables. That would cause infinite recursion.
- `deepEqual` does not recurse into objects, only iterables.

```js
deepEqual([1, 2, 3], [1, 2, 3], [1, 2, 3]); // true
deepEqual([[1, 2, 3]], [[1, 2, 3]], [[1, 2, 3]]); // true
deepEqual(1, 1, 1); // true
deepEqual(null, [], ''); // true

deepEqual([1, 2, 3], [3, 2, 1]); // false
```

Note that in order to avoid ambiguity `same` can only be passed to `__deepEqual`. If you need it just write this:

```js
function same(a, b) {
  return a.toUpperCase() === b.toUpperCase();
}

function myEqual(...values) {
  return __deepEqual(values, same, false);
}

myEqual('foo', 'FOO'); // true
myEqual(['foo'], [(foo: 'FOO')]); // true
myEqual({ foo: 'foo' }, { foo: 'foo' }); // false
myEqual(null, ''); // false
```

### asyncDeepEqual

**asyncDeepEqual(...values)**  
**__asyncDeepEqual(values, ?same, ?coerceNil)**  

See [deepEqual](#deepequal)

### equal

**equal(same, ...[iterables](#wrappable))**  
**equal(...[iterables](#wrappable))**  
**__equal([iterables](#iterable), ?same)**  

Defaults:

- `same`: `Object.is`

Returns `true` if all `iterables` consist of the same sequence of values. Otherwise returns `false`. Two values are considered to be the same if the result of `same(a, b)` is truthy.

```js
equal([1, 2, 3], [1, 2, 3], [1, 2, 3]); // true
```

Note: If `source` is a string you should instead use [startsWithSeq](#startswithseq). A warning will be emitted if you do not.

### asyncEqual

**asyncEqual(same, ...[iterables](#asyncwrappable))**  
**asyncEqual(...[iterables](#asyncwrappable))**  
**__asyncEqual([iterables](#asynciterable), ?same)**  

See [equal](#equal)

### every

**every(predicate, [iterable](#wrappable))**  
**__every([iterable](#iterable), predicate)**  

Returns `true` if, for every value in `source`, the result of `predicate(value, idx)` is truthy. Otherwise returns `false`.

```js
every(isEven, [1, 2, 3]); // returns false
every(isEven, [2, 4, 6]); // returns true
```

### asyncEvery

**asyncEvery(predicate, [iterable](#asyncwrappable))**  
**__asyncEvery([iterable](#asynciterable), predicate)**  

See [every](#every)

### find

**find(predicate, [iterable](#wrappable))**  
**__find([iterable](#iterable), predicate)**  

Returns the first value in `iterable` for which `predicate(value, idx)` returns a truthy value. It is the equivalent of `Array.prototype.find`.

```js
find((animal) => animal.kind === 'dog', [
  { type: 'cat' },
  { type: 'dog' },
]); // {type: 'dog'}
```

### asyncFind

**asyncFind(predicate, [iterable](#asyncwrappable))**  
**__asyncFind([iterable](#asynciterable), predicate)**  

See [find](#find)

### findOr

**findOr(notFoundValue, func, [iterable](#wrappable))**  
**__findOr([iterable](#iterable), notFoundValue, func)**  

Returns the first value in `iterable` for which `predicate(value, idx)` returns a truthy value, or `notFoundValue` if no value satisfied the predicate.

```js
findOr(0, (x) => x > 10, [1, 2, 3]); // 0
```

### asyncFindOr

**asyncFindOr(notFoundValue, func, [iterable](#asyncwrappable))**  
**__asyncFindOr([iterable](#asynciterable), notFoundValue, func)**  

See [findOr](#findor)

### first

**first([iterable](#wrappable))**  
**__first([iterable](#iterable))**  

Returns the first value from `iterable`, or `undefined` when `iterable` is empty.

```js
first([1, 2, 3]); // 1
first([]); // undefined
```

### asyncFirst

**asyncFirst([iterable](#asyncwrappable))**  
**__asyncFirst([iterable](#asynciterable))**  

See [first](#first)

### firstOr

**firstOr(whenEmpty, [iterable](#wrappable))**  
**__firstOr([iterable](#iterable), whenEmpty)**  

Returns the first value from `iterable`, or `whenEmpty` when `iterable` is empty.

```js
firstOr(0, [1, 2, 3]); // 1
firstOr(0, []); // 0
```

### asyncFirstOr

**asyncFirstOr(whenEmpty, [iterable](#asyncwrappable))**  
**__asyncFirstOr([iterable](#asynciterable), whenEmpty)**  

See [firstOr](#firstor)

### includes

**includes(same, value, [iterable](#wrappable))**  
**includes(value, [iterable](#wrappable))**  
**__includes([iterable](#iterable), value, ?same)**  

Defaults:

- `same`: `Object.is`

Returns `true` if `iterable` includes the specified `value`, or `false` otherwise. Two values are considered to be the same if the result of `same(a, b)` is truthy.

```js
includes(2, [1, 2, 3]); // true
includes(0, [1, 2, 3]); // false
```

Note: If `source` is a string you should instead use [includesSeq](#includesseq). A warning will be emitted if you do not.

### asyncIncludes

**asyncIncludes(same, value, [iterable](#asyncwrappable))**  
**asyncIncludes(value, [iterable](#asyncwrappable))**  
**__asyncIncludes([iterable](#asynciterable), value, ?same)**  

See [includes](#includes)

### includesAny

**includesAny(same, values, [iterable](#wrappable))**  
**includesAny(values, [iterable](#wrappable))**  
**__includesAny([iterable](#iterable), values, ?same)**  

Defaults:

- `same`: `Object.is`

Returns `true` if `iterable` includes any of the specified `values`, or `false` otherwise. Two values are considered to be the same if the result of `same(a, b)` is truthy.

```js
includesAny([0, 1], [1, 2, 3]); // true
includesAny([0, 1], [2, 3, 4]); // false
```

Note: If `source` is a string you should instead use [includesAnySeq](#includesanyseq). A warning will be emitted if you do not.

### asyncIncludesAny

**asyncIncludesAny(same, values, [iterable](#asyncwrappable))**  
**asyncIncludesAny(values, [iterable](#asyncwrappable))**  
**__asyncIncludesAny([iterable](#asynciterable), values, ?same)**  

See [includesAny](#includesany)

### includesAnySeq

**includesAnySeq(same, seqs, [iterable](#wrappable))**  
**includesAnySeq(seqs, [iterable](#wrappable))**  
**__includesAnySeq([iterable](#iterable), seqs, ?same)**  

Defaults:

- `same`: `Object.is`

Returns `true` if any of the the `seqs` (subsequences) of values can be found somewhere in `iterable`, or `false` otherwise. Two values are considered to be the same if the result of `same(a, b)` is truthy.

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

**asyncIncludesAnySeq(same, seqs, [iterable](#asyncwrappable))**  
**asyncIncludesAnySeq(seqs, [iterable](#asyncwrappable))**  
**__asyncIncludesAnySeq([iterable](#asynciterable), seqs, ?same)**  

See [includesAnySeq](#includesanyseq)

### includesSeq

**includesSeq(same, seq, [iterable](#wrappable))**  
**includesSeq(seq, [iterable](#wrappable))**  
**__includesSeq([iterable](#iterable), seq, ?same)**  

Defaults:

- `same`: `Object.is`

Returns `true` if the `seq` (subsequence) of values can be found somewhere in `iterable`, or `false` otherwise. Two values are considered to be the same if the result of `same(a, b)` is truthy.

```js
includesSeq([1, 2], [1, 2, 3]); // true
includesSeq([1, 2, 3], [1, 2, 3]); // true
includesSeq([2, 3, 4], [1, 2, 3]); // false
```

### asyncIncludesSeq

**asyncIncludesSeq(same, seq, [iterable](#asyncwrappable))**  
**asyncIncludesSeq(seq, [iterable](#asyncwrappable))**  
**__asyncIncludesSeq([iterable](#asynciterable), seq, ?same)**  

See [includesSeq](#includesseq)

### isEmpty

**isEmpty([iterable](#wrappable))**  
**__isEmpty([iterable](#iterable))**  

Returns `true` if `iterable` contains no values, and `false` otherwise.

```js
isEmpty([]); // true
isEmpty(null); // true
isEmpty(range(1)); // false
isEmpty([undefined]); // false
```

### asyncIsEmpty

**asyncIsEmpty([iterable](#asyncwrappable))**  
**__asyncIsEmpty([iterable](#asynciterable))**  

See [isEmpty](#isempty)

### isSorted

**isSorted([compare](#compare), [iterable](#wrappable))**  
**isSorted([iterable](#wrappable))**  
**__isSorted([iterable](#iterable), ?[compare](#compare))**  

Returns `true` if the values in `iterable` are sorted in ascending order according to `comparator`, and `false` otherwise.

```js
isSorted([1, 2, 3]); // true
isSorted((a, b) => b - a, [3, 2, 1]); // true
```

### asyncIsSorted

**asyncIsSorted([compare](#compare), [iterable](#asyncwrappable))**  
**asyncIsSorted([iterable](#asyncwrappable))**  
**__asyncIsSorted([iterable](#asynciterable), ?[compare](#compare))**  

See [isSorted](#issorted)

### reduce

**reduce(initial, reducer, [iterable](#wrappable))**  
**reduce(reducer, [iterable](#wrappable))**  
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

**asyncReduce(initial, reducer, [iterable](#asyncwrappable))**  
**asyncReduce(reducer, [iterable](#asyncwrappable))**  
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

**some(func, [iterable](#wrappable))**  
**__some([iterable](#iterable), func)**  

Returns `true` if the result of `predicate(value, idx)` is truthy for at least one value in `iterable`, and `false` otherwise.

```js
some(isEven, [1, 2, 3]); // true
some(isEven, [1, 3, 7]); // false
```

### asyncSome

**asyncSome(func, [iterable](#asyncwrappable))**  
**__asyncSome([iterable](#asynciterable), func)**  

See [some](#some)

### startsWith

**startsWith(same, value, [iterable](#wrappable))**  
**startsWith(value, [iterable](#wrappable))**  
**__startsWith([iterable](#iterable), value, ?same)**  

Defaults:

- `same`: `Object.is`

Returns `true` if the first value in `source` is `value`. Otherwise returns `false`. Two values are considered to be the same if the result of `same(a, b)` is truthy.

```js
startsWith(1, [1, 2, 3]); // true
```

Note: If `source` is a string you should instead use [startsWithSeq](#startswithseq). A warning will be emitted if you do not.

### asyncStartsWith

**asyncStartsWith(same, value, [iterable](#asyncwrappable))**  
**asyncStartsWith(value, [iterable](#asyncwrappable))**  
**__asyncStartsWith([iterable](#asynciterable), value, ?same)**  

See [startsWith](#startswith)

### startsWithAny

**startsWithAny(same, values, [iterable](#wrappable))**  
**startsWithAny(values, [iterable](#wrappable))**  
**__startsWithAny([iterable](#iterable), values, ?same)**  

Defaults:

- `same`: `Object.is`

Returns `true` if the first value in `source` is any `value` in `values`. Otherwise returns `false`. Two values are considered to be the same if the result of `same(a, b)` is truthy.

```js
startsWithAny([0, 1], [1, 2, 3]); // true
```

Note: If `source` is a string you should instead use [startsWithAnySeq](#startswithanyseq). A warning will be emitted if you do not.

### asyncStartsWithAny

**asyncStartsWithAny(same, values, [iterable](#asyncwrappable))**  
**asyncStartsWithAny(values, [iterable](#asyncwrappable))**  
**__asyncStartsWithAny([iterable](#asynciterable), values, ?same)**  

See [startsWithAny](#startswithany)

### startsWithAnySeq

**startsWithAnySeq(same, seqs, [iterable](#wrappable))**  
**startsWithAnySeq(seqs, [iterable](#wrappable))**  
**__startsWithAnySeq([iterable](#iterable), seqs, ?same)**  

Defaults:

- `same`: `Object.is`

Returns `true` if the first subsequence of values in `source` match any `valueSeq` in `valueSeqs`. Otherwise returns `false`. Two values are considered to be the same if the result of `same(a, b)` is truthy.

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

**asyncStartsWithAnySeq(same, seqs, [iterable](#asyncwrappable))**  
**asyncStartsWithAnySeq(seqs, [iterable](#asyncwrappable))**  
**__asyncStartsWithAnySeq([iterable](#asynciterable), seqs, ?same)**  

See [startsWithAnySeq](#startswithanyseq)

### startsWithSeq

**startsWithSeq(same, seq, [iterable](#wrappable))**  
**startsWithSeq(seq, [iterable](#wrappable))**  
**__startsWithSeq([iterable](#iterable), seq, ?same)**  

Defaults:

- `same`: `Object.is`

Returns `true` if the first subsequence of values in `source` matches `valueSeq`. Otherwise returns `false`. Two values are considered to be the same if the result of `same(a, b)` is truthy.

```js
startsWithSeq([1, 2], [1, 2, 3]); // true
```

### asyncStartsWithSeq

**asyncStartsWithSeq(same, seq, [iterable](#asyncwrappable))**  
**asyncStartsWithSeq(seq, [iterable](#asyncwrappable))**  
**__asyncStartsWithSeq([iterable](#asynciterable), seq, ?same)**  

See [startsWithSeq](#startswithseq)

### str

**str([chars](#wrappable))**  
**__str([chars](#iterable))**  

See [stingFrom](#stringfrom)

### asyncStr

**asyncStr([chars](#asyncwrappable))**  
**__asyncStr([chars](#asynciterable))**  

See [stringFromAsync](#stringfromasync)

### takeLast

**takeLast([iterable](#wrappable))**  
**__takeLast([iterable](#iterable))**  

Returns the last value from `iterable`, or `undefined` when `iterable` is empty.

Performance note: this requires consuming the entire iterable. If `iterable` is an array this method will do a lot of unnecessary work compared to `arrayLast(array)`.

```js
takeLast([1, 2, 3]); // 3
takeLast([]); // undefined
```

### asyncTakeLast

**asyncTakeLast([iterable](#asyncwrappable))**  
**__asyncTakeLast([iterable](#asynciterable))**  

See [takeLast](#takelast)

### takeLastOr

**takeLastOr(whenEmpty, [iterable](#wrappable))**  
**__takeLastOr([iterable](#iterable), whenEmpty)**  

Returns the last value from `iterable`, or `whenEmpty` when `iterable` is empty.

Performance note: this requires consuming the entire iterable. If `iterable` is an array this method will do a lot of unnecessary work compared to `arrayLastOr(array, whenEmpty)`.

```js
takeLastOr(0, [1, 2, 3]); // 3
takeLastOr(0, []); // 0
```

### asyncTakeLastOr

**asyncTakeLastOr(whenEmpty, [iterable](#asyncwrappable))**  
**__asyncTakeLastOr([iterable](#asynciterable), whenEmpty)**  

See [takeLastOr](#takelastor)


## Control timing inside an async iterable

### asyncBuffer

**asyncBuffer(source, n)**  
**__asyncBuffer(source, n)**  

Returns a [singleton async iterable iterator](#singletonasynciterableiterator) which yields the same values as `source`. For every value the next `n` values also start their computation in parallel. It may or may not be possible for useful work to be done in parallel depending on the nature of `source`.

An example of a situation in which it is possible to parallelize is when you have a series of expensive requests to make and you know in advance what they will be:

```js
pipe(
  range,
  asyncMap(i => fetch(`/page/${i}`).then(res => res.json()),
  asyncSlice(0, 50),
  asyncBuffer(4),
  toArray
);
```

The above code could fetch four pages at once, potentially greatly speeding up the process when compared code that did not use `asyncBuffer`.

It is important to note that the method will always try to buffer past the end of your iterable. This is a design limitation of async iterators. This is usually fine, but makes it unwise to specify extremely high values for `n`. `asyncBuffer(Infinity, source)` for example would simply be an infinite loop. For this reason all values of `n >= 1024` are forbidden. This is expected to be a very permissive limit. In practice `n` should probably be in the range of `2` to `16`. You must recall that Javascript is fundamentally single threaded, so having more CPU cores will not help you execute such "parallelized" code any faster.

Here is a fuller example demonstrating the mechanics of `asyncBuffer`:

```js
const delay = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const source = asyncMap(
  (_) => new Promise((resolve) => setTimeout(resolve, 200)),
  range(),
);

const buffered = asyncBuffer(6, source); // Values start buffering

await delay(800));

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
await delay(300);

await buffered.next(); // ~0ms
await buffered.next(); // ~100ms
await buffered.next(); // ~200ms
// ...
```

### asyncThrottle

**asyncThrottle(intervalMs, [source](#asyncwrappable))**  
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

**fork([source](#wrappable))**  
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

**asyncFork([source](#asyncwrappable))**  
**__asyncFork([source](#asynciterable))**  

See [fork](#fork)

Note: Returns an iterable (sync) of async iterables.


## Consume an iterable

### arrayFrom

**arrayFrom([strings](#wrappable))**  

Aliases: `toArray`

Transform `source` into an array. Roughly equivalent to `Array.from`, except that it turns `null` and `undefined` into `[]`. Since arrays are iterable, this method can also be thought of as a way to cache all values in an iterable.

```js
arrayFrom(slice(0, 3, range())); // [1, 2, 3]
arrayFrom(null); // []
```

### arrayFromAsync

**arrayFromAsync([source](#asyncwrappable))**  

Aliases: `asyncToArray`

Transform an async `source` into an array. Since arrays are valid inputs to async methods, can also be thought of as a way to cache all values in an async iterable.

```js
await arrayFromAsync(asyncWrap(slice(0, 3, range()))); // [1, 2, 3]
await arrayFromAsync(null); // []
```

### consume

**consume([iterable](#wrappable))**  
**__consume([iterable](#iterable))**  

Consumes `iterable`.

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

**asyncConsume([iterable](#asyncwrappable))**  
**__asyncConsume([iterable](#asynciterable))**  

See [consume](#consume)

### forEach

**forEach(callback, [iterable](#wrappable))**  
**__forEach([iterable](#iterable), callback)**  

Calls `callback(value, idx)` for each value in `iterable`. Note that as a consuming method, `forEach` is not lazy. It will trigger evaluation of `iterable`.

```js
forEach((value) => console.log(value), [1, 2, 3]); // prints 1, 2, 3
forEach((value) => console.log(value), null); //
```

### asyncForEach

**asyncForEach(callback, [iterable](#asyncwrappable))**  
**__asyncForEach([iterable](#asynciterable), callback)**  

See [forEach](#foreach)

### objectFrom

**objectFrom([entries](#wrappable), ?prototype)**  

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

**objectFromAsync([entries](#asyncwrappable), ?prototype)**  

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

**stringFrom([source](#wrappable))**  

Aliases: `str`

Concatenate `chars` into a string.

```js
stringFrom(['a', 'b', 'c', 'def']); // 'abcdef'
stringFrom(null); // ''
```

### stringFromAsync

**stringFromAsync([strings](#wrappable))**  

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

**toObject(iterable, ?proto)**  
**__toObject(iterable, ?proto)**  

See [objectFrom](#objectfrom)

### asyncToObject

**asyncToObject(iterable, ?proto)**  
**__asyncToObject(iterable, ?proto)**  

See [objectFromAsync](#objectfromasync)


## Predicates (test a value)

### isArray

**isArray(value)**  

Returns `Array.isArray(value)`. Type-safe in typescript.

```js
isArray(['foo']); // true
isArray([]); // true
isArray(4); // false
isArray(undefined); // false
```

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

Returns `true` if `value` [isAsyncIterable](#isasynciterable), [isIterable](#isiterable), or [isNil](#isnil) (and `false` otherwise). When `isAsyncWrappable(value)`, it is safe to pass value to [asyncWrap](#asyncwrap) as well as other methods that take an [AsyncWrappable](#asyncWrappable), which is usually named `iterable` or `source`. Type-safe in typescript.

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

### isObject

**isObject(value)**  

Returns `typeof value === 'object' && value !== null`. Note that iterables are objects, so it is expected that the most common way to use this method will to to first eliminate the possibility that `value` is an iterable (e.g. using [notIterable](#notiterable)). Type-safe in typescript.

Note: lodash has a popular method of the same name, which treats functions as objects as well. This method is what lodash calls `isObjectLike`.

```js
isObject({}); // true
isObject([]); // true
isObject(new Date()); // true
isObject(new (class Foo {})()); // true
isObject(null); // false
isObject(undefined); // false
isObject(Date); // false (function)
isObject(class Foo {}); // false (function)
```

### isString

**isString(value)**  

Returns `true` if `typeof value` is `'string'` and `false` otherwise. Type-safe in typescript.

```js
isString('foo'); // true
isString(''); // true
isString(4); // false
isString(undefined); // false
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

Returns `true` if `value` [isIterable](#isiterable) or `value` [isNil](#isnil) (and `false` otherwise). When `isWrappable(value)`, it is safe to pass value to [wrap](#wrap) (and any other method which exepects a [Wrappable](#Wrappable)). Type-safe in typescript.

```js
isWrappable([]); // true
isWrappable(undefined); // true
isWrappable(null); // true
isWrappable({}); // false
```

### notArray

**notArray(value)**  

Returns `!Array.isArray(value)`. Type-safe in typescript.

```js
notArray(4); // true
notArray(undefined); // true
notArray(['foo']); // false
notArray([]); // false
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

Returns `true` if `value` is [notIterable](#notiterable) and [notAsyncIterable](#notasynciterable), otherwise `false`. When `notAsyncLoopable(value)`, using value as the subject of a `for await..of` loop will throw an error.

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

Returns `true` if `value` [notAsyncIterable](#notasynciterable), [notIterable](#notiterable), and [notNil](#notnil) (and `false` otherwise). When `notAsyncWrappable(value)`, passing `value` to [asyncWrap](#asyncwrap) (or any other method which expects a [AsyncWrappable](#asyncWrappable)) will throw an error.

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

Returns `false` if `value` has a `Symbol.iterator` property and `true` otherwise. For more details see the method's inverse: [isIterable](#isiterable). Type-safe in typescript.

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

Returns `true` if `value` is not `null` or `undefined` and `false` otherwise. Type-safe in typescript.

```js
notNil(0); // true
notNil(undefined); // false
notNil(null); // false
```

### notNull

**notNull(value)**  

Returns `true` if `value` is not `null` and `false` otherwise. Type-safe in typescript.

```js
notNull(undefined); // true
notNull(null); // false
```

### notObject

**notObject(value)**  

Returns `true` if `value` is not an object, and `false` otherwise. For details see the method's inverse: [isObject](#isobject). Type-safe in typescript.

```js
notObject({}); // false
notObject([]); // false
notObject(new Date()); // false
notObject(new (class Foo {})()); // false
notObject(null); // true
notObject(undefined); // true
notObject(Date); // true
notObject(class Foo {}); // true
```

### notString

**notString(value)**  

Returns `true` if `typeof value` is not `'string'` and `false` otherwise. Type-safe in typescript.

```js
notString(4); // true
notString(undefined); // true
notString('foo'); // false
notString(''); // false
```

### notUndefined

**notUndefined(value)**  

Returns `true` if `value` is not `undefined` and `false` otherwise. Implemented using `typeof`. Type-safe in typescript.

```js
notUndefined(null); // true
notUndefined(undefined); // false
```

### notWrappable

**notWrappable(value)**  

Returns `true` if `value` is [notIterable](#notiterable) and [notNil](#notnil), otherwise `false`. When `notWrappable(value)`, passing `value` to [wrap](#wrap) (or any other method which expects a [Wrappable](#Wrappable)) will throw an error.

```js
notWrappable([]); // false
notWrappable(undefined); // false
notWrappable(null); // false
notWrappable({}); // true
notWrappable(4); // true
```


## Utilities

### apply

**apply(fn, ?args)**  
**__apply(fn, ?args)**  

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

Allows nested calls to be flattened out for improved readability. `compose(a, b, c)(x)` is equivalent to `a(b(c(x)))`, where `a`, `b`, and `c`, are functions. `compose` is usually combined with curryied forms of other methods so that the `source` (or `iterable`) argument is passed between the composed methods.

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

Allows nested calls to be flattened out for improved readability. `pipe(a, b, c)(x)` is equivalent to `c(b(a(x)))`, where `a`, `b`, and `c`, are functions. `pipe` is usually combined with curryied forms of other methods so that the `source` (or `iterable`) argument is passed between the composed methods.

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

`when` is a helper for use with the es6 spread syntax (the `...` operator). When `condition` is truthy its result is `value` (`value()` if `value` is callable). When condition is falsy its result is an empty iterable object. This is useful to avoid an unnecessarily difficult to read pattern that often causes code formatters (prettier, specifically) to emit an undesireable number of lines:

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

If `value` is a function it will only be evaluated when `expression` is true, simulating the short-circuit behavior of ternary expressions. This can help you avoid doing unnecessary expensive work:

```js
const whenArr = [
  always,
  ...when(sometimes, () => expensiveExpression),
]; // [] OR [...expensiveExpression]
```


## Generator helpers

### forkerate

**forkerate(source)**  
**__forkerate(source)**  

Turns `source` into a forkerator (often shortened to `forkr`). At each step the user may call `forkr.fork()` to create a new iterable which yields values from `source` starting with `forkr.value`. Consumed values are cached efficiently until every active fork has read them.

```ts
interface Forkerator<T> extends Peekerator<T> {
  /**
   * Calls `next()` `n` times on the underlying iterator and stores the value in `current`.
   * Returns `this` for chaining.
   */
  advance(n: number): this;

  /**
   * The forked iterator yields values starting from the current position.
   */
  fork(): SingletonIterableIterator;

  /**
   * Makes it possible to use forkr as an iterable
   * The iterator returned is equivalent to calling forkr.fork()
   */
  [Symbol.iterator](): SingletonIterableIterator;
}
```

`forkerate()` is expected to be particularly useful for writing streaming parsers.

```js
import { forkerate, startsWithSeq } from '@iter-tools';

export function* stripComments(source) {
  const forkr = forkerate(source);

  while (true) {
    const isComment = startsWithSeq('//', forkr);

    while (forkr.value !== '\n') {
      if (!isComment) yield forkr.value;
      forkr.advance();

      if (forkr.done) return;
    }

    if (!isComment) yield '\n';
    forkr.advance();
  }
}

str(stripComments('// comment\ncode')); // 'code'
```

### asyncForkerate

**asyncForkerate(source)**  
**__asyncForkerate(source)**  

See [forkerate](#forkerate)

### interleave

**interleave(strategy, options, ...[sources](#wrappable))**  
**interleave(strategy, ...[sources](#wrappable))**  
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

```ts
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

**asyncInterleave(strategy, options, ...[sources](#asyncwrappable))**  
**asyncInterleave(strategy, ...[sources](#asyncwrappable))**  
**__asyncInterleave([sources](#asynciterable), strategy, ?options)**  

See [interleave](#interleave)

### peekerate

**peekerate(source)**  
**__peekerate(source)**  

Turns `source` into a peekerator (often shortened to `peekr`), which is conceptually equivalent to an iterator but is often easier to work with. Peekerators always have a `current` step (of the shape `{ done, value }`) from the source iterator stored as `peekr.current`. This stateful API is useful since it allows you to see the current step without consuming it. This way you can choose to do nothing so that another part of your code will have the chance to act on the value instead. This is highly value in a number of common scenarios. A simple and common one is reacting when an iterable is empty:

```js
function printValues(values) {
  const peekr = peekerate(values);

  return peekr.done
    ? 'none'
    : stringFrom(interposeSeq(', ', peekr.asIterator()));
}

printValues([]); // 'none'
printValues([1, 2, 3]); // '1, 2, 3'
```

Here is the full interface that the `peekr` object conforms to:

```ts
interface Peekerator<T> {
  /**
   * Calls `next()` on the underlying iterator and stores the value in `current`.
   * Returns `this` for chaining.
   */
  advance(): this;
  /**
   * Calls `return()` on the underlying iterator.
   * Returns `this` for chaining.
   */
  return(): this;
  /**
   * Returns an iterable iterator which starts at the `current` step.
   * This means that equal(source, peekerate(source).asIterator()) is true
   */
  asIterator(): $IterableIterator<T>;

  /**
   * Returns the step object that was return by `next()`.
   * The actual typedefs define a tagged union for safety.
   */
  readonly current: { done: boolean; value: T | undefined };

  /**
   * A convenince getter for `current.done`
   */
  readonly done: boolean;

  /**
   * A convenince getter for `current.value`
   */
  readonly value: T;

  /**
   * The index of the step stored in `current`
   */
  readonly index: number;
}
```

Typescript note: The type of `peekr` (and `peekr.current`) will be refined when you use the value of `peekr.done` as a condition. This helps you avoid spurious errors about `peekr.value` potentially being `undefined`, but it gives rise to another problem: Tyescript doesn't understand that `peekr.advance()` makes its previous refinements invalid. Therefore you must help typescript understand this by writing `peekr = peekr.advance()`. If you do not do this you may discover that Typescript fails to catch some errors, or you may just give strange-looking errors about the type of `peekr` being `never`. This happens because typescript has refined the type of `peekr.done` twice, once to `true` and once to `false`. The type of `true & false` is `never` in Typescript.

### asyncPeekerate

**asyncPeekerate(source)**  
**__asyncPeekerate(source)**  

See [peekerate](#peekerate)

Note: Returns a promise of a peekerator, which is necessary for the first value to be fetched.

```js
function asyncPrintValues(values) {
  const peekr = await asyncPeekerate(values);

  return peekr.done
    ? 'none'
    : stringFromAsync(
        asyncInterposeSeq(', ', peekr.asIterator()),
      );
}

asyncPrintValues(asyncWrap([])); // 'none'
asyncPrintValues(asyncWrap([1, 2, 3])); // '1, 2, 3'
```

### spliterate

**spliterate(strategy, options, [source](#wrappable))**  
**spliterate(strategy, [source](#wrappable))**  
**__spliterate([source](#iterable), strategy, ?options)**  

Facilitates the creation of methods which split a `source` iterable into multiple parts. The `strategy` generator yield a flat output containing values from `source` as well as special `split` sentinel values. `spliterate` decorates the values yielded from `strategy()`. Each instance of the `split` sentinel will yield a new part. Thus for a `strategy` which yields `split` `n` times, `n + 1` parts will be yielded.

Other methods in the split\* family (e.g. [splitOn](#spliton), [splitWhen](#splitwhen), and [bisect](#bisect)) are implemented using `spliterate` under the hood. It is expected that most use cases will be served by one of these existing methods. Their implementations also serve as useful examples.

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

**asyncSpliterate(strategy, options, [source](#asyncwrappable))**  
**asyncSpliterate(strategy, [source](#asyncwrappable))**  
**__asyncSpliterate([source](#asynciterable), strategy, ?options)**  

See [spliterate](#spliterate)

### spliterateGrouped

**spliterateGrouped(strategy, options, [source](#wrappable))**  
**spliterateGrouped(strategy, [source](#wrappable))**  
**__spliterateGrouped([source](#iterable), strategy, ?options)**  

Facilitates the creation of methods which split a `source` iterable into multiple keyed groups. The `strategy` generator yield a flat output containing values from `source` as well as special `split` sentinel values. `spliterate` decorates the values yielded from `strategy()`. Each instance of the `split` sentinel starts a new group. The value immediately following a `split` is the key for the group. This means that a `strategy` which yields `split` `n` times, `n` groups will be yielded.

[splitGroupsBy](#splitgroupsby) is implemented using `spliterateGrouped` under the hood. It is expected that most use cases will be served by using that method instead.

Included as an example is a lightly edited version of the implementation of `splitGroupsBy`. It is expected that in the vast majority of circumstances it will be correct to use the actual [splitGroupsBy](#splitgroupsby) method and not this one.

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

function splitGroupsBy(source, getKey) {
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

function splitGroupsBy<K, T>(
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

**asyncSpliterateGrouped(strategy, options, [source](#asyncwrappable))**  
**asyncSpliterateGrouped(strategy, [source](#asyncwrappable))**  
**__asyncSpliterateGrouped([source](#asynciterable), strategy, ?options)**  

See [spliterateGrouped](#spliterategrouped)


