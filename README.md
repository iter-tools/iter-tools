Iter-tools
==========
[![Build Status](https://travis-ci.org/sithmel/iter-tools.svg?branch=master)](https://travis-ci.org/sithmel/iter-tools)

iter-tools is an utility toolbox that allows you to unleash the power and expressiveness of iterators and generators.

Create iterators
* [range](#range)
* [count](#count)
* [repeat](#repeat)
* [cycle](#cycle)

Strings manipulation
* [regexp-exec](#regexp-exec)
* [regexp-split](#regexp-split)
* [regexp-split-iter](#regexp-split-iter)
* [async-regexp-split-iter](#async-regexp-split-iter)
* [split-lines](#split-lines)
* [async-split-lines](#async-split-lines)
* [regexp-exec-iter](#regexp-exec-iter)
* [async-regexp-exec-iter](#async-regexp-exec-iter)

Transform a single iterable
* [map](#map)
* [async-map](#async-map)
* [filter](#filter)
* [async-filter](#async-filter)
* [take-while](#take-while)
* [async-take-while](#async-take-while)
* [drop-while](#drop-while)
* [async-drop-while](#async-drop-while)
* [slice](#slice)
* [async-slice](#async-slice)
* [flat-map](#flat-map)
* [async-flat-map](#async-flat-map)
* [reduce](#reduce)
* [async-reduce](#async-reduce)
* [batch](#batch)
* [async-batch](#async-batch)

Combine multiple iterables
* [chain](#chain)
* [async-chain](#async-chain)
* [zip](#zip)
* [async-zip](#async-zip)
* [zip-longest](#zip-longest)
* [async-zip-longest](#async-zip-longest)
* [enumerate](#enumerate)
* [async-enumerate](#async-enumerate)
* [compress](#compress)
* [async-compress](#async-compress)

Utilities returning multiple iterators
* [group-by](#group-by)
* [async-group-by](#group-by)
* [tee](#tee)
* [async-tee](#async-tee)

Utilities
* [iter](#iter)
* [async-iter](async-iter)
* [async-iter-to-array](async-iter-to-array)
* [execute](#execute)
* [async-execute](#async-execute)

Combinatory generators
* [products](#products)
* [permutations](#permutations)
* [combinations-with-replacement](#combinations-with-replacement)
* [combinations](#combinations)

## Definitions
This should help clarify the documentation. You can also get more informations here: https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Iterators_and_Generators
* Iterator: an object implementing the iterator protocol (the method next etc.)
* generator: a function returning an iterator
* iterable: a generator function or any object with a generator function under the attribute Symbol.iterator
* async iterable: an async generator function or any object with an async generator function under the attribute Symbol.asyncIterator

#### Javascript support
Every module is available in 3 ecmascript editions: ES5, ES2015, ES2018.

* Use ES5 when you need to support old browsers (like IE11).
* Use ES2015 when you need to support modern browsers, that don't support async iterables yet. This is also the right version for node 8 and below.
* Use ES2018 when you need to support modern browser, that supports async iterables. Like node 10 and above.

Every version is available in 2 formats, using "ES2015 modules" (import/export) and "commonjs". The "ES2015 modules" uses the extension .mjs (for nodejs compatibility). If you are using a bundler like webpack or rollup, the "ES2015 modules" version should be automatically picked up. This way you will benefit of the treeshaking.

Here are some examples:

```js
const takeWhile = require('iter-tools').takeWhile; // ES5 is default
import { takeWhile } from 'iter-tools'; // ES5 is default

const takeWhile = require('iter-tools/es5').takeWhile; // ES5
const takeWhile = require('iter-tools/es5/take-while'); // ES5
import { takeWhile } from 'iter-tools/es5'; // ES5

const takeWhile = require('iter-tools/es2015').takeWhile; // ES2015
const takeWhile = require('iter-tools/es2015/take-while'); // ES2015
import { takeWhile } from 'iter-tools/es2015'; // ES2015

const takeWhile = require('iter-tools/es2018').takeWhile; // ES2018
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
It split an iterables in lines, joining fragments when there are no new line between them. It is compatible with any type of newline characters.
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

# Transform a single iterable
These series of generators take as first argument a function and as a second an iterable. If the second argument is omitted it automatically returns a curried function. These functions can be composed:
```js
const iterator = compose([map(power2), filter(isEven)]);
iterator([ ...... ]);
```
This is more memory efficient of using array methods as it doesn't require to build intermediate arrays.

## map
The equivalent of the array "map" function. But runs on an iterable and returns another iterable.
```js
map(power2, range(4)); // 0, 1, 4, 9
```

## async-map
Same as Map but works on both sync and async iterables.

## filter
The equivalent of the array "filter" function. But runs on an iterable and returns another iterable.
```js
filter(isEven, range(4)); // 0, 2
```

## async-filter
Same as Filter but works on both sync and async iterables.

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
const reduce = require('iter-tools/lib/reduce');
// const reduce = require('iter-tools').reduce;
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
It chains multiple iterables in a single one.
```js
chain([3, 5, 6], [1, 1], [10]); // 3, 5, 6, 1, 1, 10
```

## async-chain
Same as chain but works on both sync and async iterables.

## zip
It zips 2 or more iterables together. The iteration stops when the shortest iterable is exausted.
```js
zip([1, 2], [3, 4], [5, 6, 7]); // [1, 3, 5], [2, 4, 6]
```

## async-zip
Same as zip but works on both sync and async iterables.

## zip-longest
It zips 2 or more iterables together. The iteration stops when the longesest iterable is exausted. The first argument is the placeholder used when an iterable is exausted.
```js
zipLongest(null, [1, 2], [3, 4], [5, 6, 7]); // [1, 3, 5], [2, 4, 6], [null, null, 7]
```

## async-zip-longest
Same as zipLongest but works on both sync and async iterables.

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

## Iter
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

## async-iter-to-array
It transform an asynchronous iterator to an array:
```js
const arr = await asyncIterToArray(asyncIter);
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
