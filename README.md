Iter-tools
==========
iter-tools is an utility toolbox that allows you to unleash the power and expressiveness of iterators and generators.

Create iterators
* [Range](#range)
* [Count](#count)
* [Repeat](#repeat)
* [Cycle](#cycle)

Strings manipulation
* [Regexp Exec](#regexp-exec)
* [Regexp split](#regexp-split)
* [Regexp split iter](#regexp-split-iter)
* [Async Regexp split iter](#async-regexp-split-iter)
* [Split lines](#split lines)
* [Async Split lines](#async split lines)

Transform a single iterable
* [Map](#map)
* [Async Map](#async-map)
* [Filter](#filter)
* [Async Filter](#async-filter)
* [Take While](#take-while)
* [Async Take While](#async-take-while)
* [Drop while](#drop-while)
* [Async Drop while](#async-drop-while)
* [Slice](#slice)
* [Async Slice](#async-slice)
* [Flat Map](#flat-map)
* [Async Flat Map](#async-flat-map)
* [Reduce](#reduce)
* [Async Reduce](#async-reduce)

Combine multiple iterables
* [Chain](#chain)
* [Zip](#zip)
* [Zip Longest](#zip-longest)
* [Enumerate](#enumerate)
* [Compress](#compress)

Utilities returning multiple iterators
* [GroupBy](#groupby)
* [Tee](#tee)

Utilities
* [Iter](#iter)
* [Async Iter](#async-iter)
* [Async Iter to array](#async-iter-to-array)
* [Execute](#execute)
* [AsyncExecute](#execute-async)

Combinatory generators
* [Products](#products)
* [Permutations](#permutations)
* [Combinations with replacement](#combinations-with-replacement)
* [Combinations](#combinations)

## Definitions
This should help clarify the documentation. You can also get more informations here: https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Iterators_and_Generators
* Iterator: an object implementing the iterator protocol (the method next etc.)
* generator: a function returning an iterator
* iterable: a generator function or any object with a generator function under the attribute Symbol.iterator
* async iterable: an async generator function or any object with an async generator function under the attribute Symbol.asyncIterator

## Design principles
#### Pay only what you eat
This package is designed to import only what you need. So if you use one or more iterator you don't need to load the whole library (in the browser for example).
```js
const chain = require('iter-tools/lib/chain');
```
You can also import the whole library if you find it convenient:
```js
const iterTools = require('iter-tools');
iterTools.chain(iterable1, iterable2);
```

#### Supports multiple module formats
Every module is available in 3 different formats:
	1. A `.js` file in the es5 folder, useful for old node or browser versions which do not have native support for either iterators or generators. There is a performance cost of using these regardless of whether they are loaded into an environment with native iterator/generator support. 
	2. A `.js` file in the root of the package, useful for modern environments which consume commonjs modules (i.e. node). Slightly more convenient than 1 since you need not specify the `es5` directory.
	3. A `.mjs` file also in the root of the package. Most infra will prefer the `.mjs` file to the `.js` if they support es module syntax. Even more convenient that 2 since multiple methods can be imported on a line. Note that will break the pay-what-you-eat principle if you are not building your code with tools which support the es module format and tree shaking.
Here are examples of using each:
```js
const chain_es5 = require('iter-tools/es5/chain'); // 1
const chain_es6 = require('iter-tools/chain'); // 2
import {chain, map} from 'iter-tools'; // 3
```


## Async iterators
Async iterators are a new feature introduced by ES2018. Iter-tools implements an alternate versions of many functions that works on async iterators as well as regular iterators.

# Create iterators
## Range
Create an iterator returning a sequence of numbers (the sequence can be infinite)
```js
const range = require('iter-tools/lib/range');
// const range = require('iter-tools').range;
range(); // 0, 1, 2 ... Infinity
range(3); // 0, 1, 2
range({start: 3}); // 3, 4, 5, 6, 7 ... Infinity
range({start: 3, end: 6}); // 3, 4, 5
range({start: 3, end: 10, step: 3}); // 3, 6, 9
range({start: 9, end: 3, step: -3}); // 9, 6
```

## Count
An alias of range.
```js
const count = require('iter-tools/lib/count');
// const count = require('iter-tools').count;
```

## Repeat
Create an iterator that returns the same value n times
```js
const repeat = require('iter-tools/lib/repeat');
// const repeat = require('iter-tools').repeat;
repeat('x', 3); // 'x', 'x', 'x'
repeat('x'); // 'x', 'x', 'x' .... forever
```

## Cycle
It cycles the same iterable forever.
```js
const cycle = require('iter-tools/lib/cycle');
// const cycle = require('iter-tools').cycle;
cycle(range(3)); // 0, 1, 2, 0, 1, 2, 0, 1, 2 ....
```

# Strings Manipulation
These generators take as a first argument a regular expression. If the second argument is omitted it automatically returns a curried function.

## Regexp Exec
It runs a regular expression on a string. Every iteration returns a new match. You should use a "global" regular expression to return multiple matches. The returned object type is the same one returned by the "RegExp.prototype.exec" method (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec).
* [0] the full string matching the reg exp
* [1] ... [n] the matching groups
* index: the 0 based index of the match
* input: the original string
```js
const regexpExec = require('iter-tools/lib/regexp-exec');
// const regexpExec = require('iter-tools').regexpExec;
regexpExec(/[0-9]{4}/g, '10/2/2013, 03/03/2015 12/4/1997');
for (let [match] of iter) {
  console.log(match); // '2013', '2015', '1997'
}
```
Note:
* global regular expressions are mutable, you can't reuse the same object more than once
* the destructuring expression [match] extract only the first match

## Regexp Split
It splits a string. You can split by regular expression or string.
```js
const regexpSplit = require('iter-tools/lib/regexp-split');
// const regexpSplit = require('iter-tools').regexpSplit;
regexpExec(/\s+/g, 'ab s   d');
for (let section of iter) {
  console.log(section); // ab, s, d
}
```
Note:
* the regular expression is automatically converted to "global"
* you can use a string (it will be internally transformed to global regExp)

## Regexp Split Iter
It takes an iterators of strings and output an iterable split using the regular expression.
```js
const regexpSplit = require('iter-tools/lib/regexp-split-iter');
// const regexpSplit = require('iter-tools').regexpSplitIter;
regexpExecIter(/\s+/g, 'ab s   d');
for (let section of iter) {
  console.log(section); // ab, s, d
}
```

## Async Regexp Split Iter
The same as Regexp Split Iter but for async iterables.
```js
const asyncRegexpSplit = require('iter-tools/lib/async/regexp-split-iter');
// const regexpSplit = require('iter-tools').asyncRegexpSplitIter;
```

## Split Lines
It split an iterables in lines, joining fragments when there are no new line between them.
```js
const splitLines = require('iter-tools/lib/split-lines');
// const splitLines = require('iter-tools').splitLines;
```

## Async Split Lines
The same as Split Lines but for async iterables.
```js
const asyncSplitLines = require('iter-tools/lib/async/split-lines');
// const asyncSplitLines = require('iter-tools').asyncSplitLines;
```

# Transform a single iterator
These series of generators take as first argument a function and as a second an iterable. If the second argument is omitted it is automatically returnes a curried function. These functions can be composed:
```js
const compose = require('iter-tools/lib/compose');
// const compose = require('iter-tools').compose;

const iterator = compose([map(power2), filter(isEven)]);
iterator([ ...... ]);
```
This is more efficient of using array methods as it doesn't require to build intermediate arrays.

## Map
The equivalent of the array "map" function. But runs on an iterable and returns another iterable.
```js
const map = require('iter-tools/lib/map');
// const map = require('iter-tools').map;
map(power2, range(4)); // 0, 1, 4, 9
```

## Async Map
Same as Map but works on both sync and async iterables.
The equivalent of the array "map" function. But runs on an iterable and returns another iterable.
```js
const asyncMap = require('iter-tools/lib/async/map');
// const asyncMap = require('iter-tools').asyncMap;
asyncMap(power2, range(4)); // 0, 1, 4, 9
```

## Filter
The equivalent of the array "filter" function. But runs on an iterable and returns another iterable.
```js
const filter = require('iter-tools/lib/filter');
// const filter = require('iter-tools').filter;
filter(isEven, range(4)); // 0, 2
```

## Async Filter
Same as Filter but works on both sync and async iterables.
```js
const asyncFilter = require('iter-tools/lib/async/filter');
// const asyncFilter = require('iter-tools').asyncFilter;
asyncFilter(isEven, range(4)); // 0, 2
```

## Take While
It returns values as soon as the function is true. Then it stops.
```js
const takeWhile = require('iter-tools/lib/take-while');
// const takeWhile = require('iter-tools').takeWhile;
takeWhile(isEven, range(4)); // 0
```

## Async Take While
Same as Take While but works on both sync and async iterables.
```js
const asyncTakeWhile = require('iter-tools/lib/async/take-while');
// const asyncTakeWhile = require('iter-tools').asyncTakeWhile;
asyncTakeWhile(isEven, range(4)); // 0
```

## Drop While
It starts returning values when the function is false. Then it keeps going until the iterator is exausted.
```js
const dropWhile = require('iter-tools/lib/drop-while');
// const dropWhile = require('iter-tools').dropWhile;
dropWhile(isEven, range(4)); // 1, 2, 3
```

## Async Drop While
Same as Drop While but works on both sync and async iterables.
```js
const asyncDropWhile = require('iter-tools/lib/async/drop-while');
// const asyncDropWhile = require('iter-tools').asyncDropWhile;
asyncDropWhile(isEven, range(4)); // 1, 2, 3
```

## Slice
It returns an iterator that returns a slice of an iterable.
```js
const slice = require('iter-tools/lib/slice');
// const slice = require('iter-tools').slice;
slice(3, range(10)); // 0, 1, 2
slice({start: 2}, range(10)); // 2, 3, 4, 5, 6, 7, 8, 9
slice({start: 2, end: 6}, range(10)); // 2, 3, 4, 5
slice({start: 2, end: 6, step: 2}, range(10)); // 2, 4
```

## Async Slice
Same as slice but works on both sync and async iterables.
```js
const asyncSlice = require('iter-tools/lib/async/slice');
// const asyncSlice = require('iter-tools').asyncSlice;
asyncSlice(3, range(10)); // 0, 1, 2
asyncSlice({start: 2}, range(10)); // 2, 3, 4, 5, 6, 7, 8, 9
asyncSlice({start: 2, end: 6}, range(10)); // 2, 3, 4, 5
asyncSlice({start: 2, end: 6, step: 2}, range(10)); // 2, 4
```

## Flat Map
It maps value of an iterable and flatten them.
```js
const flatMap = require('iter-tools/lib/flat-map');
// const flatMap = require('iter-tools').flatMap;
flatMap(x => [x, x * x], range(4)); // 0, 0, 1, 1, 2, 4, 3, 9
```

## Async Flat Map
Same as flatMap but works on both sync and async iterables.
```js
const asyncFlatMap = require('iter-tools/lib/async/flat-map');
// const asyncFlatMap = require('iter-tools').async.flatMap;
asyncFlatMap(x => [x, x * x], range(4)); // 0, 0, 1, 1, 2, 4, 3, 9
```

## Reduce
This is an implementation of the reduce that consumes an iterable instead of an array (have a look at Array.prototype.reduce).
It takes as arguments a function and an iterable;
```js
const reduce = require('iter-tools/lib/reduce');
// const reduce = require('iter-tools').reduce;
reduce((acc = 0, v) => acc += v, range(4)); // returns 6
```

## Async Reduce
Same as reduce but works on both sync and async iterables.
```js
const asyncReduce = require('iter-tools/lib/async/reduce');
// const asyncReduce = require('iter-tools').asyncReduce;
asyncReduce((acc = 0, v) => acc += v, range(4)); // returns 6
```

# Combine multiple iterators

## Chain
It chains multiple iterables in a single one.
```js
const chain = require('iter-tools/lib/chain');
// const chain = require('iter-tools').chain;
chain([3, 5, 6], [1, 1], [10]); // 3, 5, 6, 1, 1, 10
```

## Async Chain
Same as chain but works on both sync and async iterables.
```js
const asyncChain = require('iter-tools/lib/async/chain');
// const asyncChain = require('iter-tools').asyncChain;
```

## Zip
It zips 2 or more iterables together. The iteration stops when the shortest iterable is exausted. The first argument is the placeholder used when an iterable is exausted.
```js
const zip = require('iter-tools/lib/zip');
// const zip = require('iter-tools').zip;
zip([1, 2], [3, 4], [5, 6, 7]); // [1, 3, 5], [2, 4, 6]
```

## Async Zip
Same as zip but works on both sync and async iterables.
```js
const asyncZip = require('iter-tools/lib/async/zip');
// const asyncZip = require('iter-tools').asyncZip;
```

## Zip longest
It zips 2 or more iterables together. The iteration stops when the longesest iterable is exausted.
```js
const zipLongest = require('iter-tools/lib/zip-longest');
// const zipLongest = require('iter-tools').zipLongest;
zipLongest(null, [1, 2], [3, 4], [5, 6, 7]); // [1, 3, 5], [2, 4, 6], [null, null, 7]
```

## Async Zip Longest
Same as zipLongest but works on both sync and async iterables.
```js
const asyncZipLongest = require('iter-tools/lib/async/zip-longest');
// const asyncZipLongest = require('iter-tools').asyncZipLongest;
```

## Enumerate
It is a shorthand for zipping an index to an iterable:
```js
const enumerate = require('iter-tools/lib/enumerate');
// const enumerate = require('iter-tools').enumerate;
enumerate(repeat('x')); // [0, 'x'] [1, 'x'] [2, 'x'] ...
```

## Async Enumerate
Same as zipLongest but works on both sync and async iterables.
```js
const asyncEnumerate = require('iter-tools/lib/async/enumerate');
// const asyncEnumerate = require('iter-tools').asyncEnumerate;
```

## Compress
This returns an iterable omitting items when the second iterable, at the same index, contains a falsy value.
```js
const compress = require('iter-tools/lib/compress');
// const compress = require('iter-tools').compress;
compress(range(5), [0, 0, 1, 1]); // 2, 3
```

## Async Compress
Same as compress but works on both sync and async iterables.
```js
const asyncCompress = require('iter-tools/lib/async/compress');
// const asyncCompress = require('iter-tools').asyncCompress;
```

# Utilities returning multiple iterators

## GroupBy
On each iteration it returns a key and a sub-iterator of items with that key.
You can pass a function that returns a key, if you pass null or undefined an identity function will be used.
When you iterate over the next group, the previous sub-iterator items will not be available anymore.
```js
const groupBy = require('iter-tools/lib/group-by');
// const groupBy = require('iter-tools').groupBy;
groupBy(null, [1, 1, 1, 1, -1, -1, -1, 4]);
// It will return:
// 1, subiterator (1, 1, 1, 1)
// -1, subiterator (-1, -1, -1)
// 4, subiterator (4)

groupBy((value) => {value * value}, [11, 1, 1, 1, -1, -1, -1, 4]);
// It will return:
// 1, subiterator (1, 1, 1, 1, -1, -1, -1)
// 16, subiterator (4)
```
This iterator can be curried:
```js
const groupBySquare = groupBy((value) => {value * value});
groupBySquare([11, 1, 1, 1, -1, -1, -1, 4]);
```

## Async GroupBy
Same as groupBy but works on both sync and async iterables.
```js
const asyncGroupBy = require('iter-tools/lib/async/group-by');
// const asyncGroupBy = require('iter-tools').asyncGroupBy;
```

## Tee
It returns 2 or more copies of an iterable. In reality they are not copies (it is not possible) they are distinct iterables sharing the original one and caching the values when one of the copy pull a new value from the original iterator.
```js
const tee = require('iter-tools/lib/tee');
// const tee = require('iter-tools').tee;
tee(range(3)); // [iter1, iter2]
tee(range(3), 4); // [iter1, iter2, iter3, iter4]
```

## Async Tee
Same as tee but works on both sync and async iterables.
```js
const asyncTee = require('iter-tools/lib/async/tee');
// const asyncTee = require('iter-tools').asyncTee;
```

# Utilities

## Iter
It tries to return an iterator from a value. This is useful for 2 reasons:
* you can consume the iterator using the "next" method without worrying if it is a string, array, an iterable etc.
* allows to iterate over a simple object

If the value is an object with a "Symbol.iterator" attribute: it initialise and return the iterator (arrays, maps, sets and strings for example).
If the value is already an iterator, it returns itself.
If the value is a generator, it initialises it and returns the iterator.
If the value is an object, it returns an iterator iterating over attribute/value pairs.
```js
const iter = require('iter-tools/lib/iter');
// const iter = require('iter-tools').iter;
iter([1, 2, 3]); // 1, 2, 3
iter("hello"); // h e l l o
iter(range(4)); // 0, 1, 2, 3
iter({p1: 1, p2: 2}); // ['p1', 1] ['p2', 2]
```

## Async Iter
It converts a synchronous iterator in an asynchronous one.
```js
const asyncIter = require('iter-tools/lib/async/async-iter');
// const asyncIter = require('iter-tools').asyncIter;
const iter = asyncIter(range({ start: 1, end: 4 }));
for await (const n of iter) {
  console.log(n); // 1, 2, 3
}
```

## Async Iter to array
It transform an asynchronous iterator to an array:
```js
const asyncIterToArray = require('iter-tools/lib/async/async-iter-to-array');
// const asyncIterToArray = require('iter-tools').asyncIterToArray;
const arr = await asyncIterToArray(asyncIter);

```

## Execute
It returns an iterator that returns the output of a function at every iteration.
```js
const iter = require('iter-tools/lib/execute');
// const iter = require('iter-tools').execute;
iter(() => Math.round(Math.random() * 10) ); // 3, 5, 9 ...
```

## Execute Async
It returns an iterator that returns the output of an asynchronous function (promise based) at every iteration.
```js
const asyncIter = require('iter-tools/lib/async/execute');
// const asyncIter = require('iter-tools').asyncIter;
asyncIter(() => Promise.resolve(Math.round(Math.random() * 10)) ); // 3, 5, 9 ...
```

# Combinatory generators

## Product
This returns the cartesian product of 2 or more iterables. It is equivalent to a nested loop for every iterable.
```js
const product = require('iter-tools/lib/product');
// const product = require('iter-tools').product;
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

## Permutations
It returns permutations of length n of an iterable. n defaults to the length of the iterable.
```js
const permutations = require('iter-tools/lib/permutations');
// const permutations = require('iter-tools').permutations;
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

## Combinations
It returns combinations of length n of an iterable. n defaults to the length of the iterable.
```js
const combinations = require('iter-tools/lib/combinations');
// const combinations = require('iter-tools').combinations;
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

## Combinations with replacement
It returns combinations with replacement of length n of an iterable. n defaults to the length of the iterable.
```js
const combinationsWithReplacement = require('iter-tools/lib/combinations-with-replacement');
// const combinationsWithReplacement = require('iter-tools').combinationsWithReplacement;
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
Many of these tools rely on making an in memory copy of the output. For example: cycle, product or tee. They do that in a efficient lazy way. Still you need to consider that.
Also with the iterator protocol you can create infinite iterables (repeat, cycle, count etc.). These iterables can't be used by all generators. For example combinatory generators require finite iterables.

## Acknowledgements
Of course I give a lot of credit to the great itertools Python library.
It doesn't want to be a mere port, but a properly documented and resonably performant Javascript alternative.
