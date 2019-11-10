# The iter-tools API

[![Documentation is automatically generated](https://img.shields.io/static/v1?label=docs&message=generated&color=informational)](https://github.com/iter-tools/iter-tools/blob/master/CONTRIBUTING.md#the-code-generator)

[Types](#types)  
[Methods](#methods)

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

The async version of a [result iterable](#resultiterable). Instead of working as an [Iterable](#iterable) and an iterator, it behaves like an [AsyncIterable](#asynciterable) and an async iterator. The same caveats apply regarding evaluating this kind of result iterable more than once.

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
[range](#range)  
[repeat](#repeat)  

Create iterables from objects

[entries](#entries)  
[keys](#keys)  
[values](#values)  

Use iterables from data structures

[wrapEntries](#wrapentries)  
[wrapKeys](#wrapkeys)  
[wrapValues](#wrapvalues)  

Transform a single iterable

[append](#append) ([async](#asyncappend))  
[batch](#batch) ([async](#asyncbatch))  
[dropWhile](#dropwhile) ([async](#asyncdropwhile))  
[enumerate](#enumerate) ([async](#asyncenumerate))  
[filter](#filter) ([async](#asyncfilter)) ([parallel-async](#asyncfilterparallel))  
[flat](#flat) ([async](#asyncflat))  
[flatMap](#flatmap) ([async](#asyncflatmap)) ([parallel-async](#asyncflatmapparallel))  
[interpose](#interpose) ([async](#asyncinterpose))  
[map](#map) ([async](#asyncmap)) ([parallel-async](#asyncmapparallel))  
[nullOr](#nullor)  
[nullOrAsync](#nullorasync)  
[prepend](#prepend) ([async](#asyncprepend))  
[reverse](#reverse) ([async](#asyncreverse))  
[slice](#slice) ([async](#asyncslice))  
[takeSorted](#takesorted) ([async](#asynctakesorted))  
[takeWhile](#takewhile) ([async](#asynctakewhile))  
[tap](#tap) ([async](#asynctap))  
[window](#window) ([async](#asyncwindow))  
[trailingWindow](#trailingwindow) ([async](#asynctrailingwindow))  
[wrap](#wrap) ([async](#asyncwrap))  

Separate an iterable into multiple iterables

[group](#group) ([async](#asyncgroup))  
[groupBy](#groupby) ([async](#asyncgroupby))  
[split](#split) ([async](#asyncsplit))  
[splitAt](#splitat) ([async](#asyncsplitat))  
[splitOn](#spliton) ([async](#asyncspliton))  
[splitOnAny](#splitonany) ([async](#asyncsplitonany))  
[splitOnAnySubseq](#splitonanysubseq) ([async](#asyncsplitonanysubseq))  
[splitOnSubseq](#splitonsubseq) ([async](#asyncsplitonsubseq))  
[splitWith](#splitwith) ([async](#asyncsplitwith))  

Combine multiple iterables

[collate](#collate) ([async](#asynccollate))  
[compress](#compress) ([async](#asynccompress))  
[concat](#concat) ([async](#asyncconcat))  
[interleave](#interleave) ([async](#asyncinterleave))  
[asyncInterleaveReady](#asyncinterleaveready)  
[join](#join) ([async](#asyncjoin))  
[joinAsStringWith](#joinasstringwith) ([async](#asyncjoinasstringwith))  
[joinWith](#joinwith) ([async](#asyncjoinwith))  
[joinWithSubseq](#joinwithsubseq) ([async](#asyncjoinwithsubseq))  
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
[includesAnySubseq](#includesanysubseq) ([async](#asyncincludesanysubseq))  
[includesSubseq](#includessubseq) ([async](#asyncincludessubseq))  
[isEmpty](#isempty) ([async](#asyncisempty))  
[isSorted](#issorted) ([async](#asyncissorted))  
[last](#last) ([async](#asynclast))  
[lastOr](#lastor) ([async](#asynclastor))  
[reduce](#reduce) ([async](#asyncreduce))  
[size](#size) ([async](#asyncsize))  
[some](#some) ([async](#asyncsome))  
[startsWith](#startswith) ([async](#asyncstartswith))  
[startsWithAny](#startswithany) ([async](#asyncstartswithany))  
[startsWithAnySubseq](#startswithanysubseq) ([async](#asyncstartswithanysubseq))  
[startsWithSubseq](#startswithsubseq) ([async](#asyncstartswithsubseq))  

Work with Regular Expressions

[regexpExec](#regexpexec)  

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
[toArray](#arrayfrom) ([async](#arrayfromasync))  

Utilities

[apply](#apply)  
[call](#call)  
[compose](#compose)  
[execPipe](#execpipe)  
[pipe](#pipe)  
[when](#when)  


## Create iterables

### cycle

**cycle(n, [iterable](#sourceiterable))**  
**cycle([iterable](#sourceiterable))**

Defaults:

- `n`: `Infinity`

Yields the contents of `iterable` repeated `n` times.

```js
cycle(2, range(3)); // Iterable[0, 1, 2, 0, 1, 2]
cycle(range(3)); // Iterable[0, 1, 2, 0, 1, 2, 0, 1, 2, ...]
```

### asyncCycle

**asyncCycle(times, [iterable](#asyncsourceiterable))**  
**asyncCycle([iterable](#asyncsourceiterable))**

See [cycle](#cycle)

### range

**range(start, end, ?step)**  
**range(?end)**  
**range({ start, end, step })**

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

**repeat(times, item)**  
**repeat(item)**

Defaults:

- `n`: `Infinity`

Create an iterable that returns the same value repeated `n` times.

```js
repeat(3, 'x'); // 'x', 'x', 'x'
repeat('x'); // 'x', 'x', 'x' .... forever
```


## Create iterables from objects

### entries

**entries(obj)**

Returns the `[key, value]` entries of own properties of `obj`. When `obj` is `null` or `undefined` it yields nothing, but it is otherwise equivalent to `Object.keys`.

`entries` is a great way to construct `Map` instances from objects!

```js
entries({ foo: 'bar', fox: 'far' }); // Iterable[['foo': 'bar'], ['fox': 'far']]
new Map(entries(obj)); // Map{foo => 'bar', fox => 'far'}
```

### keys

**keys(obj)**

Returns the string names of the own properties of `obj`. When `obj` is `null` or `undefined` it yields nothing, but it is otherwise equivalent to `Object.keys`.

```js
keys({ foo: 'bar', fox: 'far' }); // Iterable['foo', 'fox'];
```

### values

**values(obj)**

Returns the values of own properies of `obj`. When `obj` is `null` or `undefined` it yields nothing, but it is otherwise equivalent to `Object.values`.

```js
values({ foo: 'bar', fox: 'far' }); // Iterable['bar', 'far']
```


## Use iterables from data structures

### wrapEntries

**wrapEntries(entriesable)**

Yields the items yielded by `entriesable.entries()`. When passed `null` or `undefined`, yields nothing.

<!-- prettier-ignore -->
```js
wrapEntries(new Map([
  ['foo', 'bar'],
  ['fox', 'far']
])); // Iterable[['foo', 'bar'], ['fox', 'far']]
```

### wrapKeys

**wrapKeys(keysable)**

Yields the items yielded by `keysable.keys()`. When passed `null` or `undefined`, yields nothing.

<!-- prettier-ignore -->
```js
wrapKeys(new Map([
  ['foo', 'bar'],
  ['fox', 'far']
])); // Iterable['foo', 'fox']
```

### wrapValues

**wrapValues(valuesable)**

Yields the items yielded by `valuesable.values()`. When passed `null` or `undefined`, yields nothing.

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

Yields values from `source` with `value` appended.

```js
append(4, [1, 2, 3]); // Iterable[1, 2, 3, 4]
```

### asyncAppend

**asyncAppend(value, [source](#asyncsourceiterable))**

See [append](#append)

### batch

**batch(size, [source](#sourceiterable))**

Yields non-overlapping subsequences each containing `size` values from `source`.

```js
batch(2, range(5)); // [0, 1], [2, 3], [4]
```

### asyncBatch

**asyncBatch(size, [source](#asyncsourceiterable))**

See [batch](#batch)

### dropWhile

**dropWhile(predicate, [source](#sourceiterable))**

Returns values from `source`, omitting consecutive values at the beginning of `source` for which the result of `predicate(item, idx)` is truthy.

```js
dropWhile(isEven, range(5)); // 0, 2, 4
```

### asyncDropWhile

**asyncDropWhile(predicate, [source](#asyncsourceiterable))**

See [dropWhile](#dropwhile)

### enumerate

**enumerate(start, [source](#sourceiterable))**  
**enumerate([source](#sourceiterable))**

It is a shorthand for zipping an index to an iterable:

```js
enumerate(repeat('x')); // Iterable[[0, 'x'], [1, 'x'], [2, 'x'], ...]
```

You can also specify a **startIdx** which will be the index of the first item.

```js
enumerate(1, 'abc'); // Iterable[[1, 'a'], [2, 'b'], [3, 'c']]
```

### asyncEnumerate

**asyncEnumerate(start, [source](#asyncsourceiterable))**  
**asyncEnumerate([source](#asyncsourceiterable))**

See [enumerate](#enumerate)

### filter

**filter(predicate, [source](#sourceiterable))**

Yields only values from `source` for which the result of `predicate(value, idx)` is truthy. Equivalent to `Array.prototype.filter`.

```js
filter(isEven, range(4)); // Iterable[0, 2]
filter(animal => animal.kind.slice(1) === 'at', [
  { type: 'cat' },
  { type: 'rat' },
  { type: 'dog' },
]); // Iterable[{type: 'cat'}, {type: 'rat'}]
```

### asyncFilter

**asyncFilter(predicate, [source](#asyncsourceiterable))**

See [filter](#filter)

### asyncFilterParallel

**asyncFilterParallel(concurrency, func, [iterable](#asyncsourceiterable))**  
**asyncFilterParallel(func, [iterable](#asyncsourceiterable))**

Defaults:

- `concurrency`: `4`

A variant of filter with more complicated logic that can optimize when you have both an async filter predicate and an async souce iterable. It starts fetching the next item in the source iterable while waiting for the async predicate to resolve. The optional concurrency paramater dictates how many items can be read ahead from the source iterable while still waiting for the results of previous async predicates.

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

Defaults:

- `depth`: `1`
- `shouldFlat`: `value => isIterable(value) && !isString(value)`

Yields each nested value from `source` by recursing into values which are iterable -- up to the maximum recursion `depth`. In additon to checking `depth`, `flat` will only recurse if the result of `shouldFlat(item)` is truthy.

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

const isString = item =>
  typeof item === 'string' && item.length > 1;

flat(isString, Infinity, ['Hel', ['lo', '!']]); // Iterable['H', 'e', 'l', 'l', 'o', '!]
```

### asyncFlat

**asyncFlat(shouldFlat, depth, [source](#asyncsourceiterable))**  
**asyncFlat({ shouldFlat, depth }, [source](#asyncsourceiterable))**  
**asyncFlat(depth, [source](#asyncsourceiterable))**  
**asyncFlat([source](#asyncsourceiterable))**

See [flat](#flat)

### flatMap

**flatMap(func, [source](#sourceiterable))**

For each value in `source`, yields each value in `predicate(value, idx)`. Equivalent to `Array.prototype.flatMap`.

```js
flatMap(x => [x - 1, x], [1, 3, 5]); // Iterable[0, 1, 2, 3, 4, 5]
```

### asyncFlatMap

**asyncFlatMap(func, [source](#asyncsourceiterable))**

See [flatMap](#flatmap)

### asyncFlatMapParallel

**asyncFlatMapParallel(concurrency, func, [iterable](#asyncsourceiterable))**

Defaults:

- `concurrency`: `4`

A variant of flatMap with more complicated logic that can optimize when you have both an async mapper callback and an async souce iterable. It starts fetching the next item in the source iterable while waiting for the async callback to resolve. The optional concurrency paramater dictates how many items can be read ahead from the source iterable while still waiting for the results of previous mapper callbacks.

```js
await asyncFlatMapParallel(asyncMapper, asyncIterable);
await asyncFlatMapParallel(10, asyncMapper, asyncIterable);
```

Here is an example of using asyncWrap to turn a sync iterable into an async one:

```js
const item = await asyncWrap([1, 2, 3])
  [Symbol.asyncIterator]()
  .next();
item.value; // 1
```

### interpose

**interpose(interposed, [source](#sourceiterable))**

Yields `interposed` between each of the values in `source`.

```js
interpose(null, [1, 2, 3]); // Iterable[1, null, 2, null, 3]
```

### asyncInterpose

**asyncInterpose(interposed, [source](#asyncsourceiterable))**

See [interpose](#interpose)

### map

**map(func, [source](#sourceiterable))**

For each value in `source`, yields the result of `predicate(value, idx)`. Equivalent to `Array.prototype.map`.

```js
map(x => x * x, [0, 1, 2, 3]); // Iterable[0, 1, 4, 9]
```

### asyncMap

**asyncMap(func, [source](#asyncsourceiterable))**

See [map](#map)

### asyncMapParallel

**asyncMapParallel(concurrency, func, [iterable](#asyncsourceiterable))**  
**asyncMapParallel(func, [iterable](#asyncsourceiterable))**

Defaults:

- `concurrency`: `4`

A variant of map with more complicated logic that can optimize when you have both an async mapper callback and an async souce iterable. It starts fetching the next item in the source iterable while waiting for the async callback to resolve. The optional concurrency paramater dictates how many items can be read ahead from the source iterable while
still waiting for the results of previous mapper callbacks.

```js
await asyncMapParallel(asyncMapper, asyncIterable);
await asyncMapParallel(10, asyncMapper, asyncIterable);
```

### nullOr

**nullOr(source)**

When `source` is empty, returns `null`, else yields the values from `source`. This is useful given that some iterables can be consumed only once, and even more cannot be relied on to repeat the same values on multiple iterations.

**Important:** If you do not need to consume the iterable returned from `nullOr`, you must instead use `isEmpty`. Otherwise you will leak an iterator so that its `return()` method will never be called.

```js
function renderData(data) {
  const nullOrData = nullOr(data); // You must make a variable. Calling nullOr(data) 2x would fail.
  return nullOrData ? joinAsStringWith(', ', nullOrData) : 'No data.';
}

function* generateData() {
  if (Math.random() > 0.5) {
    yield 1;
    yield 2;
    yield 3;
  }
}

renderData(generateData());
```

Note that `null` cannot be used with for loops. You can either use [forEach](#foreach) or `for (const value of wrap(nullOrIterable))`.

### nullOrAsync

**nullOrAsync(source)**

`nullOrAsync` has a different call pattern than any other method in the library. It returns a Promise resolving to either `null` (if `source` is empty) or an [AsyncIterable](#asyncresultiterable) containing the values from `source`.

```js
async function renderData(data) {
  const nullOrData = await nullOr(data); // Note the await here. This would usually be unnecessary.
  return nullOrData ? await asyncJoinAsStringWith(', ', nullOrData) : 'No data.';
}

async function* generateAsyncData() {
  // ...
}

await renderData(generateAsyncData());
```

Note that `null` cannot be used with for loops. You can either use [asyncForEach](#asyncforeach) or `for await (const value of asyncWrap(nullOrIterable))`.

### prepend

**prepend(value, [source](#sourceiterable))**

Yields `value` followed by values from `source`.

```js
prepend(0, [1, 2, 3]); // Iterable[0, 1, 2, 3]
```

### asyncPrepend

**asyncPrepend(value, [source](#asyncsourceiterable))**

See [prepend](#prepend)

### reverse

**reverse([source](#sourceiterable))**

Yields the items from `iterable` in reverse order. If `iterable` is not an array, this requires caching all its items in memory.

```js
reverse([1, 2, 3]); // Iterable[3, 2, 1]
```

### asyncReverse

**asyncReverse([source](#asyncsourceiterable))**

See [reverse](#reverse)

Note: Unlike `reverse`, `asyncReverse` will always make a cache of the entire input, even if the input is an array. If this is not acceptable, ensure that you use `reverse` on arrays.

### slice

**slice(start, end, step, [source](#sourceiterable))**  
**slice(start, end, [source](#sourceiterable))**  
**slice(start, [source](#sourceiterable))**  
**slice({ start, end, step }, [source](#sourceiterable))**

Defaults:

- `end`: `Infinity`
- `step`: `1`

Yields a subsequence of items from `source`, starting at index `start` then advancing `step` items, until it reaches index `end`. The item at index `end` will not be part of the result.

```js
slice(0, 3, range(10)); // Iterable[0, 1, 2]
slice(2, range(10)); // Iterable[2, 3, 4, 5, 6, 7, 8, 9]
slice(2, 6, range(10)); // Iterable[2, 3, 4, 5]
slice(2, 6, 2, range(10)); // Iterable[2, 4]
```

`start` and `end` can also be negative. When they are, they refer to offsets from the end of `iterable`, as they do in `Array.prototype.slice`. `step` must not be negative.

```js
slice(0, -3, range(10)); // Iterable[0, 1, 2, 3, 4, 5, 6]
slice(-3, range(10)); // Iterable[7, 8, 9]
slice(-6, -2, range(10)); // Iterable[4, 5, 6, 7]
slice(-6, -2, 2, range(10)); // Iterable[4, 6]
```

Note: working with negative indicies does force `slice` to buffer items while it looks for the end of `iterable`. It will do this as efficiently as it can, but for this reason it is not a good idea to use really large negative indexes.

When no arguments are passed to `slice` it is functionally equivalent to `wrap`.

### asyncSlice

**asyncSlice(start, end, step, [source](#asyncsourceiterable))**  
**asyncSlice(start, end, [source](#asyncsourceiterable))**  
**asyncSlice(start, [source](#asyncsourceiterable))**  
**asyncSlice({ start, end, step }, [source](#asyncsourceiterable))**

See [slice](#slice)

### takeSorted

**takeSorted(n, [comparator](#comparator), [source](#sourceiterable))**  
**takeSorted(n, [source](#sourceiterable))**  
**takeSorted([comparator](#comparator), [source](#sourceiterable))**  
**takeSorted([source](#sourceiterable))**

Defaults:

- `comparator`: [default comparator](#the-default-comparator)

Returns `n` items from `source`, sorted in ascending order according to `comparator`. The function is both space efficient (only stores `n` items) and fast (`O(m log n)`), given `m` as the total number of items in `iterable`. It uses a heap internally.

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

See [takeSorted](#takesorted)

### takeWhile

**takeWhile(func, [source](#sourceiterable))**

Returns values from `source`, starting at the beginning up until the first value for which the result of `predicate(value, idx)` is falsy.

```js
takeWhile(isEven, [2, 4, 1, 3]); // Iterable[2, 4]
takeWhile(isEven, [1, 2, 3, 4]); // Iterable[]
```

### asyncTakeWhile

**asyncTakeWhile(func, [source](#asyncsourceiterable))**

See [takeWhile](#takewhile)

### tap

**tap(callback, [source](#sourceiterable))**

For each value in `source`, executes `callback(value, idx)` and yields the value (unmodified). Note that while this looks similar to what a `for..of` loop or `forEach` method might do, the key difference is that `tap` does not force evaluation of the iterable.

```js
pipeExec(
  [0, 1, 2],
  filter(item => !!item),
  tap(item => console.log(item)),
  map(item => item + 1),
); // Logs 1, 2 and returns Iterable[2, 3]
```

### asyncTap

**asyncTap(callback, [source](#asyncsourceiterable))**

See [tap](#tap)

### window

**window(size, { filler }, [source](#sourceiterable))**  
**window(size, [source](#sourceiterable))**

Defaults:

- `filler`: `undefined`

For every value in `source`, yields a window iterable of size `size` which starts with that value and also contains the next values from `source`. When there are not enough additional values in `source` to fill the window, `filler` will be used in place of the missing values.

```js
window(3, [1, 2, 3, 4, 5]);
// Iterable[
//   Iterable[1, 2, 3],
//   Iterable[2, 3, 4]
//   Iterable[3, 4, 5]
//   Iterable[4, 5, undefined]
//   Iterable[5, undefined, undefined]
// ]

window(3, { filler: Infinity }, [1, 2, 3, 4, 5]);
// Iterable[
//   Iterable[1, 2, 3],
//   Iterable[2, 3, 4]
//   Iterable[3, 4, 5]
//   Iterable[4, 5, Infinity]
//   Iterable[5, Infinity, Infinity]
// ]
```

### asyncWindow

**asyncWindow(size, { filler }, [source](#asyncsourceiterable))**  
**asyncWindow(size, [source](#asyncsourceiterable))**

See [window](#window)

### trailingWindow

**trailingWindow(size, { filler }, [source](#sourceiterable))**  
**trailingWindow(size, [source](#sourceiterable))**

Defaults:

- `filler`: `undefined`

For every value in `source`, yields a window iterable of size `size` which contains the values leading up to and including that value. When there are not enough prior values to fill the window, `filler` will be used in place of the missing values.

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

See [trailingWindow](#trailingwindow)

### wrap

**wrap(source)**

Yields the items from `source`. Its main purposes include allowing nullable iterables to be treated as non-null iterables, and to give arbitrary iterables the semantics of iter-tools iterables.

```js
const maybeIterable =
  Math.random() > 0.5 ? [1, 2, 3] : null;

[...wrap(maybeIterable)]; // [1, 2, 3] OR []
```

### asyncWrap

**asyncWrap(source)**

See [wrap](#wrap)

Also turns sync iterables into async iterables and ensures async `next()` queueing semantics.


## Separate an iterable into multiple iterables

### group

**group(iterable)**

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

See [group](#group)

### groupBy

**groupBy(getKey, [source](#sourceiterable))**

Yields `[key, group]` pairs, where `key` is a result of `getKey(value, idx)` and `group` is a subsequence of adjacent values from `source` which share the same `key` (as compared with `===`).

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

See [groupBy](#groupby)

### split

**split(source)**

Yields each item in `source` as an iterable of one item.

```js
split([1, 2, 3]); // Iterable[Iterable[1], Iterable[2], Iterable[3]]
```

### asyncSplit

**asyncSplit(source)**

See [split](#split)

### splitAt

**splitAt(idx, [source](#sourceiterable))**

Yields two `part` subsequences of `source`. The first `part` yields the values occurring before index `idx` in `source`, the second `part` yields all the values at or after index `idx`.

```js
const [
  firstThree, // Iterable[0, 1, 2]
  others, // Iterable[3, 4, 5, 6, 7, 8, 9]
] = splitAt(3, range(100));
```

If you consume the sequences in order the method works in place, however if you consume the second subsequence before the first then the values from the first subsequence must be buffered.

### asyncSplitAt

**asyncSplitAt(idx, [source](#asyncsourceiterable))**

See [splitAt](#splitat)

### splitOn

**splitOn(separatorValue, [source](#sourceiterable))**

Yields `part` subsequences of `source`, generating a new `part` each time it encounters `separatorValue` (as compared with `===`).

```js
splitOn(null, [1, null, 2, null, 3]); // Iterable[[1], [2], [3]]
```

### asyncSplitOn

**asyncSplitOn(separatorValue, [source](#asyncsourceiterable))**

See [splitOn](#spliton)

### splitOnAny

**splitOnAny(separatorValues, [source](#sourceiterable))**

Yields `part` subsequences of `source`, generating a new `part` each time it encounters any `separatorValue` in the `separatorValues` iterable (as compared with `===`).

```js
splitOnAny([null, undefined], [1, null, 2, undefined, 3]); // Iterable[[1], [2], [3]]
```

### asyncSplitOnAny

**asyncSplitOnAny(separatorValues, [source](#asyncsourceiterable))**

See [splitOnAny](#splitonany)

### splitOnAnySubseq

**splitOnAnySubseq(separatorSubseqs, [source](#sourceiterable))**

Yields `part` subsequences of `source`, generating a new `part` each time it encounters a subsequence of values matching any `separatorSubseq` in the `separatorSubseqs` iterable. Each value in a `separatorSubseq` must match using `===`. When a `separatorSubseq` is matched, all matched values are consumed from `source`. They will not appear in any `part`, nor may they be part of any other `separatorSubseq` match.

```js
splitOnAnySubseq(
  [['\r\n'], ['\n']],
  'mixed\r\nline\nterminators',
); // Iterable['mixed', 'line', 'terminators']
```

### asyncSplitOnAnySubseq

**asyncSplitOnAnySubseq(separatorSubseqs, [source](#asyncsourceiterable))**

See [splitOnAnySubseq](#splitonanysubseq)

### splitOnSubseq

**splitOnSubseq(separatorSubseq, [source](#sourceiterable))**

Yields `part` subsequences of `source`, generating a new `part` each time it encounters a subsequence of values matching `separatorSubseq`. Each value in `separatorSubseq` must match using `===`. When `separatorSubseq` is matched, all matched values are consumed from `source`. They will not appear in any `part`, nor may they be part of any other `separatorSubseq` match.

```js
splitOnSubseq([0, 0], [1, 0, 0, 2, 0, 0, 3]); // Iterable[[1], [2], [3]]
splitOnSubseq([0, 0], [0, 0, 0, 1, 2]); // Iterable[[], [0, 1, 2]]
```

### asyncSplitOnSubseq

**asyncSplitOnSubseq(separatorSubseq, [source](#asyncsourceiterable))**

See [splitOnSubseq](#splitonsubseq)

### splitWith

**splitWith(predicate, [source](#sourceiterable))**

Yields `part` subsequences of values from `source`, generating a new `part` each time the result of `predicate(value, idx)` is truthy. Values which match the `predicate` are consumed, and will not be in any `part`.

You may also specify a regex predicate, in which case the behavior will match `str.split(RegExp)`. This is the only situation in which you will be able to match more than one value from `source` at a time.

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

See [splitWith](#splitwith)


## Combine multiple iterables

### collate

**collate([comparator](#comparator), ...[sources](#sourceiterable))**

Combines values from each `source` in `sources` into a single iterable, peserving the ordering of values within each `source`. Collate uses `comparator` to establish a partial ordering of items at the head of each `source`. At each step it yields the lowest value in the ordering then recomputes the ordering.

```js
collate([1, 2, 5, 6], [3, 4]); // Iterable[1, 2, 3, 4, 5, 6]
collate((a, b) => b - a, [6, 5, 2, 1], [4, 3]); // Iterable[6, 5, 4, 3, 2, 1]
```

### asyncCollate

**asyncCollate([comparator](#comparator), ...[sources](#asyncsourceiterable))**

See [collate](#collate)

### compress

**compress([source](#sourceiterable), [included](#sourceiterable))**

Consumes values from `source` and `included` iterables in parallel, at each step yielding the `source` value if the `included` value is truthy.

```js
compress([0, 1, 2, 3, 4], [0, 0, 1, 1]); // 2, 3
compress([0, 1, 2, 3, 4], cycle([true, false])); // 0, 2, 4
```

### asyncCompress

**asyncCompress([source](#asyncsourceiterable), [included](#asyncsourceiterable))**

See [compress](#compress)

### concat

**concat(...sources)**

Yields each value from each `source` in `sources`. First all values from the first `source` are yielded, then then from the second, etc.

```js
concat([3, 5, 6], [1, 1], [10]); // 3, 5, 6, 1, 1, 10
```

### asyncConcat

**asyncConcat(...sources)**

See [concat](#concat)

### interleave

**interleave(generateInterleaved, options, ...[sources](#sourceiterable))**  
**interleave(generateInterleaved, ...[sources](#sourceiterable))**

Facilitates the creation of new strategies for interleaving items from multiple iterables. It does this by decorating the `generateInterleaved` generator, which is to say providing it with arguments and yielding its values. While `generateInterleaved` may yield many values, being a [generator function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*) it is called only once. The call will look like: `generateInterleaved(canTakeAny, ...buffers)`. Fuller documentation of what each of these arguments is and does follows the example, which shows the curried form of the function.

```js
const aabbInterleave = interleave(function*(
  canTakeAny,
  ...buffers
) {
  const [a, b] = buffers;
  // canTakeAny returns a truthy value if any buffer canTake()
  while (canTakeAny()) {
    if (a.canTake()) yield a.take();
    if (a.canTake()) yield a.take();
    if (b.canTake()) yield b.take();
    if (b.canTake()) yield b.take();
  }
});

const a = [1, 2, 5, 6];
const b = [3, 4, 7];

aabbInterleave(a, b); // [1, 2, 3, 4, 5, 6, 7]
```

Hopefully now that you can see how `buffers` is used, the definition of a `buffer` will make more sense: each `buffer` is an instance of `InterleaveBuffer` which stores a single value from a single `source` iterable.

```ts
class InterleaveBuffer<T> {
  // The index of the current buffered value in the source
  index: number;

  // The index of the source which this buffer represents
  bufferIndex: number;

  // Returns the current buffered value
  peek(): T;

  // Returns false if the source iterable is done
  // To be sure that your output is the same size as your combined inputs always call canTake before take.
  canTake(): boolean;

  // Returns the current buffered value and buffers the next one.
  // Expected to be used with yield.
  take(): T;
}
```

When `generateInterleaved` has finished `interleave` will clean up any `source` which was not fully consumed.

There is also an overload of `interleave` which allows you to pass an `options` argument to `generateInterleaved`. This allows you to create interleaves which are parameterized, like so:

```js
const roundRobin = interleave(function*(
  options,
  canTakeAny,
  ...buffers
) {
  let i = options.start || 0;
  while (canTakeAny()) {
    yield buffers[i];
    i = (i + 1) % buffers.length;
  }
});

roundRobin({ start: 1 }, [2, 4, 6], [1, 3, 5]); // [1, 2, 3, 4, 5, 6]
```

### asyncInterleave

**asyncInterleave(generateInterleaved, options, ...[sources](#asyncsourceiterable))**  
**asyncInterleave(generateInterleaved, ...[sources](#asyncsourceiterable))**

See [interleave](#interleave)

### asyncInterleaveReady

**asyncInterleaveReady([sources](#asyncsourceiterable))**

Interleaves values from each `source` in `sources`, yielding values in whatever order they resolve (become ready). Note that this means that the results of this interleave will usually not be repeatable.

```js
asyncInterleaveReady(aItems, bItems);
```

### join

**join([source](#sourceiterable))**

Given `source`, an iterable of iterables, yields all values from each iterable. It is the inverse of `split`.

```js
join([[1], [2], [3]]); // Iterable[1, 2, 3]
```

### asyncJoin

**asyncJoin([source](#asyncsourceiterable))**

See [join](#join)

### joinAsStringWith

**joinAsStringWith(separator, [strings](#sourceiterable))**

Returns the concatenation of each string in `strings` with `separator` in between.

```js
joinAsStringWith(' ', ['aa', 'bb', 'cc']); // "aa bb cc"
```

Note that the method technically is working with iterables of characters (i.e. length 1 strings). A string is such an iterable but there are other forms too, e.g.:

```js
joinAsStringWith(' ', [['a', 'a'], ['b'], ['c', 'c']]); // "aa b cc"
```

### asyncJoinAsStringWith

**asyncJoinAsStringWith(separator, [strings](#asyncsourceiterable))**

See [joinAsStringWith](#joinasstringwith)

### joinWith

**joinWith(separator, [source](#sourceiterable))**

Given `source`, an iterable of iterables, yields all values from each iterable with `separator` in between. It is the inverse of `splitOn`.

```js
joinWith(null, [[1], [2], [3]]); // Iterable[1, null, 2, null, 3]
```

### asyncJoinWith

**asyncJoinWith(separator, [source](#asyncsourceiterable))**

See [joinWith](#joinwith)

### joinWithSubseq

**joinWithSubseq(separatorSubseq, [source](#sourceiterable))**

Given `source`, an iterable of iterables, yields all values from each iterable with the `separatorSubseq` values in between. It is the inverse of `splitOnSubseq`.

```js
joinWithSubseq([null, null], [[1], [2], [3]]); // Iterable[1, null, null, 2, null, null, 3]
```

### asyncJoinWithSubseq

**asyncJoinWithSubseq(separatorSubseq, [source](#asyncsourceiterable))**

See [joinWithSubseq](#joinwithsubseq)

### roundRobin

**roundRobin(start, step, ...[sources](#sourceiterable))**  
**roundRobin(step, ...[sources](#sourceiterable))**  
**roundRobin(...[sources](#sourceiterable))**

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

See [roundRobin](#roundrobin)

### zip

**zip(...[sources](#sourceiterable))**

Consumes each `source` in `sources` in parallel, at each step yielding an array with one value from every `source`. Stops when the shortest source iterable is exausted.

```js
zip([1, 2], [3, 4], [5, 6, 7]); // [1, 3, 5], [2, 4, 6]
```

### asyncZip

**asyncZip(...[sources](#asyncsourceiterable))**

See [zip](#zip)

### zipAll

**zipAll({ filler }, ...[sources](#sourceiterable))**  
**zipAll(...[sources](#sourceiterable))**

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

See [zipAll](#zipall)


## Reduce an iterable to a single value

### equal

**equal(...[iterables](#sourceiterable))**

Returns `true` if all `iterables` are equal to each other, and `false` otherwise. Only considers the values yielded by the iterables, which it compares with `===`.

```js
equals([1, 2, 3], [1, 2, 3], [1, 2, 3]); // true
equals([1, 2, 3], [3, 2, 1]); // false
```

### asyncEqual

**asyncEqual(...[iterables](#asyncsourceiterable))**

See [equal](#equal)

### every

**every(predicate, [iterable](#sourceiterable))**

Returns `true` if, for every value in `source`, the result of `predicate(item, idx)` is truthy. Otherwise returns `false`.

```js
every(isEven, [1, 2, 3]); // returns false
every(isEven, [2, 4, 6]); // returns true
```

### asyncEvery

**asyncEvery(predicate, [iterable](#asyncsourceiterable))**

See [every](#every)

### find

**find(predicate, [iterable](#sourceiterable))**

Returns the first item in `iterable` for which `predicate(item, idx)` returns a truthy value. It is the equivalent of `Array.prototype.find`.

```js
find(animal => animal.kind === 'dog', [
  { type: 'cat' },
  { type: 'dog' },
]); // {type: 'dog'}
```

### asyncFind

**asyncFind(predicate, [iterable](#asyncsourceiterable))**

See [find](#find)

### findOr

**findOr(notFoundValue, func, [iterable](#sourceiterable))**

Returns the first item in `iterable` for which `predicate(item, idx)` returns a truthy value, or `notFoundValue` if no item satisfied the predicate.

```js
findOr(0, x => x > 10, [1, 2, 3]); // 0
```

### asyncFindOr

**asyncFindOr(notFoundValue, func, [iterable](#asyncsourceiterable))**

See [findOr](#findor)

### first

**first(iterable)**

Returns the first value from `iterable`, or `undefined` when `iterable` is empty.

```js
first([1, 2, 3]); // 1
first([]); // undefined
```

### asyncFirst

**asyncFirst(iterable)**

See [first](#first)

### firstOr

**firstOr(whenEmpty, [iterable](#sourceiterable))**

Returns the first value from `iterable`, or `whenEmpty` when `iterable` is empty.

```js
firstOr(0, [1, 2, 3]); // 1
firstOr(0, []); // 0
```

### asyncFirstOr

**asyncFirstOr(whenEmpty, [iterable](#asyncsourceiterable))**

See [firstOr](#firstor)

### includes

**includes(value, [iterable](#sourceiterable))**

Retuns `true` if `iterable` includes the specified `value`, or `false` otherwise. Compares values with `===`.

```js
includes(2, [1, 2, 3]); // true
includes(0, [1, 2, 3]); // false
```

### asyncIncludes

**asyncIncludes(value, [iterable](#asyncsourceiterable))**

See [includes](#includes)

### includesAny

**includesAny(values, [iterable](#sourceiterable))**

Retuns `true` if `iterable` includes any of the specified `values`, or `false` otherwise. Compares values with `===`.

```js
includesAny([0, 1], [1, 2, 3]); // true
includesAny([0, 1], [2, 3, 4]); // false
```

### asyncIncludesAny

**asyncIncludesAny(values, [iterable](#asyncsourceiterable))**

See [includesAny](#includesany)

### includesAnySubseq

**includesAnySubseq(subseqs, [iterable](#sourceiterable))**

Retuns `true` if any of the the `subseqs` (subsequences) of values can be found somewhere in `iterable`, or `false` otherwise. Compares values with `===`.

```js
includesAnySubseq([[1, 2], [2, 3]], [1, 2, 3]); // true
includesAnySubseq([[2, 3], [3, 4]], [1, 2, 3]); // true
includesAnySubseq([[0, 1], [3, 4]], [1, 2, 3]); // false
```

### asyncIncludesAnySubseq

**asyncIncludesAnySubseq(subseqs, [iterable](#asyncsourceiterable))**

See [includesAnySubseq](#includesanysubseq)

### includesSubseq

**includesSubseq(subseq, [iterable](#sourceiterable))**

Retuns `true` if the `subseq` (subsequence) of values can be found somewhere in `iterable`, or `false` otherwise. Compares values with `===`.

```js
includesSubseq([1, 2], [1, 2, 3]); // true
includesSubseq([1, 2, 3], [1, 2, 3]); // true
includesSubseq([2, 3, 4], [1, 2, 3]); // false
```

### asyncIncludesSubseq

**asyncIncludesSubseq(subseq, [iterable](#asyncsourceiterable))**

See [includesSubseq](#includessubseq)

### isEmpty

**isEmpty(iterable)**

Returns `true` if `iterable` contains no values, and `false` otherwise.

```js
isEmpty([]); // true
isEmpty(null); // true
isEmpty(range(1)); // false
isEmpty([undefined]); // false
```

### asyncIsEmpty

**asyncIsEmpty(iterable)**

See [isEmpty](#isempty)

### isSorted

**isSorted([comparator](#comparator), [iterable](#sourceiterable))**  
**isSorted([iterable](#sourceiterable))**

Returns `true` if the values in `iterable` are sorted in ascending order according to `comparator`, and `false` otherwise.

```js
isSorted([1, 2, 3]); // true
isSorted((a, b) => b - a, [3, 2, 1]); // true
```

### asyncIsSorted

**asyncIsSorted([comparator](#comparator), [iterable](#asyncsourceiterable))**  
**asyncIsSorted([iterable](#asyncsourceiterable))**

See [isSorted](#issorted)

### last

**last(iterable)**

Returns the last value from `iterable`, or `undefined` when `iterable` is empty. If `iterable` is not an array, this requires traversing the whole iterable.

```js
last([1, 2, 3]); // 3
last([]); // undefined
```

### asyncLast

**asyncLast(iterable)**

See [last](#last)

Note: Unlike `last`, `asyncLast` will always traverse the entire input iterable, even if it is an array. If this is not acceptable, ensure that you use `last` on arrays.

### lastOr

**lastOr(whenEmpty, [iterable](#sourceiterable))**

Returns the last value from `iterable`, or `whenEmpty` when `iterable` is empty. If `iterable` is not an array, this requires traversing the whole iterable.

```js
lastOr(0, [1, 2, 3]); // 3
lastOr(0, []); // 0
```

### asyncLastOr

**asyncLastOr(whenEmpty, [iterable](#asyncsourceiterable))**

See [lastOr](#last-or)

Note: Unlike `lastOr`, `asyncLastOr` will always traverse the entire input iterable, even if it is an array. If this is not acceptable, ensure that you use `lastOr` on arrays.

### reduce

**reduce(initial, reducer, [iterable](#sourceiterable))**  
**reduce(reducer, [iterable](#sourceiterable))**

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

See [reduce](#reduce)

### size

**size(iterable)**

Returns the number of values in `iterable` by iterating over it. Will optimize by reading the `length` property if `iterable` is an array, or `size` if it is a `Map` or `Set`.

Note: the optimizations on `Map` and `Set` are not guaranteed to trigger, in particular because the `instanceof` check can be fragile [in certain circumstances](https://stackoverflow.com/questions/49832187/how-to-understand-js-realms).

```js
size([1, 2, 3]); // 3
```

### asyncSize

**asyncSize(iterable)**

See [size](#size)

### some

**some(func, [iterable](#sourceiterable))**

Returns `true` if the result of `predicate(item, idx)` is truthy for at least one value in `iterable`, and `false` otherwise.

```js
some(isEven, [1, 2, 3]); // true
some(isEven, [1, 3, 7]); // false
```

### asyncSome

**asyncSome(func, [iterable](#asyncsourceiterable))**

See [some](#some)

### startsWith

**startsWith(value, [iterable](#sourceiterable))**

Returns `true` if the first value in `source` is `value`, as compared with `===`. Otherwise returns `false`.

```js
startsWith(1, [1, 2, 3]); // true
```

### asyncStartsWith

**asyncStartsWith(value, [iterable](#asyncsourceiterable))**

See [startsWith](#startswith)

### startsWithAny

**startsWithAny(value, [iterable](#sourceiterable))**

Returns `true` if the first value in `source` is any `value` in `values`, as compared with `===`. Otherwise returns `false`.

```js
startsWithAny([0, 1], [1, 2, 3]); // true
```

### asyncStartsWithAny

**asyncStartsWithAny(value, [iterable](#asyncsourceiterable))**

See [startsWithAny](#startswithany)

### startsWithAnySubseq

**startsWithAnySubseq(valueSubseqs, [iterable](#sourceiterable))**

Returns `true` if the first subsequence of values in `source` match any `valueSubseq` in `valueSubseqs`, where each value is compared with `===`. Otherwise returns `false`.

```js
startsWithAnySubseq([[0, 1], [1, 2]], [1, 2, 3]); // true
```

### asyncStartsWithAnySubseq

**asyncStartsWithAnySubseq(valueSubseqs, [iterable](#asyncsourceiterable))**

See [startsWithAnySubseq](#startswithanysubseq)

### startsWithSubseq

**startsWithSubseq(valueSubseq, [iterable](#sourceiterable))**

Returns `true` if the first subsequence of values in `source` matches `valueSubseq`, where each value is compared with `===`. Otherwise returns `false`.

```js
startsWithSubseq([1, 2], [1, 2, 3]); // true
```

### asyncStartsWithSubseq

**asyncStartsWithSubseq(valueSubseq, [iterable](#asyncsourceiterable))**

See [startsWithSubseq](#startswithsubseq)


## Work with Regular Expressions

### regexpExec

**regexpExec(str, regexp)**

Yields matches from executing `regexp.exec(str)`. A match is an array of `[fullMatch, ...submatches]`. It is beyong the scope of these docs to provide a full accounting of `RegExp.prototype.exec`, which you can find [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec).

```js
const iter = regexpExec(
  /[0-9]{4}/g,
  '10/2/2013, 03/03/2015 12/4/1997',
);
for (let [match] of iter) {
  console.log(match); // '2013', '2015', '1997'
}
```


## Combinatory iterables

### combinations

**combinations(n, [iterable](#sourceiterable))**  
**combinations([iterable](#sourceiterable))**

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

The number of items that will be yielded is accessible through a `size` property.
Note that the actual combinations are not computed in the example below

```js
combinations(2, [1, 2, 3, 4]).size === 6;
```

### combinationsWithReplacement

**combinationsWithReplacement(n, [iterable](#sourceiterable))**  
**combinationsWithReplacement([iterable](#sourceiterable))**

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

The number of items that will be yielded is accessible through a `size` property.
Note that the actual combinations are not computed in the example below

```js
combinationsWithReplacement(2, [1, 2, 3, 4]).size === 10;
```

### permutations

**permutations(k, [iterable](#sourceiterable))**  
**permutations([iterable](#sourceiterable))**

Defaults:

`n`: `size(iterable)`

Yields permutations of length `n` of items from `iterable`.

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

The number of items that will be yielded is accessible through a `size` property.
Note that the actual combinations are not computed in the example below

```js
permutations([0, 1]).size === 2;
```

### product

**product(...iterables)**

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

The number of items that will be yielded is accessible through a `size` property.
Note that the actual combinations are not computed in the example below

```js
product([1, 2], [3, 4], [5, 6]).size === 8;
```


## Control timing inside an async iterable

### asyncBuffer

**asyncBuffer(bufferSize, [source](#asyncsourceiterable))**

It buffers n items of an asyncIterable (it can be curried).

```js
asyncBuffer(10, iterable);
```

### asyncThrottle

**asyncThrottle(intervalMs, [source](#asyncsourceiterable))**

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

**fork(n, [source](#sourceiterable))**  
**fork([source](#sourceiterable))**

Defaults:

`n`: `Infinity`

Returns an iterable of `n` forks of `source`. Each fork contains the same values as `source`, and can be consumed independently. This works even if `source` cannot itself be consumed more than once, for example because it is a generator. Values are buffered until they have been consumed by all forks. Each fork can only be consumed once.

```js
const [forkA, forkB, forkC] = fork(function*() {
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

There is a really good chance that you'd be better off using `toArray` to cache an iterable instead of `fork`. `fork` is only better when you have a known, finite number of consumers of an infinite (or very large) iterable, and in particular when your consumers consume in parallel. These conditions will be rare, and if they are not met, `fork` will end up being slower and using more memory than `toArray` anyway.

If your use case does satisfy the above conditions, be sure that `fork` understands how many consumers to create, either by using `slice` or destructuring on the forks iterable, or by passing the `n` argument to `fork`.

### asyncFork

**asyncFork(n, [source](#asyncsourceiterable))**  
**asyncFork([source](#asyncsourceiterable))**

See [fork](#fork)

Note: Returns an iterable (sync) of async iterables.


## Consume an iterable

### arrayFrom

**arrayFrom([source](#sourceiterable))**

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

See [consume](#consume)

### forEach

**forEach(callback, [iterable](#sourceiterable))**

Calls `callback(value, idx)` for each value in `iterable`. Note that as a consuming method, `forEach` is not lazy. It will trigger evaluation of `iterable`.

```js
forEach(value => console.log(value), [1, 2, 3]); // prints 1, 2, 3
forEach(value => console.log(value), null); //
```

### asyncForEach

**asyncForEach(callback, [iterable](#asyncsourceiterable))**

See [forEach](#foreach)

### toArray

**toArray(source)**

See [arrayFrom](#arrayfrom)

### asyncToArray

**asyncToArray(source)**

See [arrayFromAsync](#arrayfromasync)


## Utilities

### apply

**apply(fn, args)**

`apply` is a convenience method. Its implementation is:

```js
(fn, args = []) => fn(...args);
```

`apply` has three main differences from `Function.prototype.apply`. It does not take a `thisArg`, the args to apply may be specified as an iterable, and if you do not pass the `args` iterable, the result is a partial application, not a no-args call to `fn`.

### call

**call(fn, ...args)**

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
  map(x => x + 1),
  filter(x => x % 2 === 0),
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

### pipe

**pipe(...fns)**

Allows nested calls to be flattened out for improved readability. `pipe(a, b, c)` is equivalent to `c(b(a))`, where `a`, `b`, and `c`, are functions. `pipe` is usually combined with curryied forms of other methods so that the `source` (or `iterable`) argument is passed between the composed methods.

```js
const filterMap = pipe(
  filter(x => x % 2 === 0),
  map(x => x + 1),
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


