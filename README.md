Iter-tools
==========
[![Build Status](https://travis-ci.org/sithmel/iter-tools.svg?branch=master)](https://travis-ci.org/sithmel/iter-tools)
![coverage functions](coverage/badge-functions.svg?sanitize=true)
[![npm version](https://img.shields.io/npm/v/iter-tools.svg)](https://www.npmjs.com/package/iter-tools)

iter-tools is designed to be a standard library of utilities for working with iterables. All javascript data types designed for the storage of data (namely Array, Map, and Set) are iterable, and iter-tools also includes some utilities that will help you work with objects. Working with iterables has powerful benefits:
- The functional style helps you eliminate null pointer errors
- It helps you use Maps and Sets, which otherwise have no tooling, yet offer attractive benefits like excellent performance, any-type keys, and the guarantee that prototype and data won't accidentally intermingle, causing difficult-to-find bugs.
- It helps you create applications whose memory usage can be more highly optimized, helping you avoid costly garbage collections.
- APIs which accept iterables are immediately compatible with almost any kind of data structure, including custom implementations such as those provided by Immutable.js

If you want even more ideas about how and when Iterables and iter-tools can help you out, take a look at [The Cookbook](https://github.com/sithmel/iter-tools/blob/master/COOKBOOK.md).

## Why iter-tools?

Iter-tools is at present the only fully-featured library of its kind. Here is what it supports:

- **Isomorphic**: The tools run equally well in a browser and in node.js.

- **Currying/Partial Application**: iter-tools methods can be passed their arguments all at once, or can be incrementally configured. E.g. either `map(x => ++x)(iterable)` is valid. Omitting the iterable argument allows methods to be pipelined easily, as the output of one simple transform will be suitable as the only unbound argument for the next. Iter-tools provides `pipe` and `execPipe` functions for this kind of chaining.

- **null/undefined are empty iterables**: iter-tools methods treat both null and undefined as empty iterables. This allows you to write transforms on array-ish data without first needing to check whether the array exists.

- **Multiple iteration**: iter-tools transforms (as of v7.0.0) can be evluated multiple times if the source iterator can be. Not all iterables can be evaluated multiple times though: generator functions, notably, cannot be. Arrays, Maps, and Sets (and null/undefined) always can be.

- **Iterator closing**: The iterator protocol specifies a `return()` method, which can be used to prematurely terminate iteration. If iteration is terminated by code external to the iterator, the iterator's return method gives it a chance to clean up, releasing any resources which it requested in order to do its iteration. Resources might include file handles, network sockets, or event handlers, for example. This behavior makes iter-tools the only library known to the authors which is entirely safe for working with these kinds of iterators.

- **Async/sync parity**: The tools are implemented for both synchronous and asynchronous iterables, and additionally the asynchronous versions can be used on sync iterables. It is not recommended however to ignore the sync versions, as they will be an order of magnitude faster on data which is really available synchronously.

- **Pay what you need on web**: Iter-tools is designed to be modular, meaning that only the methods you actually use end up being bundled and shipped if you are using a supported bundler. Webpack/uglify are capable of tree-shaking iter-tools, as is Rollup after v1.3.0. If you are not using a bundler that supports tree-shaking, you can still transpile an expression like `import { map, filter } from "iter-tools"` into imports of individual files: `iter-tools/es5/map` and `iter-tools/es5/filter`. To do this use the `iter-tools-explode-imports` package.


## API

Create iterables
* [range](#range)
* [repeat](#repeat)
* [cycle](#cycle)
* [entries](#entries)
* [keys](#keys)
* [values](#values)

Transform a single iterable
* [cursor](#cursor) ([async](#async-cursor))
* [map](#map) ([async](#async-map))
* [filter](#filter) ([async](#async-filter))
* [takeWhile](#take-while) ([async](#async-take-while))
* [dropWhile](#drop-while) ([async](#async-drop-while))
* [slice](#slice) ([async](#async-slice))
* [flat](#flat) ([async](#async-flat))
* [flatMap](#flat-map) ([async](#async-flat-map))
* [reduce](#reduce) ([async](#async-reduce))
* [batch](#batch) ([async](#async-batch))
* [takeSorted](#take-sorted) ([async](#async-take-sorted))
* [interpose](#interpose) ([async](#async-interpose))

Combine multiple iterables
* [concat](#concat) ([async](#async-concat))
* [zip](#zip) ([async](#async-zip))
* [zipAll](#zip-all) ([async](#async-zip-all))
* [enumerate](#enumerate) ([async](#async-enumerate))
* [compress](#compress) ([async](#async-compress))
* [merge](#merge) ([async](#async-merge))

Utilities returning multiple iterables
* [groupBy](#group-by) ([async](#group-by))
* [fork](#fork) ([async](#async-fork))
* [partition](#partition) ([async](#async-partition))
* [multiPartition](#multi-partition) ([async](#async-multi-partition))
* [splitAt](#split-at) ([async](#async-split-at))

Others
* [toArray](#to-array) ([async](#async-to-array))
* [execute](#execute) ([async](#async-execute))
* [consume](#consume) ([async](#async-consume))
* [first](#first) ([async](#async-first))
* [find](#find) ([async](#async-find))
* [tap](#tap) ([async](#async-tap))
* [size](#size) ([async](#async-size))
* [some](#some) ([async](#async-some))
* [every](#every) ([async](#async-every))
* [asyncThrottle](#async-throttle)
* [asyncBuffer](#async-buffer)

Strings manipulation
* [regexpExec](#regexp-exec)
* [regexpSplit](#regexp-split)
* [regexpSplitIter](#regexp-split-iter) ([async](#async-regexp-split-iter))
* [splitLines](#split-lines) ([async](#async-split-lines))
* [regexpExecIter](#regexp-exec-iter) ([async](#async-regexp-exec-iter))

Combinatory generators
* [product](#product)
* [permutations](#permutations)
* [combinationsWithReplacement](#combinations-with-replacement)
* [combinations](#combinations)

Utilities
* [compose](#compose)
* [pipe](#pipe)
* [execPipe](#exec-pipe)
* [call](#call)
* [apply](#apply)

## Definitions
This should help clarify the documentation. You can also get more informations here: https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Iterators_and_Generators and here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols
* **Iterator**: an object implementing the iterator protocol (the method next etc.)
* **Async Iterator**: an object implementing the async iterator protocol (the method next that returns a promise etc.)
* An object is **iterable** if it implements the @@iterator method, meaning that the object (or one of the objects up its prototype chain) must have a property with a @@iterator key which is available via constant Symbol.iterator. You can call this function without arguments to get an object implementing the **iterator** protocol.
* An object is **async iterable** if it implements the @@asyncIterator method, meaning that the object (or one of the objects up its prototype chain) must have a property with a @@asyncIterator key which is available via constant Symbol.asyncIterator. You can call this function without arguments to get an object implementing the **async iterator** protocol.
* **Generator function**: a function returning a **generator object**
* **Async generator function**: a function returning an **async generator object**
* **Generator object**: an object supporting both **iterable** and **iterator** protocol
* **Async generator object**: an object supporting both **async iterable** and **async iterator** protocol

For example:
```js
// iterator
const iterator = {
  value: 0,
  next() {
    return { value: this.value++, done: false }
  }
}

// iterable
const iterable = {
  [Symbol.iterator]: iterator
}

// both iterable and iterator
const both = {
  value: 0,
  next() {
    return { value: this.value++, done: false }
  },
  [Symbol.iterator]: this // every new iterable will use the same state "value"
}

// both iterable and iterator using a class
class Iterable {
  constructor() {
    this.value = 0
  }
  next() {
    return { value: this.value++, done: false }
  }
  [Symbol.iterator]() {
    return new Iterable() // every new iterable will use a new state "value"
  }
}

// generator function
function * genFunc() {
  i = 0
  yield i++
}

// generator object
const genObj = genFunc()

// generator object supports iterable protocol
typeof genObj[Symbol.iterator] === 'function'
// generator object supports iterator protocol
typeof genObj.next === 'function'
```

#### iter-tools iterables and asyncIterables
All iter-tools functions expect iterables, as do `Array.from` and `for ... of`. Generator functions (which most iter-tools functions are under the hood) return iterables. If you are not using a generator function, don't forget that your object must implement *Symbol.iterator* or *Symbol.asyncIterator* (if asynchronous). For example:
```js
const myRangeIterator = {
  value: 1,
  next: () => ({ value: this.value++, done: false } }),
  [Symbol.iterator]() { return this }
}

slice(3, iterable(myRangeIterator)) // 1, 2, 3
```

```js
const myAsyncRangeIterator = {
  value: 1,
  next: () => Promise.resolve({ value: this.value++, done: false } }),
  [Symbol.iterator]() { return this }
}

asyncSlice(3, asyncIterable(myAsyncRangeIterator)) // 1, 2, 3
```

#### Javascript support
Every module is available in 3 ecmascript editions: ES5, ES2015, ES2018.

* Use ES5 when you need to support IE11 or when you are authoring a library.
* Use ES2015 when you need to support modern browsers that don't support async iterables yet. This is also the right version for node 8 and below.
* Use ES2018 when you know all your target environments natively support async iterables. Node 10 and above do.

The individual modules can be required either using named imports, or by importing the specific submodule you need. Using named imports will include the entire library and thus should only be done when bundle weight is not a concern (node) or when using a es2015+ module versions in combination with webpack3+ or rollup.

Here are some examples:

```js
const takeWhile = require('iter-tools').takeWhile; // ES5 is default

const takeWhile = require('iter-tools/es2015/take-while'); // ES2015
import { takeWhile } from 'iter-tools/es2015'; // ES2015

const takeWhile = require('iter-tools/es2018/take-while'); // ES2018
import { takeWhile } from 'iter-tools/es2018'; // ES2018
```

Note: **file names are all lowercase, dash separated. Module names are camelcase.**

## Async iterators
Async iterators are a new feature introduced by ES2018. Iter-tools implements an alternate versions of many functions that works on async iterators as well as regular iterators. Note some common patterns:
* they return either an async iterable (asyncMap, asyncFilter for example) or a promise returning a value (asyncReduce for example)
* whenever they take a function as argument, this can return a value or a promise

# Create iterables
## Range
Create an iterable returning a sequence of numbers (the sequence can be infinite)
```js
range(); // 0, 1, 2 ... Infinity
range(3); // 0, 1, 2
range({start: 3}); // 3, 4, 5, 6, 7 ... Infinity
range({start: 3, end: 6}); // 3, 4, 5
range({start: 3, end: 10, step: 3}); // 3, 6, 9
range({start: 9, end: 3, step: -3}); // 9, 6
```

## repeat
Create an iterable that returns the same value n times
```js
repeat('x', 3); // 'x', 'x', 'x'
repeat('x'); // 'x', 'x', 'x' .... forever
```

## cycle
It cycles the same iterable forever.
```js
cycle(range(3)); // 0, 1, 2, 0, 1, 2, 0, 1, 2 ....
```

## entries
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

## keys
Takes in a plain object, null, a Map, or any other object which defines an `keys` method.
When given an Object, it is equivalent to Object.keys, otherwise it calls `keys()`
When passed a nullish value, returns an empty iterable.

```js
const obj = {foo: 'bar', fox: 'far'}
const map = new Map(entries(obj))

Array.from(keys(obj)) // ['foo', 'fox'];
deepEqual(Array.from(keys(map)), keys(obj)) // true
```

## values
Takes in a plain object, null, a Map, or any other object which defines an `values` method.
When given an Object, it is equivalent to Object.values, otherwise it calls `values()`
When passed a nullish value, returns an empty iterable.

```js
const obj = {foo: 'bar', fox: 'far'}
const map = new Map(entries(obj))

Array.from(values(obj)) // ['bar', 'far']
deepEqual(Array.from(values(map)), values(obj)) // true
```


# Transform a single iterable
These series of generators take as first argument a function and as a second an iterable. If the second argument is omitted it automatically returns a curried function. These functions can be composed:
```js
const iterable = compose(map(x => x * x), filter(isEven));
iterable([ 1, 2, 3, 4 ]); // 4, 16
```
This is more memory efficient of using array methods as it doesn't require to build intermediate arrays.

## cursor
It returns every item of the sequence and its n preceding items (or succeeding items). It takes as arguments the window **size** and **trailing** option (default false). When trailing is false every iteration returns an item and its preceding items, when trailing true every iteration returns an item and its succeeding items.
```js
cursor({ size: 3 }, [1, 2, 3, 4, 5]); // [undefined, undefined, 1] [undefined, 1, 2] [1, 2, 3] [2, 3, 4] [3, 4, 5]

cursor({ size: 3, trailing: true }, [1, 2, 3, 4, 5]); // [1, 2, 3] [2, 3, 4] [3, 4, 5] [4, 5, undefined] [5, undefined, undefined]
```
The option **filler** allows to specify a different value instead of undefined.
```js
cursor({ size: 3, filler: 0 }, [1, 2, 3, 4, 5]); // [0, 0, 1] [0, 1, 2] [1, 2, 3] [2, 3, 4] [3, 4, 5]
```

## async-cursor
The same as cursor but working with async iterables.

## map
The equivalent of the array "map" function.
```js
map(x => x * x, range(4)); // 0, 1, 4, 9
```

## async-map
The same as map but working with sync and async iterables. The first argument can be a function returning synchronously or a promise.
```js
await asyncMap(animal => animal.kind, [
  Promise.resolve({type: 'cat'}),
  Promise.resolve({type: 'dog'})
]); // ['cat', 'dog']
```
It can also use as extra argument, the concurrency level (default 1):
```js
await asyncMap(2, asyncFunction, iterable);
```
If this is used, more than one asyncFunction can run concurrently. This also means that the input will be consumed eagerly. **Do not use it if consuming the iterable leads to a side effect.**

## filter
The equivalent of the array "filter" function.
```js
filter(isEven, range(4)); // 0, 2
await asyncFilter(animal => animal.kind.slice(1) === 'at', [
  Promise.resolve({type: 'cat'}),
  Promise.resolve({type: 'rat'}),
  Promise.resolve({type: 'dog'}),
]) // [{type: 'cat'}, {type: 'rat'}]
```

## async-filter
See filter. The first argument can be a function returning synchronously or a promise.
It can also use as extra argument, the concurrency level (default 1):
```js
await asyncFilter(2, asyncFunction, iterable);
```
If this is used, more than one asyncFunction can run concurrently. This also means that the input will be consumed eagerly. **Do not use it if consuming the iterable leads to a side effect.**

## take-while
It returns values as soon as the function is true. Then it stops.
```js
takeWhile(isEven, range(4)); // 0
```

## async-take-while
Same as Take While but works on both sync and async iterables. The first argument can be a function returning synchronously or a promise.

## drop-while
It starts returning values when the function is false. Then it keeps going until the iterable is exausted.
```js
dropWhile(isEven, range(4)); // 1, 2, 3
```

## async-drop-while
Same as Drop While but works on both sync and async iterables. The first argument can be a function returning synchronously or a promise.

## slice
It returns an iterable that returns a slice of an iterable.
```js
slice(3, range(10)); // 0, 1, 2
slice({start: 2}, range(10)); // 2, 3, 4, 5, 6, 7, 8, 9
slice({start: 2, end: 6}, range(10)); // 2, 3, 4, 5
slice({start: 2, end: 6, step: 2}, range(10)); // 2, 4
```
"Start" and "end" can also be negative. They work like Array.prototype.slice. Note: working with negative indecies is less efficient and forces to buffer part of the sequence.

## async-slice
Same as slice but works on both sync and async iterables.

## flat
It flattens an iterable. You can specify the maximum depth as first argument (default 1). ```0``` means "no flatten", ```Infinity``` means "deep flatten".
```js
flat([1, [2, 3], [4, [5, 6]]]); // 1, 2, 3, 4, [5, 6]
flat(2, [1, [2, 3], [4, [5, 6]]]); // 1, 2, 3, 4, 5, 6
```
The algorithm takes into consideration every item that is iterable, except strings.
Alternatively, you can pass a function that takes the current "depth" and "item" and returns true if the "item" is a sequence and it needs to be flatten.
```js
const isNotACharacter = (depth, item) => !(typeof item === 'string' && item.length <= 1)

flat(isNotACharacter, ['hel', ['lo', ''], ['world']]); // h e l l o w o r l d
```

## async-flat
Same as flat but works on both sync and async iterables.

## flat-map
It maps value of an iterable and flatten them.
```js
flatMap(x => [x, x * x], range(4)); // 0, 0, 1, 1, 2, 4, 3, 9
```

## async-flat-map
Same as flatMap but works on both sync and async iterables.
It can also use as extra argument, the concurrency level (default 1):
```js
await asyncFlatMap(2, asyncFunction, iterable);
```
If this is used, more than one asyncFunction can run concurrently. This also means that the input will be consumed eagerly. **Do not use it if consuming the iterable leads to a side effect.**

## reduce
This is an implementation of the reduce that consumes an iterable instead of an array (have a look at Array.prototype.reduce).
It takes as arguments an initial value (optional), a function, and an iterable.
If an initial value is not specified, the first item is used as the initial value
```js
reduce(0, (acc, v) => acc += v, range(4)); // 6
reduce((acc, v) => acc += v, range(4)); // 6
```

## async-reduce
Same as reduce but works on both sync and async iterables. The function argument can return synchronously or a promise.

## batch
Takes a number and an iterable and returns an iterable divided into batches
```js
batch(2, range(5)); // [0, 1], [2, 3], [4]
```

## async-batch
Same as Batch but works on both sync and async iterables.

## take-sorted
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

## async-take-sorted
Same as takeSorted but works with both sync and async iterables.

## interpose
Inserts a specififed item between each of the items in an iterable.
```js
interpose(null, [1, 2, 3]) // 1, null, 2, null, 3
```

## async-interpose
Same as interpose, but works on both sync and async iterables.

# Combine multiple iterators

## concat
It chains multiple iterables in a single one.
```js
chain([3, 5, 6], [1, 1], [10]); // 3, 5, 6, 1, 1, 10
```

## async-concat
Same as concat but works on both sync and async iterables.

## zip
Zip receives 2 or more iterables. It returns an iterable of entries, each of which contains one item from each of the input iterables. The iteration stops when the shortest input iterable is exausted.

```js
zip([1, 2], [3, 4], [5, 6, 7]); // [1, 3, 5], [2, 4, 6]
```

## async-zip
It returns the same results of zip and works on both sync and async iterables.
Items are resolved in parallel. AsyncZip will never reuse entries.

## zip-all
ZipAll receives 2 or more iterables. It returns an iterable of entries, each of which contains one item from each of the input iterables. The iteration stops when the longest iterable is exausted. If an iterable is exhausted, it is returning undefined.

```js
zipAll([1, 2], [3, 4], [5, 6, 7]); // [1, 3, 5], [2, 4, 6], [undefined, undefined, 7]
```

## async-zip-all
It returns the same results of zipAll and works on both sync and async iterables.
Items are resolved in parallel. AsyncZipAll will never reuse entries.

## enumerate
It is a shorthand for zipping an index to an iterable:
```js
enumerate(repeat('x')); // [0, 'x'] [1, 'x'] [2, 'x'] ...
```

## async-enumerate
Same as enumerate but works on both sync and async iterables.

## compress
This returns an iterable omitting items when the second iterable, at the same index, contains a falsy value.
```js
compress(range(5), [0, 0, 1, 1]); // 2, 3
```

## async-compress
Same as compress but works on both sync and async iterables.

## merge
Merge takes multiple iterables and merge them in a single one. It uses a function that decides what sequence to use, time by time. The function takes an array with the latest items yielded from all iterables (null when an iterable is exhausted). The function returns the index of the iterable to consume.
```js
merge(minNumber, [[1, 2, 5, 6], [3, 4]]) // 1, 2, 3, 4, 5, 6
```
You can also curry it:
```js
merge(minNumber)([[1, 2, 5, 6], [3, 4]]) // 1, 2, 3, 4, 5, 6
```
here's minNumber implementation
```js
const minNumber = (items) =>
  items
    .map((item, index) => ({ index, item })) // add index
    .filter((decoratedItem) => !!decoratedItem.item) // remove null
    .sort((a, b) => a.item.value - b.item.value)[0].index // sort and pick first index
```
There are some helper to cover the most common cases:
* mergeByComparison: it picks the smallest/biggest item, according to the comparator function (passed as argument). The default comparator behaves as the default one used by Array.prototype.sort.
* mergeByChance: it picks a random item. You can pass an array with the "weights" to make more likely to consume the iterable with the highest weight (the default weight is 1).
* mergeByPosition: it starts with the first iterable, it picks up the next one and restart from the beginning when there is no more. You can specify the step as argument (default 1). When an iterable is exhausted, it skips to the next one.
Some example:
```js
// this one will return a sorted iterables, given as an input an array of sorted iterables (returning numbers)
merge(mergeByComparison((a, b) => a - b), sortedIterables)

// the merged iterable will contain twice more items from the first iterable than from the second
merge(mergeByChance([2, 1], [iterable1, iterable2])

//the merged iterable will cycle through the iterables, always skipping one
merge(mergeByPosition(2), [repeat('a'), repeat('b'), repeat('c')]) // a c b a c b ...
```

## async-merge
asyncMerge takes multiple async-iterables and merge them in a single one. It uses a function that decides what sequence to use, time by time. The function takes an array with the latest item yielded from all async-iterables (null when an async-iterable is exhausted). Items returned are promises and the function returns a promise that, when fulfilled, returns the index of the iterable to consume.
```js
asyncMerge(minNumber, [[1, 2, 5, 6], [3, 4]]) // 1, 2, 3, 4, 5, 6
```
You can also curry it:
```js
asyncMerge(minNumber)([[1, 2, 5, 6], [3, 4]]) // 1, 2, 3, 4, 5, 6
```
here's minNumber implementation
```js
const minNumber = async (promises) => {
  const items = await Promise.all(promises)

  items
    .map((item, index) => ({ index, item })) // add index
    .filter((decoratedItem) => !!decoratedItem.item) // remove null
    .sort((a, b) => a.item.value - b.item.value)[0].index // sort and pick first index
}
```
Using promises you can merge multiple iterables in a first come first served basis (see the helper asyncMergeByReadiness below):
```js
asyncMerge(async (promises) => {
  const validPromises = promises
    .filter((promise) => promise) // filter out exhausted iterables

  await Promise.race(validPromises) // as least 1 promise should be resolved or there is no point in returning anything

  for (let index = 0; index < promises.length; index++) {
    if (promises[index] === null) continue
    if (!promises[index].isPending()) {
      return index
    }
  }
}, iterables)
```
As you can see, promises have some extra method "isPending", "isFulFilled", "isRejected". These have been added to the promise returned by the async-iterables to make easier to inspect the promise state.
There are some helper to cover the most common cases:
* asyncMergeByComparison: it picks the smallest/biggest item, according to the comparator function (passed as argument). The default comparator behaves as the default one used by Array.prototype.sort.
* asyncMergeByChance: it picks a random item. You can pass an array with the "weights" to make more likely to consume the iterable with the highest weight (the default weight is 1).
* asyncMergeByPosition: it starts with the first iterable, it picks up the next one and restart from the beginning when there is no more. You can specify the step as argument (default 1). When an iterable is exhausted, it skips to the next one.
* asyncMergeByReadiness: it picks the first available item from any iterable. If you specify a timeout, an error will be thrown if no item is ready after that interval.
Some example:
```js
// this one will return a sorted iterables, given as an input an array of sorted iterables (returning numbers)
asyncMerge(asyncMergeByComparison((a, b) => a - b), sortedIterables)

// the merged iterable will contain twice more items from the first iterable than from the second
asyncMerge(asyncMergeByChance([2, 1], [iterable1, iterable2])

//the merged iterable will cycle through the iterables, always skipping one
asyncMerge(asyncMergeByPosition(2), [repeat('a'), repeat('b'), repeat('c')]) // a c b a c b ...

// yield the first available item every time. If it has to wait more than 100 ms, it will stop and throws an error.
asyncMerge(asyncMergeByReadiness(100), [iterable1, iterable2])
```


# Utilities returning multiple iterators

## group-by
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
This iterable can be curried:
```js
const groupBySquare = groupBy((value) => {value * value});
groupBySquare([1, 1, 1, 1, -1, -1, -1, 4]);
```

## async-group-by
Same as groupBy but works on both sync and async iterables. The first argument can be a function returning synchronously or a promise.

## tee (DEPRECATED use *fork* instead)
It returns 2 or more copies of an iterable. In reality they are not copies (it is not possible) they are distinct iterables sharing the original one and caching the values when one of the copy pull a new value from the original iterable.
```js
tee(range(3)); // [iter1, iter2]
tee(range(3), 4); // [iter1, iter2, iter3, iter4]
```

## async-tee (DEPRECATED use *asyncFork* instead)
Same as tee but works on both sync and async iterables.

## fork
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

Fork's iterable of copies is infinite, so you can always create another fork on demand. However, while fork may still need to create another copy, it must keep a complete cache of all the data from the beginning of the source iterable. This means that in no circumstance may fork be used as a truly infinite iterable of infinte iterables without, well, infinite memory cost. For example:
```js
for (const proxy of slice(2, fork(originalIterable))) {
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

## async-fork
Same as fork but works on both sync and async iterables.

## partition
Takes a condition function and an iterable, divides the iterable into 2, one contains items that satisfy the condition function, one contains item that don't.
```js
const [evens, odds] = partition(x => x % 2 === 0, range(10))
Array.from(evens) // [0, 2, 4, 6, 8]
Array.from(odds) // [1, 3, 5, 7, 9]
```

## async-partition
Same as partition but works on both sync and async iterables.

## multi-partition
This function allows to partition an iterables in an arbitrary number of iterables. Which iterable will be based on the index returned by the function passed as a first argument.
```js
const [first, second, third] = partition(x => x % 3, range(9))
Array.from(first)  // [0, 3, 6]
Array.from(second) // [1, 4, 7]
Array.from(third)  // [2, 5, 8]
```


## async-multi-partition
This is equivalent to the multiPartition function but works for sync and async iterables.

## split-at
It returns an iterable containing 2 slices of the input iterable. The first spans from the beginning to the chosen position. The second from the chosen position to the end.
```js
const [firstThree, others] = splitAt(3, range(100))
Array.from(firstThree) // [0, 1, 2]
Array.from(others) // [3, 4, 5, 6, 7, 8, 9]
```
Memory wise, the two iterables try to be as conservative as possible. But you have to take into consideration that consuming the second iterable without having consumed the first will keep the content of the first iterable in memory.

## async-split-at
Same as asyncSplitAt but works on both sync and async iterables.

# Others

## to-array
Transform an iterable to an array. toArray is implemented as Array.from. It is included for consistency since Array.from has no counterpart for use with async iterators.
```js
const arr = toArray(iter);
```

## async-to-array
Transforms an asynchronous iterable to an array:
```js
const arr = await asyncToArray(asyncIter);
```

## execute
It returns an iterable that returns the output of a function at every iteration.
```js
execute(() => Math.round(Math.random() * 10) ); // 3, 5, 9 ...
```

## async-execute
It returns an iterable that returns the output of an asynchronous function (promise based) at every iteration.
```js
asyncExectue(() => Promise.resolve(Math.round(Math.random() * 10)) ); // 3, 5, 9 ...
```

## consume
It consumes an iterable, running a function for every value yielded. Passing only the function you get a curried version.
```js
consume((item) => console.log(item), [1, 2, 3]) // prints 1, 2, 3
```

## async-consume
The equivalent of consume, for async iterables. It returns a promise. The argument can be a function returning a promise.

## first
It returns the fist item from an iterable.
```js
first([1, 2, 3]) // 1
```

## async-first
It returns the fist item from an async iterable. It returns a promise.

## find
The equivalent of the array "find" function (it can be curried).
```js
find(animal => animal.kind === 'dog', [{type: 'cat'}, {type: 'dog'}])
```

## async-find
Same as find but for async iterables. The first argument can be a function returning synchronously or a promise.
```js
await asyncFind(animal => animal.kind === 'dog', [
  Promise.resolve({type: 'cat'}),
  Promise.resolve({type: 'dog'})
]) // {type: 'dog'}
```

## tap
Tap is not unlike a forEach method, and like forEach is usually used to express side effects. Without breaking a chain of composition, it allows you access to the value yielded to it. Tap always yields the same value it received. Tap can be curried.
```js
compose(
  tap(item => console.log(item)),
  filter(item => !!item),
)([0, 1, 2]) // logs "1", "2". returns Iterable[1, 2]
```

## async-tap
Same as tap, but for async iterables. The argument can be a function returning synchronously or a promise.
```js
compose(
  asyncTap(item => console.log(item)),
  asyncFilter(item => !!item),
)(asyncIter([0, 1, 2])) // logs "1", "2". returns AsyncIterable[1, 2]
```

## size
Returns the number of values yielded by an iterable.
```js
size([1, 2, 3]) // 3
```

## async-size
Returns the number of values yielded by an iterable. It works for both sync and async iterables.
```js
asyncSize(asyncIter([1, 2, 3])) // 3
```

## some
It returns true if running the function, at least one item returns true (can be curried).
```js
some((n) => n % 2 === 0, [1, 2, 3]) // returns true
some((n) => n % 2 === 0, [1, 3, 7]) // returns false
```

## async-some
It returns true if running the function, at least one item returns true (can be curried). The argument can be a function returning synchronously or a promise.
```js
asyncSome((n) => n % 2 === 0, asyncIter([1, 2, 3])) // returns a promise that resolve on true
asyncSome((n) => n % 2 === 0, asyncIter([1, 3, 7])) // returns a promise that resolve on false
```

## every
It returns true if running the function, all items return true (can be curried).
```js
every((n) => n % 2 === 0, [1, 2, 3]) // returns false
every((n) => n % 2 === 0, [2, 4, 6]) // returns true
```

## async-every
It returns true if running the function, all items return true (can be curried). The argument can be a function returning synchronously or a promise.
```js
asyncEvery((n) => n % 2 === 0, asyncIter([1, 2, 3])) // returns a promise that resolve on false
asyncEvery((n) => n % 2 === 0, asyncIter([2, 4, 6])) // returns a promise that resolve on true
```

## async-throttle
It wraps an async iterable and ensures that every item is yielded with an interval of n ms (it can be curried).
```js
asyncThrottle(10, iterable);
```

## async-buffer
It buffers n items of an asyncIterable (it can be curried).
```js
asyncBuffer(10, iterable);
```

# Strings Manipulation
These generators take as a first argument a regular expression. If the second argument is omitted it automatically returns a curried function.

## regexp-exec
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
Note:
* global regular expressions are mutable, you can't reuse the same object more than once
* the destructuring expression [match] extract only the first match

## regexp-split
It splits a string. You can split by regular expression or string.
```js
regexpSplit(/\s+/g, 'ab s   d'); // ab, s, d
```
Note:
* the regular expression is automatically converted to "global"
* you can use a string (it will be internally transformed to global regExp)

## regexp-split-iter
It takes an iterators of strings and output an iterable split using the regular expression.
```js
regexpSplitIter(/\s+/g, ['ab ', 's',' ', '  d']); // ab, s, d
```

## async-regexp-split-iter
The same as regexpSplitIter Iter but for async iterables.

## split-lines
It split an iterables in lines, joining fragments when there are no new line between them. It is compatible with any type of newline characters (it can't be curried).
```js
splitLines(['a\nb', 'c\n', 'd']); // a, bc, d
```

## async-split-lines
The same as splitLines but for async iterables.

## regexp-exec-iter
It takes a regular expression and an iterators of strings and output an iterable containing the matches.
```js
const iter = regexpExecIter(/[0-9]+/g, ['1', '23', ' 2 ex', 'amp', 'le: 34', '6']);
for (let [match] of iter) {
  console.log(match); // 123, 2, 346
}
```
Note:
* global regular expressions are mutable, you can't reuse the same object more than once
* the destructuring expression [match] extract only the first match

## async-regexp-exec-iter
The same as regexpExecIter but for async iterables.

# Combinatory generators

## product
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

// You can use tee for multiplying the same iterable for itself.
product(...tee(range(2))); // [0, 0]  [0, 1]  [1, 0]  [1, 1]
```
You can get the number of items calling the method *getSize* without actually emitting the sequence:
```js
const iter = product([1, 2], [3, 4], [5, 6]);
iter.getSize() === 8
```

## permutations
It returns permutations of length n of an iterable. n defaults to the length of the iterable.
```js
permutations(range(2)); // [0, 1] [1, 0]
permutations([1, 2, 3, 4], 2);
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
You can get the number of items calling the method *getSize* without actually emitting the sequence:
```js
const iter = permutations(range(2)); // [0, 1] [1, 0]
iter.getSize() === 2
```

## combinations
It returns combinations of length n of an iterable. n defaults to the length of the iterable.
```js
combinations(range(2)); // [0, 1]
combinations([1, 2, 3, 4], 2);
// returns:
// [ 1, 2 ],
// [ 1, 3 ],
// [ 1, 4 ],
// [ 2, 3 ],
// [ 2, 4 ],
// [ 3, 4 ]
```
You can get the number of items calling the method *getSize* without actually emitting the sequence:
```js
const iter = combinations([1, 2, 3, 4], 2);
iter.getSize() === 6
```

## combinations-with-replacement
It returns combinations with replacement of length n of an iterable. n defaults to the length of the iterable.
```js
combinationsWithReplacement(range(2)); // [0, 0] [0, 1] [1, 1]
combinationsWithReplacement([1, 2, 3, 4], 2);
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
You can get the number of items calling the method *getSize* without actually emitting the sequence:
```js
const iter = combinationsWithReplacement([1, 2, 3, 4], 2);
iter.getSize() === 10
```

# Utilities

## compose
This is a classic composition function that can be used to assemble multiple functions that take an iterable and return an iterable.
```js
const iter = compose(
  map((x) =>  x + 3),
  filter((x % 2) === 0)
)

iter([1, 2, 3, 4]) // 5, 7
```
Note: it works right to left, so the first transformation used is filter and the second is map.

## pipe
This is a classic composition function that can be used to assemble multiple functions that take an iterable and return an iterable.
```js
const iter = compose(
  filter((x % 2) === 0),
  map((x) =>  x + 3)
)

iter([1, 2, 3, 4]) // 5, 7
```
Note: it is equivalent to *compose* but it works left to right!

## exec-pipe
*execPipe* allows to run an iterable through several functions. The first argument is an iterable, the following are functions that takes an iterable and return an iterable.
```js
const iter = execPipe(
  [1, 2, 3, 4],
  filter((x % 2) === 0)
  map((x) =>  x + 3),
)

iter // 5, 7
```
The previous example is equivalent to the *compose* and *pipe* ones (note that *execPipe* works left to right like *pipe*).

## call
call is a convenience method. Its implementation is:
```js
(fn, ...args) => fn(...args)
```
`call` has only one difference from `Function.prototype.call`, which is that it does not take a `thisArg`.

## apply
apply is a convenience method. Its implementation is:
```js
(fn, args = []) => fn(...args)
```
`apply` has three main differences from `Function.prototype.apply`. It does not take a `thisArg`, the args to apply may be specified as an iterable, and if you do not pass the `args` iterable, the result is a partial application, not a no-args call to `fn`.

## Issues and limitations
There are a few limitations that you need to be aware of.
First of all, when you consume an iterator object (using next) you are mutating the object for good.
Some of these functions makes an in memory copy of the output. For example: cycle, product or tee. They do that in a efficient lazy way. Still you need to consider that.
Also with the iterator protocol you can create infinite iterables (repeat, cycle, count etc.). These iterables can't be used by all generators. For example combinatory generators require finite iterables.
Some of the obvious things you can do with arrays, are not efficients with iterables. For example: sorting, shuffling and in general all operations that rely on having the full array at your disposal. In that case the way to go is to convert the iterable in an array and use that.


## Acknowledgements
Of course I give a lot of credit to the great itertools Python library.
It doesn't want to be a mere port, but a properly documented and resonably performant Javascript alternative.
