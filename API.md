# The iter-tools API
[![Documentation is automatically generated](https://img.shields.io/static/v1?label=docs&message=generated&color=informational)](https://github.com/iter-tools/iter-tools/blob/master/CONTRIBUTING.md#the-code-generator)

Create iterables

[cycle](#cycle) ([async](#async-cycle))   
[execute](#execute) ([async](#async-execute))   
[range](#range)  
[repeat](#repeat)  

Create iterables from objects

[entries](#entries)  
[keys](#keys)  
[values](#values)  

Transform a single iterable

[batch](#batch) ([async](#async-batch))   
[cursor](#cursor) ([async](#async-cursor))   
[dropWhile](#drop-while) ([async](#async-drop-while))   
[enumerate](#enumerate) ([async](#async-enumerate))   
[filter](#filter) ([async](#async-filter)) ([parallel-async](#async-filter-parallel))  
[flat](#flat) ([async](#async-flat))   
[flatMap](#flat-map) ([async](#async-flat-map)) ([parallel-async](#async-flat-map-parallel))  
[interpose](#interpose) ([async](#async-interpose))   
[map](#map) ([async](#async-map)) ([parallel-async](#async-map-parallel))  
[reverse](#reverse) ([async](#async-reverse))   
[slice](#slice) ([async](#async-slice))   
[takeWhile](#take-while) ([async](#async-take-while))   
[tap](#tap) ([async](#async-tap))   
[wrap](#wrap) ([async](#async-wrap))   

Separate an iterable into multiple iterables

[groupBy](#group-by) ([async](#async-group-by))   
[split](#split) ([async](#async-split))   
[splitAt](#split-at) ([async](#async-split-at))   
[splitOn](#split-on) ([async](#async-split-on))   
[splitOnAny](#split-on-any) ([async](#async-split-on-any))   
[splitOnAnySubseq](#split-on-any-subseq) ([async](#async-split-on-any-subseq))   
[splitOnSubseq](#split-on-subseq) ([async](#async-split-on-subseq))   
[splitWith](#split-with) ([async](#async-split-with))   

Combine multiple iterables

[asyncInterleaveReady](#async-interleave-ready)  
[collate](#collate) ([async](#async-collate))   
[compress](#compress) ([async](#async-compress))   
[concat](#concat) ([async](#async-concat))   
[interleave](#interleave) ([async](#async-interleave))   
[join](#join) ([async](#async-join))   
[joinAsStringWith](#join-as-string-with) ([async](#async-join-as-string-with))   
[joinWith](#join-with) ([async](#async-join-with))   
[joinWithSubseq](#join-with-subseq) ([async](#async-join-with-subseq))   
[zip](#zip) ([async](#async-zip))   
[zipAll](#zip-all) ([async](#async-zip-all))   

Reduce an iterable to a single value

[equal](#equal) ([async](#async-equal))   
[every](#every) ([async](#async-every))   
[find](#find) ([async](#async-find))   
[first](#first) ([async](#async-first))   
[firstOr](#first-or) ([async](#async-first-or))   
[includes](#includes) ([async](#async-includes))   
[includesAny](#includes-any) ([async](#async-includes-any))   
[includesAnySubseq](#includes-any-subseq) ([async](#async-includes-any-subseq))   
[includesSubseq](#includes-subseq) ([async](#async-includes-subseq))   
[isEmpty](#is-empty) ([async](#async-is-empty))   
[isSorted](#is-sorted) ([async](#async-is-sorted))   
[reduce](#reduce) ([async](#async-reduce))   
[size](#size) ([async](#async-size))   
[some](#some) ([async](#async-some))   
[startsWith](#starts-with) ([async](#async-starts-with))   
[startsWithAny](#starts-with-any) ([async](#async-starts-with-any))   
[startsWithAnySubseq](#starts-with-any-subseq) ([async](#async-starts-with-any-subseq))   
[startsWithSubseq](#starts-with-subseq) ([async](#async-starts-with-subseq))   
[takeSorted](#take-sorted) ([async](#async-take-sorted))   

Work with Regular Expressions

[regexpExec](#regexp-exec)  

Combinatory iterables

[combinations](#combinations)  
[combinationsWithReplacement](#combinations-with-replacement)  
[permutations](#permutations)  
[product](#product)  

Control timing inside an async iterable

[asyncBuffer](#async-buffer)  
[asyncThrottle](#async-throttle)  

Cache an iterable

[fork](#fork) ([async](#async-fork))   

Consume an iterable

[consume](#consume) ([async](#async-consume))   
[toArray](#to-array) ([async](#async-to-array))   

Utilities

[apply](#apply)  
[call](#call)  
[compose](#compose)  
[execPipe](#exec-pipe)  
[pipe](#pipe)  
[when](#when)  


## Create iterables
### cycle
It cycles the same iterable forever.
```js
cycle(range(3)); // 0, 1, 2, 0, 1, 2, 0, 1, 2 ....
```

### asyncCycle
See [cycle](#cycle)

### execute
It returns an iterable that returns the output of a function at every iteration.
```js
execute(() => Math.round(Math.random() * 10) ); // 3, 5, 9 ...
```

### asyncExecute
See [execute](#execute)

### range
Create an iterable returning a sequence of numbers (the sequence can be infinite).
Overloads are: `range({start, step, end})`, `range(end)`, or `range(start, step, end)`.
```js
range(); // 0, 1, 2 ... Infinity

range({end: 3}); // 0, 1, 2
range({start: 3}); // 3, 4, 5 ... Infinity
range({start: 3, end: 6}); // 3, 4, 5
range({start: 3, end: 10, step: 3}); // 3, 6, 9
range({start: 9, end: 3, step: -3}); // 9, 6

range(3); // 0, 1, 2
range(3, 6); // 3, 4, 5
range(3, 10, 3); // 3, 6, 9
```

### repeat
Create an iterable that returns the same value n times
```js
repeat('x', 3); // 'x', 'x', 'x'
repeat('x'); // 'x', 'x', 'x' .... forever
```


## Create iterables from objects
### entries
Takes in a plain object, null, a Map, or any other object which defines an `entries` method.
When given an Object, it is equivalent to Object.entries, otherwise it calls `entries()`
When passed a nullish value, returns an empty iterable.

`entries` is a great way to construct Maps from objects

```js
const obj = {foo: 'bar', fox: 'far'}
const map = new Map(entries(obj))

Array.from(entries(obj)) // [['foo': 'bar'], 'fox': 'far']]
deepEqual(Array.from(entries(map)), entries(obj)) // true
```

### keys
Takes in a plain object, null, a Map, or any other object which defines an `keys` method.
When given an Object, it is equivalent to Object.keys, otherwise it calls `keys()`
When passed a nullish value, returns an empty iterable.

```js
const obj = {foo: 'bar', fox: 'far'}
const map = new Map(entries(obj))

Array.from(keys(obj)) // ['foo', 'fox'];
deepEqual(Array.from(keys(map)), keys(obj)) // true
```

### values
Takes in a plain object, null, a Map, or any other object which defines an `values` method.
When given an Object, it is equivalent to Object.values, otherwise it calls `values()`
When passed a nullish value, returns an empty iterable.

```js
const obj = {foo: 'bar', fox: 'far'}
const map = new Map(entries(obj))

Array.from(values(obj)) // ['bar', 'far']
deepEqual(Array.from(values(map)), values(obj)) // true
```


## Transform a single iterable
### batch
Takes a number and an iterable and returns an iterable divided into batches
```js
batch(2, range(5)); // [0, 1], [2, 3], [4]
```

### asyncBatch
See [batch](#batch)

### cursor
It returns every item of the sequence and its n preceding items (or succeeding items). It takes as arguments the window **size** and **trailing** option (default false). When trailing is false every iteration returns an item and its preceding items, when trailing true every iteration returns an item and its succeeding items.
```js
cursor({ size: 3 }, [1, 2, 3, 4, 5]); // [undefined, undefined, 1] [undefined, 1, 2] [1, 2, 3] [2, 3, 4] [3, 4, 5]

cursor({ size: 3, trailing: true }, [1, 2, 3, 4, 5]); // [1, 2, 3] [2, 3, 4] [3, 4, 5] [4, 5, undefined] [5, undefined, undefined]
```
The option **filler** allows to specify a different value instead of undefined.
```js
cursor({ size: 3, filler: 0 }, [1, 2, 3, 4, 5]); // [0, 0, 1] [0, 1, 2] [1, 2, 3] [2, 3, 4] [3, 4, 5]
```

### asyncCursor
See [cursor](#cursor)

### dropWhile
It starts returning values when the function is false. Then it keeps going until the iterable is exausted.
```js
dropWhile(isEven, range(4)); // 1, 2, 3
```

### asyncDropWhile
See [dropWhile](#drop-while)

### enumerate
It is a shorthand for zipping an index to an iterable:
```js
enumerate(repeat('x')); // [0, 'x'] [1, 'x'] [2, 'x'] ...
```

### asyncEnumerate
See [enumerate](#enumerate)

### filter
The equivalent of the array "filter" function.
```js
filter(isEven, range(4)); // 0, 2
await asyncFilter(animal => animal.kind.slice(1) === 'at', [
  {type: 'cat'},
  {type: 'rat'},
  {type: 'dog'},
]) // [{type: 'cat'}, {type: 'rat'}]
```

### asyncFilter
See [filter](#filter)

### asyncFilterParallel
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
It flattens an iterable. You can specify the maximum depth as first argument (default 1). ```0``` means "no flatten", ```Infinity``` means "deep flatten".
```js
flat([1, [2, 3], [4, [5, 6]]]); // 1, 2, 3, 4, [5, 6]
flat(2, [1, [2, 3], [4, [5, 6]]]); // 1, 2, 3, 4, 5, 6
```
The algorithm takes into consideration every item that is iterable, except strings.
Alternatively, you can pass a function that takes the current item and returns true if the item is a sequence which can be flattened.
```js
const isString = item => typeof item === 'string' && item.length > 1

flat(isString, Infinity, ['hel', ['lo', ''], ['world']]); // h e l l o w o r l d
```

Finally for maximum readability you can specify flat's options as an object, like so:
```js
flat({ shouldFlat: isString, depth: Infinity }, ['hel', ['lo', ''], ['world']]); // h e l l o w o r l d
```

### asyncFlat
See [flat](#flat)

### flatMap
It maps value of an iterable and flatten them.
```js
flatMap(x => [x, x * x], range(4)); // 0, 0, 1, 1, 2, 4, 3, 9
```

### asyncFlatMap
See [flatMap](#flat-map)

### asyncFlatMapParallel
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
const item = await asyncWrap([1, 2, 3])[Symbol.asyncIterator]().next()
item.value; // 1
```

### interpose
Inserts a specififed item between each of the items in an iterable.
```js
interpose(null, [1, 2, 3]) // 1, null, 2, null, 3
```

### asyncInterpose
See [interpose](#interpose)

### map
The equivalent of the array "map" function.
```js
map(x => x * x, range(4)); // 0, 1, 4, 9
```

### asyncMap
See [map](#map)

### asyncMapParallel
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
Reverses an iterable. If the iterable is not an array, this requires caching the whole iterable in memory.

### asyncReverse
See [reverse](#reverse)

Note: Unlike `reverse`, `asyncReverse` will always make a cache of the entire input, even if the input is an array. If this is not acceptable, ensure that you use `reverse` on arrays.

### slice
It returns an iterable that returns a slice of an iterable.
```js
slice(3, range(10)); // 0, 1, 2
slice({start: 2}, range(10)); // 2, 3, 4, 5, 6, 7, 8, 9
slice({start: 2, end: 6}, range(10)); // 2, 3, 4, 5
slice({start: 2, end: 6, step: 2}, range(10)); // 2, 4
```
"Start" and "end" can also be negative. They work like Array.prototype.slice. Note: working with negative indecies is less efficient and forces to buffer part of the sequence.

### asyncSlice
See [slice](#slice)

### takeWhile
It returns values as soon as the function is true. Then it stops.
```js
takeWhile(isEven, range(4)); // 0
```

### asyncTakeWhile
See [takeWhile](#take-while)

### tap
Tap is not unlike a forEach method, and like forEach is usually used to express side effects. Without breaking a chain of composition, it allows you access to the value yielded to it. Tap always yields the same value it received. Tap can be curried.
```js
compose(
  tap(item => console.log(item)),
  filter(item => !!item),
)([0, 1, 2]) // logs "1", "2". returns Iterable[1, 2]
```

### asyncTap
See [tap](#tap)

### wrap
Yields the items in its source iterable. Its main purposes include allowing potentially null iterables to be treated as non-null iterables, and to give non-iter-tools iterables iter-tools iterable semantics.
```js
const maybeIterable = Math.random() > 0.5 ? [1, 2, 3] : null;

[...wrap(maybeIterable)]; // [1, 2, 3] OR []
```

Async notes:
 -  Turns sync iterables into async iterables.
 -  Ensures async next queueing semantics

### asyncWrap
See [wrap](#wrap)

Turns sync iterables into async iterables. Ensures async next queueing semantics.


## Separate an iterable into multiple iterables
### groupBy
On each iteration it returns a key and a sub-iterable of items with that key.
You can pass a function that returns a key, if you pass null or undefined an identity function will be used.
When you iterate over the next group, the previous sub-iterable items will not be available anymore.
Note: it groups **adjecents** items returning the same key.
```js
groupBy(null, [1, 1, 1, 1, -1, -1, -1, 4]);
// It will return:
// 1, subiterator (1, 1, 1, 1)
// -1, subiterator (-1, -1, -1)
// 4, subiterator (4)

groupBy((value) => {value * value}, [1, 1, 1, 1, -1, -1, -1, 4]);
// It will return:
// 1, subiterator (1, 1, 1, 1, -1, -1, -1)
// 16, subiterator (4)
```

### asyncGroupBy
See [groupBy](#group-by)

### split
It yields each item in its source iterable as an iterable of one item.

```js
split([1, 2, 3]) // Iterable[Iterable[1], Iterable[2], Iterable[3]]
```

### asyncSplit
See [split](#split)

### splitAt
It returns an iterable containing 2 slices of the input iterable. The first spans from the beginning to the chosen position. The second from the chosen position to the end.
```js
const [firstThree, others] = splitAt(3, range(100))
Array.from(firstThree) // [0, 1, 2]
Array.from(others) // [3, 4, 5, 6, 7, 8, 9]
```
Memory-wise, the two iterables try to be as conservative as possible. But you have to take into consideration that consuming the second iterable without having consumed the first will keep the content of the first iterable in memory.

### asyncSplitAt
See [splitAt](#split-at)

### splitOn
Splits an iterable into multiple subsequences, generating a new subsequence each time it encounters the specified item.

```js
splitOn(null, [1, null, 2, null, 3]) // Iterable[[1], [2], [3]]
```

### asyncSplitOn
See [splitOn](#split-on)

### splitOnAny
Splits an iterable into multiple subsequences, generating a new subsequence each time it encounters any one of the the specified items.

```js
splitOnAny([null, undefined], [1, null, 2, undefined, 3]) // Iterable[[1], [2], [3]]
```

### asyncSplitOnAny
See [splitOnAny](#split-on-any)

### splitOnAnySubseq
Splits an iterable into multiple subsequences, generating a new subsequence each time it encounters any of the specified sequences of items. When a separator subsequence is matched, it consumes all the matched items, which may not then be used as part of any other separator subsequence.

```js
splitOnAnySubseq(
  [
    ['\r\n'],
    ['\n'],
  ],
  'mixed\r\nline\nterminators'
) // Iterable['mixed', 'line', 'terminators']
```

### asyncSplitOnAnySubseq
See [splitOnAnySubseq](#split-on-any-subseq)

### splitOnSubseq
Splits an iterable into multiple subsequences, generating a new subsequence each time it encounters a sequence of specified items. When a separator subsequence is matched, it consumes all the matched items, which may not then be used as part of another separator subsequence.

```js
splitOnSubseq([0, 0], [1, 0, 0, 2, 0, 0, 3]) // Iterable[[1], [2], [3]]
```

### asyncSplitOnSubseq
See [splitOnSubseq](#split-on-subseq)

### splitWith
Splits a sequence into multiple subsequences by running a predicate function against each item in the original. The splits occur where the predicate returns a truthy value, and the items which match the predicate will not be in any of the output subsequences.

You may also specify a regex predicate, in which case the behavior will match `str.split(RegExp)`.

```js
splitWith(
  x => x == null,
  [1, null, 2, undefined, 3]
) // Iterable[Iterable[1], Iterable[2], Iterable[3]]
```

### asyncSplitWith
See [splitWith](#split-with)


## Combine multiple iterables
### asyncInterleaveReady
This method takes multiple async iterables, and yields items from each of them in the order that that their item promises resolve.
```js
asyncInterleaveReady(aItems, bItems);
```

### collate
Collate takes multiple iterables and collates them in a single one. The manner or collation can be chosen by specifying either a number or a comparator function.

If a comparator function is specified, collate will compare the items available at the head of each iterable and pick the one which would be sorted to the lowest index. The comparator `(a, b) => { return -1 }` would indicate that a is always preferable to b. This is the same behavior comparators have when used in `Array.prototype.sort`.

If a number `n` is specified, collate will do a round-robin collation. This type of collation is parameterized on `start` and `step`. `collate` will first take from the `start` iterable, and will, next take from the `start + step` iterable, wrapping around back to the beginning if there are not that many iterables.

If no parameter is given the default is a round robin collation with a `start` of 0 and a `step` of one.
```js
collate([1, 3, 5], [2, 4, 6]) // 1, 2, 3, 4, 5, 6
collate(2, [1, 4], [3, 6], [2, 5]) // 1, 2, 3, 4, 5, 6
collate({ start: 1, step: 1 }, [2, 4, 6], [1, 3, 5]) // 1, 2, 3, 4, 5, 6
collate((a, b) => a - b, [1, 2, 5, 6], [3, 4]) // 1, 2, 3, 4, 5, 6
```
You can also curry it:
```js
collate((a, b) => a - b)([[1, 2, 5, 6], [3, 4]]) // 1, 2, 3, 4, 5, 6
```

### asyncCollate
See [collate](#collate)

Note: The `asyncCollate` comparator function must be synchronous, i.e. it must not return a Promise.

### compress
This returns an iterable omitting items when the second iterable, at the same index, contains a falsy value.
```js
compress(range(5), [0, 0, 1, 1]); // 2, 3
```

### asyncCompress
See [compress](#compress)

### concat
It chains multiple iterables in a single one.
```js
chain([3, 5, 6], [1, 1], [10]); // 3, 5, 6, 1, 1, 10
```

### asyncConcat
See [concat](#concat)

### interleave
Allows you to interleave items from multiple source iterables in a manner of your choosing. The inputs to interleave are a function we'll call `generateInterleaved` and some source iterables to be interleaved. `interleave` will transform each source iterable into an instance of a buffer, which you can use to inspect the current state of the sources and decide which value to emit.

The buffers are instances of an internal class called `InterleaveBuffer`, which has the following interface:
```ts
class InterleaveBuffer<T> {
  // The index of the current buffered item in the source
  index: number

  // The index of the source which this buffer represents
  bufferIndex: number

  // Returns the current buffered value
  peek(): T

  // Returns false if the source iterable is done
  // To be sure that your output is the same size as your combined inputs always call canTake before take.
  canTake(): boolean

  // Returns the current buffered value and buffers the next one.
  // Expected to be used with yield.
  take(): T
}
```
`generateInterleaved` also receives an additional first argument, `canTakeAny()` which returns true if there is any buffer which `canTake()`.

Finally, when generateInterleaved has finished it will clean up any source iterables which were not fully consumed.

Here is what an expected usage might look like:

```js
interleave(function* (canTakeAny, a, b) {
  while (canTakeAny()) {
    if (a.canTake()) yield a.take();
    if (a.canTake()) yield a.take();
    if (b.canTake()) yield b.take();
    if (b.canTake()) yield b.take();
  }
}, [1, 2, 5, 6], [3, 4, 7]) // [1, 2, 3, 4, 5, 6, 7]
```

There is also an overload of `interleave` which allows you to pass an `options` argument to `generateInterleaved`. This allows you to create interleaves which are parameterized, like so:
```js
const roundRobin = interleave(function* (options, canTakeAny, ...buffers) {
  let i = options.start || 0;
  while (canTakeAny()) {
    yield buffers[i];
    i = (i + 1) % buffers.length;
  }
})

roundRobin({ start: 1 }, [2, 4, 6], [1, 3, 5]) // [1, 2, 3, 4, 5, 6]
```

```js
const aabbInterleave = asyncInterleave(async function* (canTakeAny, a, b) {
  while (await canTakeAny()) {
    if (await a.canTake()) yield await a.take();
    if (await a.canTake()) yield await a.take();
    if (await b.canTake()) yield await b.take();
    if (await b.canTake()) yield await b.take();
  }
})
```

### asyncInterleave
See [interleave](#interleave)

### join
It expects to receive an iterable of iterables to be joined, then yields all items of each joined iterable. It is the inverse of `split`.

```js
join([[1], [2], [3]]) // Iterable[1, 2, 3]
```

### asyncJoin
See [join](#join)

### joinAsStringWith
It expects to receive an iterable of strings to be joined, and a separator string. It concatenates each string with the separator in between.

```js
joinAsStringWith(' ', ['a', 'b', 'c']) // "a b c"
```

Note that the method technically is working with iterables of characters, which usually means strings but could also be another kind of iterable. E.g.
```js
joinAsStringWith(' ', [['a'], ['b'], ['c']]) // "a b c"
```

### asyncJoinAsStringWith
See [joinAsStringWith](#join-as-string-with)

### joinWith
It expects to receive an iterable of iterables to be joined, and a separator item. It yields all items of each joined iterable, with the separator in between. It is the inverse of `splitWith`.

```js
joinWith(null, [[1], [2], [3]]) // Iterable[1, null, 2, null, 3]
```

### asyncJoinWith
See [joinWith](#join-with)

### joinWithSubseq
It expects to receive an iterable of iterables to be joined, and a separator subsequence. It yields all items of each joined iterable, with the items of the separator in between. It is the inverse of `splitWithSubseq`.

```js
joinWithSubseq([null, null], [[1], [2], [3]]) // Iterable[1, null, null, 2, null, null, 3]
```

### asyncJoinWithSubseq
See [joinWithSubseq](#join-with-subseq)

### zip
Zip receives 2 or more iterables. It returns an iterable of entries, each of which contains one item from each of the input iterables. The iteration stops when the shortest input iterable is exausted.

```js
zip([1, 2], [3, 4], [5, 6, 7]); // [1, 3, 5], [2, 4, 6]
```

### asyncZip
See [zip](#zip)

### zipAll
ZipAll receives 2 or more iterables. It returns an iterable of entries, each of which contains one item from each of the input iterables. The iteration stops when the longest iterable is exausted. If an iterable is exhausted, it is returning undefined, or the value specified in the `filler` option. Note that filler cannot be specified as a positional argument.

```js
zipAll([1, 2], [3, 4], [5, 6, 7]); // [1, 3, 5], [2, 4, 6], [undefined, undefined, 7]
zipAll({filler: null}, [1, 2], []); // [1, null], [2, null]
```

### asyncZipAll
See [zipAll](#zip-all)


## Reduce an iterable to a single value
### equal
It returns true if all provided iterables are equal to each other. Only compares items. Compares items with `===`.

```js
equals([1, 2, 3], [1, 2, 3], [1, 2, 3]) // true
```

### asyncEqual
See [equal](#equal)

### every
It returns true if the predicate returns true for every item in the iterable.
```js
every((n) => n % 2 === 0, [1, 2, 3]) // returns false
every((n) => n % 2 === 0, [2, 4, 6]) // returns true
```

### asyncEvery
See [every](#every)

### find
The equivalent of the array "find" function (it can be curried).
```js
find(animal => animal.kind === 'dog', [{type: 'cat'}, {type: 'dog'}]) // {type: 'dog'}
```

Find also takes an optional value to be returned if no value is found:
```js
find({type: 'pet'}, animal => animal.kind === 'dog', []) // {type: 'pet'}
```

### asyncFind
See [find](#find)

### first
It returns the first item from an iterable.
```js
first([1, 2, 3]) // 1
first([]) // undefined
```

### asyncFirst
See [first](#first)

### firstOr
It returns the first item from an iterable, or a default value if the iterable is empty.
```js
firstOr(0, [1, 2, 3]) // 1
firstOr(0, []) // 0
```

### asyncFirstOr
See [firstOr](#first-or)

### includes
It returns whether an iterable's includes the specified item. Compares with `===`.

```js
includes(2, [1, 2, 3]) // true
```

### asyncIncludes
See [includes](#includes)

### includesAny
It returns whether an iterable's includes any of the specified items. Compares with `===`.

```js
includesAny([0, 2], [1, 2, 3]) // true
```

### asyncIncludesAny
See [includesAny](#includes-any)

### includesAnySubseq
It returns whether an iterable's includes any of the specified subsequences. Compares with `===`.

```js
includesAnySubseq([[2, 3], [3, 4]], [1, 2, 3]) // true
```

### asyncIncludesAnySubseq
See [includesAnySubseq](#includes-any-subseq)

### includesSubseq
It returns whether an iterable's includes the specified subsequence. Compares with `===`.

```js
includesSubseq([2, 3], [1, 2, 3]) // true
```

### asyncIncludesSubseq
See [includesSubseq](#includes-subseq)

### isEmpty
Returns true if the input iterable contains no items.
```js
isEmpty([]) // true
isEmpty(null) // true
isEmpty(range(1)) // false
isEmpty([undefined]) // false
```

### asyncIsEmpty
See [isEmpty](#is-empty)

### isSorted
Returns true if the items in the iterable are sorted according to an optional comparator.

```js
isSorted([1, 2, 3]) // true
isSorted((a, b) => b - a, [3, 2, 1]) // true
```

### asyncIsSorted
See [isSorted](#is-sorted)

### reduce
This is an implementation of the reduce that consumes an iterable instead of an array (have a look at Array.prototype.reduce).
It takes as arguments an initial value (optional), a function, and an iterable.
If an initial value is not specified, the first item is used as the initial value
```js
reduce(0, (acc, v) => acc += v, range(4)); // 6
reduce((acc, v) => acc += v, range(4)); // 6
```

### asyncReduce
See [reduce](#reduce)

### size
Returns the number of values yielded by an iterable.
```js
size([1, 2, 3]) // 3
```

### asyncSize
See [size](#size)

### some
It returns true if running the function, at least one item returns true (can be curried).
```js
some((n) => n % 2 === 0, [1, 2, 3]) // returns true
some((n) => n % 2 === 0, [1, 3, 7]) // returns false
```

### asyncSome
See [some](#some)

### startsWith
It returns whether an iterable's first item is the specified item. Compares with `===`.

```js
startsWith(1, [1, 2, 3]) // true
```

### asyncStartsWith
See [startsWith](#starts-with)

### startsWithAny
It returns whether an iterable's first item is any of the specified items. Compares with `===`.

```js
startsWithAny([0, 1], [1, 2, 3]) // true
```

### asyncStartsWithAny
See [startsWithAny](#starts-with-any)

### startsWithAnySubseq
It returns whether an iterable starts with any of the specified subseqences. Compares with `===`.

```js
startsWithAnySubseq([[0, 1], [1, 2]], [1, 2, 3]) // true
```

### asyncStartsWithAnySubseq
See [startsWithAnySubseq](#starts-with-any-subseq)

### startsWithSubseq
It returns whether an iterable starts with any of the specified subseqences. Compares with `===`.

```js
startsWithAny([1, 2], [1, 2, 3]) // true
```

### asyncStartsWithSubseq
See [startsWithSubseq](#starts-with-subseq)

### takeSorted
Takes an iterable and returns n biggest items sorted from the smallest (the nth order statistic) to the biggest.
The function is both space efficient (only stores n items) and fast O(m log n), given m as the total items yielded by the iterable.
```js
takeSorted(3, [10, 4, 9, 2, 5, 8, 7]) // 5, 4, 2
```
It can take as a optional argument a comparator (just like Array.prototype.sort). The default one is:
```js
(a, b) => {
 if (a > b) {
    return 1
  } else if (a < b) {
    return -1
  } else {
    return 0
  }
}
```

### asyncTakeSorted
See [takeSorted](#take-sorted)


## Work with Regular Expressions
### regexpExec
It runs a regular expression on a string. Every iteration returns a new match. You should use a "global" regular expression to return multiple matches. The returned object type is the same one returned by the "RegExp.prototype.exec" method (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec).
* [0] the full string matching the reg exp
* [1] ... [n] the matching groups
* index: the 0 based index of the match
* input: the original string
```js
const iter = regexpExec(/[0-9]{4}/g, '10/2/2013, 03/03/2015 12/4/1997');
for (let [match] of iter) {
  console.log(match); // '2013', '2015', '1997'
}
```
Notes:
 -  Global regular expressions are mutable; you can't reuse the same object more than once
 -  The destructuring expression [match] extracts only the first match


## Combinatory iterables
### combinations
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
It buffers n items of an asyncIterable (it can be curried).
```js
asyncBuffer(10, iterable);
```

### asyncThrottle
Rate-limits its source iterable, ensuring that every item is yielded at an interval of at least n ms (it can be curried).
```js
asyncThrottle(10, iterable);
```


## Cache an iterable
### fork
fork returns an iterable that yields buffered proxies of the input iterable:
```js
const [proxy1, proxy2, proxy3] = fork(originalIterable)
// from now on originalIterable can't be used directly

// all the following return the same items that yielded by originalIterable
Array.from(proxy1)
Array.from(proxy2)
Array.from(proxy3)
```
This is highly useful because iterables do not guarantee that they may be iterated over more than once. Fork guarantees that you can iterate over its source as many times as you need to. It accomplishes this by caching values to the extent that it needs to.

It can also take as first argument the length of the iterable returned (the number of forks in other words).
```js
const proxies = fork(3, originalIterable)
```
And it can be curried:
```js
const proxies = fork(3)(originalIterable)
```
If you don't specify a number as first argument, fork's iterable of copies is infinite, so you can always create another fork on demand. However, while fork may still need to create another copy, it must keep a complete cache of all the data from the beginning of the source iterable. This means that in no circumstance may fork be used as a truly infinite iterable of infinte iterables without, well, infinite memory cost. For example:
```js
for (const proxy of fork(2, originalIterable)) {
  // if you consume proxy inside this loop
  // fork will cache every single item yielded by originalIterable
}
```

This is the recommended use of fork:
```js
// after this line, the cache will contain only the items not consumed by all iterables
const [proxy1, proxy2] = fork(originalIterable);

// That means that if I carefully consume all items in parallel, the memory cost will be minimal
const square = (x) => x * x
for (const [n, nsquared] of zip(proxy1, map(square, proxy1))) {
  console.log(`${n} squared is ${nsquared}`)
}
```

### asyncFork
See [fork](#fork)

Note: Returns an iterable (sync) of async iterables.


## Consume an iterable
### consume
Consumes an iterable, running a function for every value yielded. Passing only the function you get a curried version.
```js
consume((item) => console.log(item), [1, 2, 3]) // prints 1, 2, 3
```

### asyncConsume
See [consume](#consume)

### toArray
Transform an iterable to an array. toArray is implemented as Array.from. It is included for consistency since Array.from has no counterpart for use with async iterators.
```js
const arr = toArray(iter);
```

### asyncToArray
See [toArray](#to-array)


## Utilities
### apply
apply is a convenience method. Its implementation is:
```js
(fn, args = []) => fn(...args)
```
`apply` has three main differences from `Function.prototype.apply`. It does not take a `thisArg`, the args to apply may be specified as an iterable, and if you do not pass the `args` iterable, the result is a partial application, not a no-args call to `fn`.

### call
call is a convenience method. Its implementation is:
```js
(fn, ...args) => fn(...args)
```
`call` has only one difference from `Function.prototype.call`, which is that it does not take a `thisArg`.

### compose
This is a classic composition function that can be used to assemble multiple functions that take an iterable and return an iterable.
```js
const iter = compose(
  map((x) =>  x + 3),
  filter((x % 2) === 0)
)

iter([1, 2, 3, 4]) // 5, 7
```
Note: it works right to left, so the first transformation used is filter and the second is map.

### execPipe
Allows you to run an iterable through several functions. The first argument is an iterable, the following are functions that takes an iterable and return an iterable.
```js
const iter = execPipe(
  [1, 2, 3, 4],
  filter((x % 2) === 0)
  map((x) =>  x + 3),
)

iter // 5, 7
```
The previous example is equivalent to the `compose` and `pipe` ones (note that execPipe* works left to right like `pipe`).

### pipe
This is a classic composition function that can be used to assemble multiple functions that take an iterable and return an iterable.
```js
const iter = pipe(
  filter((x % 2) === 0),
  map((x) =>  x + 3)
)

iter([1, 2, 3, 4]) // 5, 7
```
Note: it is equivalent to *compose* but it works left to right!

### when
when is a helper you can use with es6 spread syntax (the `...` operator). In particular it helps avoid an unnecessarily difficult to read pattern that frequently causes code formatters (prettier, specifically) to emit an undesireable number of lines:
```js
const always = true;
const sometimes = Math.random() > .5;

const arr = [
  always,
  ...(
    sometimes ? [ sometimes ] : []
  )
]; // [true, true] OR [true]
```

Instead, you can use the when method like so:
```js
const whenArr = [
  always,
  ...when(sometimes, [ sometimes ]),
]; // [true, true] OR [true]
```

The pattern works equally well with objects.
```js
const whenObj = {
  always,
  ...when(sometimes, { sometimes }),
}; // { always: true } OR { always: true, somtimes: true }
```

Note that the empty result of spread is both an empty object and an empty iterable at the same time. This means that `[...when(false, null)]` and `{...when(false, null)}` are both valid (same for `undefined`).


