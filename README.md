Iter-tools
==========
[![Build Status](https://travis-ci.org/sithmel/iter-tools.svg?branch=master)](https://travis-ci.org/sithmel/iter-tools)

iter-tools is an utility toolbox that allows you to unleash the power and expressiveness of iterators and generators.

If you want some ideas about how and when Iterators and iter-tools can help you out, take a look at [The Cookbook](https://github.com/sithmel/iter-tools/blob/master/COOKBOOK.md).

Create iterators
* [range](#range)
* [count](#count)
* [repeat](#repeat)
* [cycle](#cycle)
* [entries](#entries)
* [keys](#keys)
* [values](#values)

Transform a single iterable
* [map](#map) ([async](#async-map))
* [filter](#filter) ([async](#async-filter))
* [takeWhile](#take-while) ([async](#async-take-while))
* [dropWhile](#drop-while) ([async](#async-drop-while))
* [slice](#slice) ([async](#async-slice))
* [flatMap](#flat-map) ([async](#async-flat-map))
* [reduce](#reduce) ([async](#async-reduce))
* [batch](#batch) ([async](#async-batch))

Combine multiple iterables
* [chain](#chain) ([async](#async-chain))
* [zip](#zip) ([async](#async-zip))
* [zipLongest](#zip-longest) ([async](#async-zip-longest))
* [enumerate](#enumerate) ([async](#async-enumerate))
* [compress](#compress) ([async](#async-compress))

Utilities returning multiple iterators
* [groupBy](#group-by) ([async](#group-by))
* [tee](#tee) ([async](#async-tee))

Utilities
* [iter](#iter)
* [asyncIter](#async-iter)
* [toArray](#to-array) ([async](#async-to-array))
* [execute](#execute) ([async](#async-execute))
* [consume](#consume) ([async](#async-consume))
* [find](#find) ([async](#async-find))
* [tap](#tap) ([async](#async-tap))
* [size](#size) ([async](#async-size))
* [asyncThrottle](#async-throttle)

Strings manipulation
* [regexpExec](#regexp-exec)
* [regexpSplit](#regexp-split)
* [regexpSplitIter](#regexp-split-iter) ([async](#async-regexp-split-iter))
* [splitLines](#split-lines) ([async](#async-split-lines))
* [regexpExecIter](#regexp-exec-iter) ([async](#async-regexp-exec-iter))

Combinatory generators
* [products](#products)
* [permutations](#permutations)
* [combinationsWithReplacement](#combinations-with-replacement)
* [combinations](#combinations)

## Definitions
This should help clarify the documentation. You can also get more informations here: https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Iterators_and_Generators
* Iterator: an object implementing the iterator protocol (the method next etc.)
* generator: a function returning an iterator
* iterable: a generator function or any object with a generator function under the attribute Symbol.iterator
* async iterable: an async generator function or any object with an async generator function under the attribute Symbol.asyncIterator

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
Async iterators are a new feature introduced by ES2018. Iter-tools implements an alternate versions of many functions that works on async iterators as well as regular iterators.

# Create iterators
## Range
Create an iterator returning a sequence of numbers (the sequence can be infinite)
```js
range(); // 0, 1, 2 ... Infinity
range(3); // 0, 1, 2
range({start: 3}); // 3, 4, 5, 6, 7 ... Infinity
range({start: 3, end: 6}); // 3, 4, 5
range({start: 3, end: 10, step: 3}); // 3, 6, 9
range({start: 9, end: 3, step: -3}); // 9, 6
```

## count
An alias of range.

## repeat
Create an iterator that returns the same value n times
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
const iterator = compose(map(x => x * x), filter(isEven));
iterator([ 1, 2, 3, 4 ]); // 4, 16
```
This is more memory efficient of using array methods as it doesn't require to build intermediate arrays.

## map
The equivalent of the array "map" function.
```js
map(x => x * x, range(4)); // 0, 1, 4, 9
```

## async-map
```js
await asyncMap(animal => animal.kind, [
  Promise.resolve({type: 'cat'}),
  Promise.resolve({type: 'dog'})
]); // ['cat', 'dog']
```

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
See filter

## take-while
It returns values as soon as the function is true. Then it stops.
```js
takeWhile(isEven, range(4)); // 0
```

## async-take-while
Same as Take While but works on both sync and async iterables.

## drop-while
It starts returning values when the function is false. Then it keeps going until the iterator is exausted.
```js
dropWhile(isEven, range(4)); // 1, 2, 3
```

## async-drop-while
Same as Drop While but works on both sync and async iterables.

## slice
It returns an iterator that returns a slice of an iterable.
```js
slice(3, range(10)); // 0, 1, 2
slice({start: 2}, range(10)); // 2, 3, 4, 5, 6, 7, 8, 9
slice({start: 2, end: 6}, range(10)); // 2, 3, 4, 5
slice({start: 2, end: 6, step: 2}, range(10)); // 2, 4
```

## async-slice
Same as slice but works on both sync and async iterables.

## flat-map
It maps value of an iterable and flatten them.
```js
flatMap(x => [x, x * x], range(4)); // 0, 0, 1, 1, 2, 4, 3, 9
```

## async-flat-map
Same as flatMap but works on both sync and async iterables.

## reduce
This is an implementation of the reduce that consumes an iterable instead of an array (have a look at Array.prototype.reduce).
It takes as arguments a function and an iterable;
```js
reduce((acc = 0, v) => acc += v, range(4)); // returns 6
```

## async-reduce
Same as reduce but works on both sync and async iterables.

## batch
Takes a number and an iterable and returns an iterable divided into batches
```js
batch(2, range(5)); // [0, 1], [2, 3], [4]
```

## async-batch
Same as Batch but works on both sync and async iterables.

# Combine multiple iterators

## chain
It chains multiple iterables in a single one. It takes an array of iterables as argument
```js
chain([[3, 5, 6], [1, 1], [10]]); // 3, 5, 6, 1, 1, 10
```

## async-chain
Same as chain but works on both sync and async iterables.

## zip
Zip receives an array of 2 or more iterables. It returns an iterable of entries, each of which contains one item from each of the input iterables. The iteration stops when the shortest input iterable is exausted.

```js
zip([[1, 2], [3, 4], [5, 6, 7]]); // [1, 3, 5], [2, 4, 6]
```

## async-zip
It returns the same results of zip and works on both sync and async iterables.
Items are resolved in parallel. AsyncZip will never reuse entries.

## zip-longest
ZipLongest receives an array of 2 or more iterables. It returns an iterable of entries, each of which contains one item from each of the input iterables. The iteration stops when the longesest iterable is exausted. The first argument is the placeholder used when an iterable is exausted.

```js
zipLongest(null, [[1, 2], [3, 4], [5, 6, 7]]); // [1, 3, 5], [2, 4, 6], [null, null, 7]
```

## async-zip-longest
It returns the same results of zipLongest and works on both sync and async iterables.
Items are resolved in parallel. AsyncZipLongest will never reuse entries.

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

# Utilities returning multiple iterators

## group-by
On each iteration it returns a key and a sub-iterator of items with that key.
You can pass a function that returns a key, if you pass null or undefined an identity function will be used.
When you iterate over the next group, the previous sub-iterator items will not be available anymore.
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
This iterator can be curried:
```js
const groupBySquare = groupBy((value) => {value * value});
groupBySquare([1, 1, 1, 1, -1, -1, -1, 4]);
```

## async-group-by
Same as groupBy but works on both sync and async iterables.

## tee
It returns 2 or more copies of an iterable. In reality they are not copies (it is not possible) they are distinct iterables sharing the original one and caching the values when one of the copy pull a new value from the original iterator.
```js
tee(range(3)); // [iter1, iter2]
tee(range(3), 4); // [iter1, iter2, iter3, iter4]
```

## async-tee
Same as tee but works on both sync and async iterables.

# Utilities

## iter
It tries to return an iterator from a value. This is useful for 2 reasons:
* you can consume the iterator using the "next" method without worrying if it is a string, array, an iterable etc.
* allows to iterate over a simple object

If the value is an object with a "Symbol.iterator" attribute: it initialise and return the iterator (arrays, maps, sets and strings for example).
If the value is already an iterator, it returns itself.
If the value is a generator, it initialises it and returns the iterator.
If the value is an object, it returns an iterator iterating over attribute/value pairs.
```js
iter([1, 2, 3]); // 1, 2, 3
iter("hello"); // h e l l o
iter(range(4)); // 0, 1, 2, 3
iter({p1: 1, p2: 2}); // ['p1', 1] ['p2', 2]
```

## async-iter
It converts a synchronous iterator in an asynchronous one.
```js
const iter = asyncIter(range({ start: 1, end: 4 }));
for await (const n of iter) {
  console.log(n); // 1, 2, 3
}
```

## to-array
Transform an iterator to an array. toArray is implemented as Array.from. It is included for consistency since Array.from has no counterpart for use with async iterators.
```js
const arr = toArray(iter);
```

## async-to-array
Transforms an asynchronous iterator to an array:
```js
const arr = await asyncToArray(asyncIter);
```

## execute
It returns an iterator that returns the output of a function at every iteration.
```js
iter(() => Math.round(Math.random() * 10) ); // 3, 5, 9 ...
```

## async-execute
It returns an iterator that returns the output of an asynchronous function (promise based) at every iteration.
```js
asyncIter(() => Promise.resolve(Math.round(Math.random() * 10)) ); // 3, 5, 9 ...
```

## consume
It consumes an iterable, running a function for every value yielded. Passing only the function you get a curried version.
```js
consume((item) => console.log(item), [1, 2, 3]) // prints 1, 2, 3
```

## async-consume
The equivalent of consume, for async iterables. It returns a promise.

## find
The equivalent of the array "find" function (it can be curried).
```js
find(animal => animal.kind === 'dog', [{type: 'cat'}, {type: 'dog'}])
```

## async-find
Same as find but for async iterables
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
Same as tap, but for async iterables
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

## async-throttle
It wraps an async iterable and ensures that every item is yielded with an interval of n ms (it can be curried).
```js
asyncThrottle(10, iterable);
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

## Issues and limitations
There are a couple of limitations that you need to be aware of.
First of all, when you consume an iterator object (using next or for..of) you are mutating the object for good.
Some of these functions makes an in memory copy of the output. For example: cycle, product or tee. They do that in a efficient lazy way. Still you need to consider that.
Also with the iterator protocol you can create infinite iterables (repeat, cycle, count etc.). These iterables can't be used by all generators. For example combinatory generators require finite iterables.

## Acknowledgements
Of course I give a lot of credit to the great itertools Python library.
It doesn't want to be a mere port, but a properly documented and resonably performant Javascript alternative.
