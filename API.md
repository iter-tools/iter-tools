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

An [Iterable](#iterable) which is also an iterator, which is to say that it has `next()`, `throw(error)`, and `return(value)` methods. It can be evaluated multiple times calling its `[Symbol.iterator]()` method repeatedly. Note that there is no guarantee that evaluating a result iterable more than once will produce the same items, unless the source iterable makes that guarantee.

### AsyncResultIterable

The async version of a [result iterable](#resultiterable). Instead of working as an [Iterable](#iterable) and an iterator, it behaves like an [AsyncIterable](#asynciterable) and an async iterator. The same caveats apply regarding evaluating this kind of result iterable more than once.


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

[batch](#batch) ([async](#asyncbatch))  
[dropWhile](#dropwhile) ([async](#asyncdropwhile))  
[enumerate](#enumerate) ([async](#asyncenumerate))  
[filter](#filter) ([async](#asyncfilter)) ([parallel-async](#asyncfilterparallel))  
[flat](#flat) ([async](#asyncflat))  
[flatMap](#flatmap) ([async](#asyncflatmap)) ([parallel-async](#asyncflatmapparallel))  
[interpose](#interpose) ([async](#asyncinterpose))  
[map](#map) ([async](#asyncmap)) ([parallel-async](#asyncmapparallel))  
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

It cycles the same iterable `n` times, or forever if `n` is not specified.

```js
cycle(2, range(3)); // 0, 1, 2, 0, 1, 2
cycle(range(3)); // 0, 1, 2, 0, 1, 2, 0, 1, 2 ....
```

### asyncCycle

**asyncCycle(times, [iterable](#asyncsourceiterable))**  
**asyncCycle([iterable](#asyncsourceiterable))**

See [cycle](#cycle)

### range

**range(start, end, ?step)**  
**range(?end)**  
**range({ start, end, step })**

Create an iterable returning a sequence of numbers (the sequence can be infinite).
Overloads are: `range({start, step, end})`, `range(end)`, or `range(start, step, end)`.

```js
range(); // 0, 1, 2 ... Infinity

range({ end: 3 }); // 0, 1, 2
range({ start: 3 }); // 3, 4, 5 ... Infinity
range({ start: 3, end: 6 }); // 3, 4, 5
range({ start: 3, end: 10, step: 3 }); // 3, 6, 9
range({ start: 9, end: 3, step: -3 }); // 9, 6

range(3); // 0, 1, 2
range(3, 6); // 3, 4, 5
range(3, 10, 3); // 3, 6, 9
```

### repeat

**repeat(times, item)**  
**repeat(item)**

Create an iterable that returns the same value `n` times

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

```js
// prettier-ignore
wrapEntries(new Map([
  ['foo', 'bar'],
  ['fox', 'far']
])); // Iterable[['foo', 'bar'], ['fox', 'far']]
```

### wrapKeys

**wrapKeys(keysable)**

Yields the items yielded by `keysable.keys()`. When passed `null` or `undefined`, yields nothing.

```js
// prettier-ignore
wrapKeys(new Map([
  ['foo', 'bar'],
  ['fox', 'far']
])); // Iterable['foo', 'fox']
```

### wrapValues

**wrapValues(valuesable)**

Yields the items yielded by `valuesable.values()`. When passed `null` or `undefined`, yields nothing.

```js
// prettier-ignore
wrapValues(new Map([
  ['foo', 'bar'],
  ['fox', 'far']
])); // Iterable['bar', 'far']
```


## Transform a single iterable

### batch

**batch(size, [source](#sourceiterable))**

Takes a number and an iterable and returns an iterable divided into batches

```js
batch(2, range(5)); // [0, 1], [2, 3], [4]
```

### asyncBatch

**asyncBatch(size, [source](#asyncsourceiterable))**

See [batch](#batch)

### dropWhile

**dropWhile(func, [source](#sourceiterable))**

It starts returning values when the function is false. Then it keeps going until the iterable is exausted.

```js
dropWhile(isEven, range(4)); // 1, 2, 3
```

### asyncDropWhile

**asyncDropWhile(func, [source](#asyncsourceiterable))**

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

**filter(func, [source](#sourceiterable))**

The equivalent of the array "filter" function.

```js
filter(isEven, range(4)); // 0, 2
await asyncFilter(animal => animal.kind.slice(1) === 'at', [
  { type: 'cat' },
  { type: 'rat' },
  { type: 'dog' },
]); // [{type: 'cat'}, {type: 'rat'}]
```

### asyncFilter

**asyncFilter(func, [source](#asyncsourceiterable))**

See [filter](#filter)

### asyncFilterParallel

**asyncFilterParallel(concurrency, func, [iterable](#asyncsourceiterable))**  
**asyncFilterParallel(func, [iterable](#asyncsourceiterable))**

A variant of filter with more complicated logic that can optimize when you have both an async filter predicate and an
async souce iterable. It starts fetching the next item in the source iterable while waiting for the async predicate
to resolve. The optional concurrency paramater dictates how many items can be read ahead from the source iterable while
still waiting for the results of previous async predicates.

The default concurrency is 4.

```js
await asyncFilterParallel(asyncPredicate, asyncIterable);
await asyncFilterParallel(10, asyncPredicate, asyncIterable);
```

### flat

**flat(shouldFlat, depth, [source](#sourceiterable))**  
**flat({ shouldFlat, depth }, [source](#sourceiterable))**  
**flat(depth, [source](#sourceiterable))**  
**flat([source](#sourceiterable))**

It flattens an iterable. You can specify the maximum depth as first argument (default 1). `0` means "no flatten", `Infinity` means "deep flatten".

```js
flat([1, [2, 3], [4, [5, 6]]]); // 1, 2, 3, 4, [5, 6]
flat(2, [1, [2, 3], [4, [5, 6]]]); // 1, 2, 3, 4, 5, 6
```

The algorithm takes into consideration every item that is iterable, except strings.
Alternatively, you can pass a function that takes the current item and returns true if the item is a sequence which can be flattened.

```js
const isString = item => typeof item === 'string' && item.length > 1;

flat(isString, Infinity, ['hel', ['lo', ''], ['world']]); // h e l l o w o r l d
```

Finally for maximum readability you can specify flat's options as an object, like so:

```js
flat({ shouldFlat: isString, depth: Infinity }, ['hel', ['lo', ''], ['world']]); // h e l l o w o r l d
```

### asyncFlat

**asyncFlat(shouldFlat, depth, [source](#asyncsourceiterable))**  
**asyncFlat({ shouldFlat, depth }, [source](#asyncsourceiterable))**  
**asyncFlat(depth, [source](#asyncsourceiterable))**  
**asyncFlat([source](#asyncsourceiterable))**

See [flat](#flat)

### flatMap

**flatMap(func, [source](#sourceiterable))**

It maps value of an iterable and flatten them.

```js
flatMap(x => [x, x * x], range(4)); // 0, 0, 1, 1, 2, 4, 3, 9
```

### asyncFlatMap

**asyncFlatMap(func, [source](#asyncsourceiterable))**

See [flatMap](#flatmap)

### asyncFlatMapParallel

**asyncFlatMapParallel(concurrency, func, [iterable](#asyncsourceiterable))**

A variant of flatMap with more complicated logic that can optimize when you have both an async mapper callback and an
async souce iterable. It starts fetching the next item in the source iterable while waiting for the async callback
to resolve. The optional concurrency paramater dictates how many items can be read ahead from the source iterable while
still waiting for the results of previous mapper callbacks.

The default concurrency is 4.

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

**interpose(interposeItem, [source](#sourceiterable))**

Inserts a specififed item between each of the items in an iterable.

```js
interpose(null, [1, 2, 3]); // 1, null, 2, null, 3
```

### asyncInterpose

**asyncInterpose(interposeItem, [source](#asyncsourceiterable))**

See [interpose](#interpose)

### map

**map(func, [source](#sourceiterable))**

The equivalent of the array "map" function.

```js
map(x => x * x, range(4)); // 0, 1, 4, 9
```

### asyncMap

**asyncMap(func, [source](#asyncsourceiterable))**

See [map](#map)

### asyncMapParallel

**asyncMapParallel(concurrency, func, [iterable](#asyncsourceiterable))**  
**asyncMapParallel(func, [iterable](#asyncsourceiterable))**

A variant of map with more complicated logic that can optimize when you have both an async mapper callback and an
async souce iterable. It starts fetching the next item in the source iterable while waiting for the async callback
to resolve. The optional concurrency paramater dictates how many items can be read ahead from the source iterable while
still waiting for the results of previous mapper callbacks.

The default concurrency is 4.

```js
await asyncMapParallel(asyncMapper, asyncIterable);
await asyncMapParallel(10, asyncMapper, asyncIterable);
```

### reverse

**reverse([source](#sourceiterable))**

Reverses an iterable. If the iterable is not an array, this requires caching the whole iterable in memory.

### asyncReverse

**asyncReverse([source](#asyncsourceiterable))**

See [reverse](#reverse)

Note: Unlike `reverse`, `asyncReverse` will always make a cache of the entire input, even if the input is an array. If this is not acceptable, ensure that you use `reverse` on arrays.

### slice

**slice(start, end, step, [source](#sourceiterable))**  
**slice(start, end, [source](#sourceiterable))**  
**slice(start, [source](#sourceiterable))**  
**slice({ start, end, step }, [source](#sourceiterable))**

It returns an iterable that returns a slice of an iterable.

```js
slice(3, range(10)); // 0, 1, 2
slice({ start: 2 }, range(10)); // 2, 3, 4, 5, 6, 7, 8, 9
slice({ start: 2, end: 6 }, range(10)); // 2, 3, 4, 5
slice({ start: 2, end: 6, step: 2 }, range(10)); // 2, 4
```

`start` and `end` can also be negative. When they are, they refer to offsets from the end of the iterable, as they do in `Array.prototype.slice`. Note: working with negative indicies does force slice to buffer items while it looks for the end of the iterable. It will do this as efficiently as it can, but for this reason it is not a good idea to use really large negative indexes.

When no arguments are passed to `slice` it is functionally equivalent to `wrap`.

### asyncSlice

**asyncSlice(start, end, step, [source](#asyncsourceiterable))**  
**asyncSlice(start, end, [source](#asyncsourceiterable))**  
**asyncSlice(start, [source](#asyncsourceiterable))**  
**asyncSlice({ start, end, step }, [source](#asyncsourceiterable))**

See [slice](#slice)

### takeSorted

**takeSorted(n, comparator, [source](#sourceiterable))**  
**takeSorted(n, [source](#sourceiterable))**  
**takeSorted(comparator, [source](#sourceiterable))**  
**takeSorted([source](#sourceiterable))**

Takes an iterable and returns n biggest items sorted from the smallest (the nth order statistic) to the biggest. The function is both space efficient (only stores n items) and fast O(m log n), given m as the total items yielded by the iterable. It uses a heap internally.

```js
takeSorted(3, [4, 5, 2, 3, 1]); // Iterable[1, 2, 3]
takeSorted([4, 5, 2, 3, 1]); // Iterable[1, 2, 3, 4, 5]
```

It can take as a optional comparator argument which has the same semantics as the one taken by `Array.prototype.sort`.

```js
takeSorted(3, (a, b) => b - a, [4, 5, 2, 3, 1]); // Iterable[5, 4, 3]
```

### asyncTakeSorted

**asyncTakeSorted(n, comparator, [source](#asyncsourceiterable))**  
**asyncTakeSorted(n, [source](#asyncsourceiterable))**  
**asyncTakeSorted(comparator, [source](#asyncsourceiterable))**  
**asyncTakeSorted([source](#asyncsourceiterable))**

See [takeSorted](#takesorted)

### takeWhile

**takeWhile(func, [source](#sourceiterable))**

It returns values as soon as the function is true. Then it stops.

```js
takeWhile(isEven, range(4)); // 0
```

### asyncTakeWhile

**asyncTakeWhile(func, [source](#asyncsourceiterable))**

See [takeWhile](#takewhile)

### tap

**tap(func, [source](#sourceiterable))**

Tap is not unlike a forEach method, and like forEach is usually used to express side effects. Without breaking a chain of composition, it allows you access to the value yielded to it. Tap always yields the same value it received. Tap can be curried.

```js
compose(
  tap(item => console.log(item)),
  filter(item => !!item),
)([0, 1, 2]); // logs "1", "2". returns Iterable[1, 2]
```

### asyncTap

**asyncTap(func, [source](#asyncsourceiterable))**

See [tap](#tap)

### window

**window(size, { filler }, [source](#sourceiterable))**  
**window(size, [source](#sourceiterable))**

For every item in source, yields a window iterable of size **size** which starts with that item and also contains the next items from source. When there are not enough additional items in source to fill the window, the filler value (default: `undefined`) will be used in place of the missing values.

```js
window(3, [1, 2, 3, 4, 5]); // [undefined, undefined, 1] [undefined, 1, 2] [1, 2, 3] [2, 3, 4] [3, 4, 5]
```

The option **filler** allows to specify a different value instead of undefined.

```js
window(3, { filler: 0 }, [1, 2, 3, 4, 5]); // [0, 0, 1] [0, 1, 2] [1, 2, 3] [2, 3, 4] [3, 4, 5]
```

**size** can also be specified as a named option.

```js
window({ size: 3 });
```

### asyncWindow

**asyncWindow(size, { filler }, [source](#asyncsourceiterable))**  
**asyncWindow(size, [source](#asyncsourceiterable))**

See [window](#window)

### trailingWindow

**trailingWindow(size, { filler }, [source](#sourceiterable))**  
**trailingWindow(size, [source](#sourceiterable))**

For every item in source, yields a window iterable of size **size** which contains the items leading up to and including that item. When there are not enough prior items to fill the window, the filler value ( default: `undefined`) will be used in place of the missing values.

```js
trailingWindow(3, [1, 2, 3, 4, 5]); // [undefined, undefined, 1] [undefined, 1, 2] [1, 2, 3] [2, 3, 4] [3, 4, 5]
```

The option **filler** allows to specify a different value instead of undefined.

```js
trailingWindow(3, { filler: 0 }, [1, 2, 3, 4, 5]); // [0, 0, 1] [0, 1, 2] [1, 2, 3] [2, 3, 4] [3, 4, 5]
```

Size can also be specified as a named option.

```js
trailingWindow({ size: 3 });
```

### asyncTrailingWindow

**asyncTrailingWindow(size, { filler }, [source](#asyncsourceiterable))**  
**asyncTrailingWindow(size, [source](#asyncsourceiterable))**

See [trailingWindow](#trailingwindow)

### wrap

**wrap(source)**

Yields the items in its source iterable. Its main purposes include allowing potentially null iterables to be treated as non-null iterables, and to give non-iter-tools iterables iter-tools iterable semantics.

```js
const maybeIterable = Math.random() > 0.5 ? [1, 2, 3] : null;

[...wrap(maybeIterable)]; // [1, 2, 3] OR []
```

Async notes:

- Turns sync iterables into async iterables.
- Ensures async next queueing semantics

### asyncWrap

**asyncWrap(source)**

See [wrap](#wrap)

Turns sync iterables into async iterables. Ensures async next queueing semantics.


## Separate an iterable into multiple iterables

### group

**group(iterable)**

Eqivalent to `groupBy(_ => _)`.

```js
group([1, 1, 1, 1, -1, -1, -1, 4]);
// It will return:
// 1, subiterator (1, 1, 1, 1)
// -1, subiterator (-1, -1, -1)
// 4, subiterator (4)
```

### asyncGroup

See [group](#group)

### groupBy

**groupBy(getKey, [source](#sourceiterable))**

On each iteration it returns a key and a sub-iterable of items with that key.
You can pass a function that returns a key, if you pass null or undefined an identity function will be used.
When you iterate over the next group, the previous sub-iterable items will not be available anymore.
Note: it groups **adjecents** items returning the same key.

```js
groupBy(
  value => {
    value * value;
  },
  [1, 1, 1, 1, -1, -1, -1, 4],
);
// It will return:
// 1, subiterator (1, 1, 1, 1, -1, -1, -1)
// 16, subiterator (4)
```

### asyncGroupBy

**asyncGroupBy(getKey, [source](#asyncsourceiterable))**

See [groupBy](#groupby)

### split

**split(source)**

It yields each item in its source iterable as an iterable of one item.

```js
split([1, 2, 3]); // Iterable[Iterable[1], Iterable[2], Iterable[3]]
```

### asyncSplit

**asyncSplit(source)**

See [split](#split)

### splitAt

**splitAt(index, [source](#sourceiterable))**

It returns an iterable containing 2 slices of the input iterable. The first spans from the beginning to the chosen position. The second from the chosen position to the end.

```js
const [firstThree, others] = splitAt(3, range(100));
Array.from(firstThree); // [0, 1, 2]
Array.from(others); // [3, 4, 5, 6, 7, 8, 9]
```

Memory-wise, the two iterables try to be as conservative as possible. But you have to take into consideration that consuming the second iterable without having consumed the first will keep the content of the first iterable in memory.

### asyncSplitAt

**asyncSplitAt(index, [source](#asyncsourceiterable))**

See [splitAt](#splitat)

### splitOn

**splitOn(value, [source](#sourceiterable))**

Splits an iterable into multiple subsequences, generating a new subsequence each time it encounters the specified item.

```js
splitOn(null, [1, null, 2, null, 3]); // Iterable[[1], [2], [3]]
```

### asyncSplitOn

**asyncSplitOn(value, [source](#asyncsourceiterable))**

See [splitOn](#spliton)

### splitOnAny

**splitOnAny(values, [source](#sourceiterable))**

Splits an iterable into multiple subsequences, generating a new subsequence each time it encounters any one of the the specified items.

```js
splitOnAny([null, undefined], [1, null, 2, undefined, 3]); // Iterable[[1], [2], [3]]
```

### asyncSplitOnAny

**asyncSplitOnAny(values, [source](#asyncsourceiterable))**

See [splitOnAny](#splitonany)

### splitOnAnySubseq

**splitOnAnySubseq(subseqs, [source](#sourceiterable))**

Splits an iterable into multiple subsequences, generating a new subsequence each time it encounters any of the specified sequences of items. When a separator subsequence is matched, it consumes all the matched items, which may not then be used as part of any other separator subsequence.

```js
splitOnAnySubseq([['\r\n'], ['\n']], 'mixed\r\nline\nterminators'); // Iterable['mixed', 'line', 'terminators']
```

### asyncSplitOnAnySubseq

**asyncSplitOnAnySubseq(subseqs, [source](#asyncsourceiterable))**

See [splitOnAnySubseq](#splitonanysubseq)

### splitOnSubseq

**splitOnSubseq(subseq, [source](#sourceiterable))**

Splits an iterable into multiple subsequences, generating a new subsequence each time it encounters a sequence of specified items. When a separator subsequence is matched, it consumes all the matched items, which may not then be used as part of another separator subsequence.

```js
splitOnSubseq([0, 0], [1, 0, 0, 2, 0, 0, 3]); // Iterable[[1], [2], [3]]
```

### asyncSplitOnSubseq

**asyncSplitOnSubseq(subseq, [source](#asyncsourceiterable))**

See [splitOnSubseq](#splitonsubseq)

### splitWith

**splitWith(predicate, [source](#sourceiterable))**

Splits a sequence into multiple subsequences by running a predicate function against each item in the original. The splits occur where the predicate returns a truthy value, and the items which match the predicate will not be in any of the output subsequences.

You may also specify a regex predicate, in which case the behavior will match `str.split(RegExp)`.

```js
splitWith(x => x == null, [1, null, 2, undefined, 3]); // Iterable[Iterable[1], Iterable[2], Iterable[3]]
```

### asyncSplitWith

**asyncSplitWith(predicate, [source](#asyncsourceiterable))**

See [splitWith](#splitwith)


## Combine multiple iterables

### collate

**collate(start, step, ...[sources](#sourceiterable))**  
**collate(comparator, ...[sources](#sourceiterable))**  
**collate({ start, step }, ...[sources](#sourceiterable))**

Collate takes multiple iterables and collates them in a single one. The manner or collation can be chosen by specifying either a number or a comparator function.

If a comparator function is specified, collate will compare the items available at the head of each iterable and pick the one which would be sorted to the lowest index. The comparator `(a, b) => { return -1 }` would indicate that a is always preferable to b. This is the same behavior comparators have when used in `Array.prototype.sort`.

If a number `n` is specified, collate will do a round-robin collation. This type of collation is parameterized on `start` and `step`. `collate` will first take from the `start` iterable, and will, next take from the `start + step` iterable, wrapping around back to the beginning if there are not that many iterables.

If no parameter is given the default is a round robin collation with a `start` of 0 and a `step` of one.

```js
collate([1, 3, 5], [2, 4, 6]); // 1, 2, 3, 4, 5, 6
collate(2, [1, 4], [3, 6], [2, 5]); // 1, 2, 3, 4, 5, 6
collate({ start: 1, step: 1 }, [2, 4, 6], [1, 3, 5]); // 1, 2, 3, 4, 5, 6
collate((a, b) => a - b, [1, 2, 5, 6], [3, 4]); // 1, 2, 3, 4, 5, 6
```

You can also curry it:

```js
collate((a, b) => a - b)([[1, 2, 5, 6], [3, 4]]); // 1, 2, 3, 4, 5, 6
```

### asyncCollate

**asyncCollate(start, step, ...[sources](#asyncsourceiterable))**  
**asyncCollate(comparator, ...[sources](#asyncsourceiterable))**  
**asyncCollate({ start, step }, ...[sources](#asyncsourceiterable))**

See [collate](#collate)

Note: The `asyncCollate` comparator function must be synchronous, i.e. it must not return a Promise.

### compress

**compress(source, compress)**

This returns an iterable omitting items when the second iterable, at the same index, contains a falsy value.

```js
compress(range(5), [0, 0, 1, 1]); // 2, 3
```

### asyncCompress

**asyncCompress(source, compress)**

See [compress](#compress)

### concat

**concat(...sources)**

It chains multiple iterables in a single one.

```js
chain([3, 5, 6], [1, 1], [10]); // 3, 5, 6, 1, 1, 10
```

### asyncConcat

**asyncConcat(...sources)**

See [concat](#concat)

### interleave

**interleave(generatorFn, options, ...[sources](#sourceiterable))**  
**interleave(generatorFn, ...[sources](#sourceiterable))**

Allows you to interleave items from multiple source iterables in a manner of your choosing. The inputs to interleave are a function we'll call `generateInterleaved` and some source iterables to be interleaved. `interleave` will transform each source iterable into an instance of a buffer, which you can use to inspect the current state of the sources and decide which value to emit.

The buffers are instances of an internal class called `InterleaveBuffer`, which has the following interface:

```ts
class InterleaveBuffer<T> {
  // The index of the current buffered item in the source
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

`generateInterleaved` also receives an additional first argument, `canTakeAny()` which returns true if there is any buffer which `canTake()`.

Finally, when generateInterleaved has finished it will clean up any source iterables which were not fully consumed.

Here is what an expected usage might look like:

```js
interleave(
  function*(canTakeAny, a, b) {
    while (canTakeAny()) {
      if (a.canTake()) yield a.take();
      if (a.canTake()) yield a.take();
      if (b.canTake()) yield b.take();
      if (b.canTake()) yield b.take();
    }
  },
  [1, 2, 5, 6],
  [3, 4, 7],
); // [1, 2, 3, 4, 5, 6, 7]
```

There is also an overload of `interleave` which allows you to pass an `options` argument to `generateInterleaved`. This allows you to create interleaves which are parameterized, like so:

```js
const roundRobin = interleave(function*(options, canTakeAny, ...buffers) {
  let i = options.start || 0;
  while (canTakeAny()) {
    yield buffers[i];
    i = (i + 1) % buffers.length;
  }
});

roundRobin({ start: 1 }, [2, 4, 6], [1, 3, 5]); // [1, 2, 3, 4, 5, 6]
```

```js
const aabbInterleave = asyncInterleave(async function*(canTakeAny, a, b) {
  while (await canTakeAny()) {
    if (await a.canTake()) yield await a.take();
    if (await a.canTake()) yield await a.take();
    if (await b.canTake()) yield await b.take();
    if (await b.canTake()) yield await b.take();
  }
});
```

### asyncInterleave

**asyncInterleave(generatorFn, options, ...[sources](#asyncsourceiterable))**  
**asyncInterleave(generatorFn, ...[sources](#asyncsourceiterable))**

See [interleave](#interleave)

### asyncInterleaveReady

**asyncInterleaveReady([sources](#asyncsourceiterable))**

This method takes multiple async iterables, and yields items from each of them in the order that that their item promises resolve.

```js
asyncInterleaveReady(aItems, bItems);
```

### join

**join([source](#sourceiterable))**

It expects to receive an iterable of iterables to be joined, then yields all items of each joined iterable. It is the inverse of `split`.

```js
join([[1], [2], [3]]); // Iterable[1, 2, 3]
```

### asyncJoin

**asyncJoin([source](#asyncsourceiterable))**

See [join](#join)

### joinAsStringWith

**joinAsStringWith(separator, [strings](#sourceiterable))**

It expects to receive an iterable of strings to be joined, and a separator string. It concatenates each string with the separator in between.

```js
joinAsStringWith(' ', ['a', 'b', 'c']); // "a b c"
```

Note that the method technically is working with iterables of characters, which usually means strings but could also be another kind of iterable. E.g.

```js
joinAsStringWith(' ', [['a'], ['b'], ['c']]); // "a b c"
```

### asyncJoinAsStringWith

**asyncJoinAsStringWith(separator, [strings](#asyncsourceiterable))**

See [joinAsStringWith](#joinasstringwith)

### joinWith

**joinWith(with_, [source](#sourceiterable))**

It expects to receive an iterable of iterables to be joined, and a separator item. It yields all items of each joined iterable, with the separator in between. It is the inverse of `splitWith`.

```js
joinWith(null, [[1], [2], [3]]); // Iterable[1, null, 2, null, 3]
```

### asyncJoinWith

**asyncJoinWith(with_, [source](#asyncsourceiterable))**

See [joinWith](#joinwith)

### joinWithSubseq

**joinWithSubseq(with_, [source](#sourceiterable))**

It expects to receive an iterable of iterables to be joined, and a separator subsequence. It yields all items of each joined iterable, with the items of the separator in between. It is the inverse of `splitWithSubseq`.

```js
joinWithSubseq([null, null], [[1], [2], [3]]); // Iterable[1, null, null, 2, null, null, 3]
```

### asyncJoinWithSubseq

**asyncJoinWithSubseq(with_, [source](#asyncsourceiterable))**

See [joinWithSubseq](#joinwithsubseq)

### zip

**zip(...[sources](#sourceiterable))**

Zip receives 2 or more iterables. It returns an iterable of entries, each of which contains one item from each of the input iterables. The iteration stops when the shortest input iterable is exausted.

```js
zip([1, 2], [3, 4], [5, 6, 7]); // [1, 3, 5], [2, 4, 6]
```

### asyncZip

**asyncZip(...[sources](#asyncsourceiterable))**

See [zip](#zip)

### zipAll

**zipAll({ filler }, ...[sources](#sourceiterable))**  
**zipAll(...[sources](#sourceiterable))**

ZipAll receives 2 or more iterables. It returns an iterable of entries, each of which contains one item from each of the input iterables. The iteration stops when the longest iterable is exausted. If an iterable is exhausted, it is returning undefined, or the value specified in the `filler` option. Note that filler cannot be specified as a positional argument.

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

It returns true if all provided iterables are equal to each other. Only compares items. Compares items with `===`.

```js
equals([1, 2, 3], [1, 2, 3], [1, 2, 3]); // true
```

### asyncEqual

**asyncEqual(...[iterables](#asyncsourceiterable))**

See [equal](#equal)

### every

**every(func, [iterable](#sourceiterable))**

It returns true if the predicate returns true for every item in the iterable.

```js
every(n => n % 2 === 0, [1, 2, 3]); // returns false
every(n => n % 2 === 0, [2, 4, 6]); // returns true
```

### asyncEvery

**asyncEvery(func, [iterable](#asyncsourceiterable))**

See [every](#every)

### find

**find(func, [iterable](#sourceiterable))**

The equivalent of the array "find" function. Takes a **predicate** and returns the first item from the iterable for which the predicate returns true.

```js
find(animal => animal.kind === 'dog', [{ type: 'cat' }, { type: 'dog' }]); // {type: 'dog'}
```

### asyncFind

**asyncFind(func, [iterable](#asyncsourceiterable))**

See [find](#find)

### findOr

**findOr(notFoundValue, func, [iterable](#sourceiterable))**

Like [find](#find), but also takes a **notFoundValue** which it will return if the source is empty or if **predicate** does not match any items from the source.

```js
findOr(0, x => x > 10, [1, 2, 3]); // 0
```

### asyncFindOr

**asyncFindOr(notFoundValue, func, [iterable](#asyncsourceiterable))**

See [findOr](#findor)

### first

**first(iterable)**

It returns the first item from an iterable, or undefined if there are no items.

```js
first([1, 2, 3]); // 1
first([]); // undefined
```

### asyncFirst

**asyncFirst(iterable)**

See [first](#first)

### firstOr

**firstOr(whenEmpty, [iterable](#sourceiterable))**

It returns the first item from an iterable, or a default value if the iterable is empty.

```js
firstOr(0, [1, 2, 3]); // 1
firstOr(0, []); // 0
```

### asyncFirstOr

**asyncFirstOr(whenEmpty, [iterable](#asyncsourceiterable))**

See [firstOr](#firstor)

### includes

**includes(value, [iterable](#sourceiterable))**

It returns whether an iterable's includes the specified item. Compares with `===`.

```js
includes(2, [1, 2, 3]); // true
```

### asyncIncludes

**asyncIncludes(value, [iterable](#asyncsourceiterable))**

See [includes](#includes)

### includesAny

**includesAny(value, [iterable](#sourceiterable))**

It returns whether an iterable's includes any of the specified items. Compares with `===`.

```js
includesAny([0, 2], [1, 2, 3]); // true
```

### asyncIncludesAny

**asyncIncludesAny(value, [iterable](#asyncsourceiterable))**

See [includesAny](#includesany)

### includesAnySubseq

**includesAnySubseq(value, [iterable](#sourceiterable))**

It returns whether an iterable's includes any of the specified subsequences. Compares with `===`.

```js
includesAnySubseq([[2, 3], [3, 4]], [1, 2, 3]); // true
```

### asyncIncludesAnySubseq

**asyncIncludesAnySubseq(value, [iterable](#asyncsourceiterable))**

See [includesAnySubseq](#includesanysubseq)

### includesSubseq

**includesSubseq(value, [iterable](#sourceiterable))**

It returns whether an iterable's includes the specified subsequence. Compares with `===`.

```js
includesSubseq([2, 3], [1, 2, 3]); // true
```

### asyncIncludesSubseq

**asyncIncludesSubseq(value, [iterable](#asyncsourceiterable))**

See [includesSubseq](#includessubseq)

### isEmpty

**isEmpty(iterable)**

Returns true if the input iterable contains no items.

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

**isSorted(comparator, [iterable](#sourceiterable))**  
**isSorted([iterable](#sourceiterable))**

Returns true if the items in the iterable are sorted according to an optional comparator.

```js
isSorted([1, 2, 3]); // true
isSorted((a, b) => b - a, [3, 2, 1]); // true
```

### asyncIsSorted

**asyncIsSorted(comparator, [iterable](#asyncsourceiterable))**  
**asyncIsSorted([iterable](#asyncsourceiterable))**

See [isSorted](#issorted)

### last

**last(iterable)**

Returns the last item in an iterable, or undefined if there are no items. If the iterable is not an array, this requires traversing the whole iterable.

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

Returns the last item in an iterable, or a default value if the iterable is empty. If the iterable is not an array, this requires traversing the whole iterable.

```js
lastOr(0, [1, 2, 3]); // 3
lastOr(0, []); // 0
```

### asyncLastOr

**asyncLastOr(whenEmpty, [iterable](#asyncsourceiterable))**

See [lastOr](#last-or)

Note: Unlike `lastOr`, `asyncLastOr` will always traverse the entire input iterable, even if it is an array. If this is not acceptable, ensure that you use `lastOr` on arrays.

### reduce

**reduce(initial, func, [iterable](#sourceiterable))**  
**reduce(func, [iterable](#sourceiterable))**

This is an implementation of the reduce that consumes an iterable instead of an array (have a look at Array.prototype.reduce).
It takes as arguments an initial value (optional), a function, and an iterable.
If an initial value is not specified, the first item is used as the initial value

```js
reduce(0, (acc, v) => (acc += v), range(4)); // 6
reduce((acc, v) => (acc += v), range(4)); // 6
```

### asyncReduce

**asyncReduce(initial, func, [iterable](#asyncsourceiterable))**  
**asyncReduce(func, [iterable](#asyncsourceiterable))**

See [reduce](#reduce)

### size

**size(iterable)**

Returns the number of values yielded by an iterable.

```js
size([1, 2, 3]); // 3
```

### asyncSize

**asyncSize(iterable)**

See [size](#size)

### some

**some(func, [iterable](#sourceiterable))**

It returns true if running the function, at least one item returns true (can be curried).

```js
some(n => n % 2 === 0, [1, 2, 3]); // returns true
some(n => n % 2 === 0, [1, 3, 7]); // returns false
```

### asyncSome

**asyncSome(func, [iterable](#asyncsourceiterable))**

See [some](#some)

### startsWith

**startsWith(value, [iterable](#sourceiterable))**

It returns whether an iterable's first item is the specified item. Compares with `===`.

```js
startsWith(1, [1, 2, 3]); // true
```

### asyncStartsWith

**asyncStartsWith(value, [iterable](#asyncsourceiterable))**

See [startsWith](#startswith)

### startsWithAny

**startsWithAny(value, [iterable](#sourceiterable))**

It returns whether an iterable's first item is any of the specified items. Compares with `===`.

```js
startsWithAny([0, 1], [1, 2, 3]); // true
```

### asyncStartsWithAny

**asyncStartsWithAny(value, [iterable](#asyncsourceiterable))**

See [startsWithAny](#startswithany)

### startsWithAnySubseq

**startsWithAnySubseq(value, [iterable](#sourceiterable))**

It returns whether an iterable starts with any of the specified subseqences. Compares with `===`.

```js
startsWithAnySubseq([[0, 1], [1, 2]], [1, 2, 3]); // true
```

### asyncStartsWithAnySubseq

**asyncStartsWithAnySubseq(value, [iterable](#asyncsourceiterable))**

See [startsWithAnySubseq](#startswithanysubseq)

### startsWithSubseq

**startsWithSubseq(value, [iterable](#sourceiterable))**

It returns whether an iterable starts with any of the specified subseqences. Compares with `===`.

```js
startsWithAny([1, 2], [1, 2, 3]); // true
```

### asyncStartsWithSubseq

**asyncStartsWithSubseq(value, [iterable](#asyncsourceiterable))**

See [startsWithSubseq](#startswithsubseq)


## Work with Regular Expressions

### regexpExec

**regexpExec(str, re)**

It runs a regular expression on a string. Every iteration returns a new match. You should use a "global" regular expression to return multiple matches. The returned object type is the same one returned by the "RegExp.prototype.exec" method (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec).

- [0] the full string matching the reg exp
- [1] ... [n] the matching groups
- index: the 0 based index of the match
- input: the original string

```js
const iter = regexpExec(/[0-9]{4}/g, '10/2/2013, 03/03/2015 12/4/1997');
for (let [match] of iter) {
  console.log(match); // '2013', '2015', '1997'
}
```

Notes:

- Global regular expressions are mutable; you can't reuse the same object more than once
- The destructuring expression [match] extracts only the first match


## Combinatory iterables

### combinations

**combinations(r, [iterable](#sourceiterable))**  
**combinations([iterable](#sourceiterable))**

It returns combinations of length n of an iterable. n defaults to the length of the iterable.

```js
combinations(range(2)); // [0, 1]
combinations(2, [1, 2, 3, 4]);
// returns:
// [ 1, 2 ],
// [ 1, 3 ],
// [ 1, 4 ],
// [ 2, 3 ],
// [ 2, 4 ],
// [ 3, 4 ]
```

The number of items that will be yielded is accessable through a `size` property.
Note that the actual combinations are not computed in the example below

```js
combinations([1, 2, 3, 4], 2).size === 6;
```

### combinationsWithReplacement

**combinationsWithReplacement(r, [iterable](#sourceiterable))**  
**combinationsWithReplacement([iterable](#sourceiterable))**

It returns combinations with replacement of length n of an iterable. n defaults to the length of the iterable.

```js
combinationsWithReplacement(range(2)); // [0, 0] [0, 1] [1, 1]
combinationsWithReplacement(2, [1, 2, 3, 4]);
// returns:
// [ 1, 1 ],
// [ 1, 2 ],
// [ 1, 3 ],
// [ 1, 4 ],
// [ 2, 2 ],
// [ 2, 3 ],
// [ 2, 4 ],
// [ 3, 3 ],
// [ 3, 4 ],
// [ 4, 4 ]
```

The number of items that will be yielded is accessable through a `size` property.
Note that the actual combinations are not computed in the example below

```js
combinationsWithReplacement([1, 2, 3, 4], 2).size === 10;
```

### permutations

**permutations(k, [iterable](#sourceiterable))**  
**permutations([iterable](#sourceiterable))**

It returns permutations of length n of an iterable. n defaults to the length of the iterable.

```js
permutations(range(2)); // [0, 1] [1, 0]
permutations(2, [1, 2, 3, 4]);
// returns:
// [ 1, 2 ],
// [ 1, 3 ],
// [ 1, 4 ],
// [ 2, 1 ],
// [ 2, 3 ],
// [ 2, 4 ],
// [ 3, 1 ],
// [ 3, 2 ],
// [ 3, 4 ],
// [ 4, 1 ],
// [ 4, 2 ],
// [ 4, 3 ]
```

The number of items that will be yielded is accessable through a `size` property.
Note that the actual combinations are not computed in the example below

```js
permutations(range(2)).size === 2;
```

### product

**product(...args)**

This returns the cartesian product of 2 or more iterables. It is equivalent to a nested loop for every iterable.

```js
product([1, 2], [3, 4], [5, 6]);
// returns:
// [1, 3, 5],
// [1, 3, 6],
// [1, 4, 5],
// [1, 4, 6],
// [2, 3, 5],
// [2, 3, 6],
// [2, 4, 5],
// [2, 4, 6]

// You can use fork for multiplying the same iterable for itself.
product(...fork(2, range(2))); // [0, 0]  [0, 1]  [1, 0]  [1, 1]
```

The number of items that will be yielded is accessable through a `size` property.
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

**asyncThrottle(ms, [source](#asyncsourceiterable))**

Rate-limits its source iterable, ensuring that every item is yielded at an interval of at least n ms (it can be curried).

```js
asyncThrottle(10, iterable);
```


## Cache an iterable

### fork

**fork(n, [source](#sourceiterable))**  
**fork([source](#sourceiterable))**

Returns an iterable of `n` forks of `souce`, or an infinite iterable of forks if `n` is not specified. Each fork contains the same items as `source`, and can be consumed independently. This works even if `source` cannot itself be consumed more than once, for example because it is the return value of a generator function. Items are buffered until they have been consumed by all forks. Each fork can only be consumed once.

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

**arrayFrom([iterable](#sourceiterable))**

Aliases: `toArray`

Transform an iterable to an array. arrayFrom is implemented as `Array.from`. It is included for consistency since `Array.from` has no counterpart for use with async iterators.

```js
arrayFrom(slice(0, 3, range())); // [1, 2, 3]
arrayFrom(null); // []
```

### arrayFromAsync

**arrayFromAsync([iterable](#asyncsourceiterable))**

Aliases: `asyncToArray`

Transform an async iterable to an array.

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

apply is a convenience method. Its implementation is:

```js
(fn, args = []) => fn(...args);
```

`apply` has three main differences from `Function.prototype.apply`. It does not take a `thisArg`, the args to apply may be specified as an iterable, and if you do not pass the `args` iterable, the result is a partial application, not a no-args call to `fn`.

### call

**call(fn, ...args)**

call is a convenience method. Its implementation is:

```js
(fn, ...args) => fn(...args);
```

`call` has only one difference from `Function.prototype.call`, which is that it does not take a `thisArg`.

### compose

**compose(...fns)**

This is a classic composition function that can be used to assemble multiple functions that take an iterable and return an iterable.

```js
const iter = compose(
  map(x => x + 3),
  filter(x % 2 === 0),
);

iter([1, 2, 3, 4]); // 5, 7
```

Note: it works right to left, so the first transformation used is filter and the second is map.

### execPipe

**execPipe(value, ...fns)**

Allows you to run an iterable through several functions. The first argument is an iterable, the following are functions that takes an iterable and return an iterable.

```js
const iter = execPipe(
  [1, 2, 3, 4],
  filter((x % 2) === 0)
  map((x) =>  x + 3),
)

iter // 5, 7
```

The previous example is equivalent to the `compose` and `pipe` ones (note that execPipe\* works left to right like `pipe`).

### pipe

**pipe(...fns)**

This is a classic composition function that can be used to assemble multiple functions that take an iterable and return an iterable.

```js
const iter = pipe(
  filter(x % 2 === 0),
  map(x => x + 3),
);

iter([1, 2, 3, 4]); // 5, 7
```

Note: it is equivalent to _compose_ but it works left to right!

### when

**when(condition, value)**

when is a helper you can use with es6 spread syntax (the `...` operator). In particular it helps avoid an unnecessarily difficult to read pattern that frequently causes code formatters (prettier, specifically) to emit an undesireable number of lines:

```js
const always = true;
const sometimes = Math.random() > 0.5;

const arr = [always, ...(sometimes ? [sometimes] : [])]; // [true, true] OR [true]
```

Instead, you can use the when method like so:

```js
const whenArr = [always, ...when(sometimes, [sometimes])]; // [true, true] OR [true]
```

The pattern works equally well with objects.

```js
const whenObj = {
  always,
  ...when(sometimes, { sometimes }),
}; // { always: true } OR { always: true, somtimes: true }
```

Note that the empty result of spread is both an empty object and an empty iterable at the same time. This means that `[...when(false, null)]` and `{...when(false, null)}` are both valid (same for `undefined`).


