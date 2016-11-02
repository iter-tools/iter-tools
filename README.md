Iter-tools
==========
iter-tools is an utility toolbox that allows you to unleash the power and expressiveness of iterators and generators.

Create iterators
* [Range](#range)
* [Count](#count)
* [Repeat](#repeat)
* [Cycle](#cycle)

Create iterators from strings
* [Regexp Exec](#regexp-exec)
* [Regexp split](#regexp-split)

Transform a single iterable
* [Map](#map)
* [Filter](#filter)
* [Take While](#take-while)
* [Drop while](#drop-while)
* [Slice](#slice)
* [Reduce Iter](#reduce-iter)
* [Flat Map](#flat-map)

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
* [Reduce](#reduce)
* [Iter](#iter)

Combinatory generators
* [Products](#products)
* [Permutations](#permutations)
* [Combinations with replacement](#combinations-with-replacement)
* [Combinations](#combinations)

##Definitions
This should help clarify the documentation. You can also get more informations here: https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Iterators_and_Generators
* Iterator: an object implementing the iterator protocol (the method next etc.)
* generator: a function returning an iterator
* iterable: a generator function or any object with a generator function under the attribute Symbol.iterator

##Design principles
#### Pay only what you eat
This package is designed to import only what you need. So if you use them in the browser you don't need to load unneccessary code.
```js
const chain = require('iter-tools/lib/chain');
```
You can also import the whole library if you find it convenient:
```js
const iterTools = require('iter-tools');
iterTools.chain(iterable1, iterable2);
```

#### ESX - ES5 compatible
Every module is available from 2 different folders 'lib' and 'es5'. The latter contains already transpiled code, ready to be used in older browsers (or versions of node).
```js
const chain_es6 = require('iter-tools/lib/chain');
```
or
```js
const chain_es5 = require('iter-tools/es5/chain');
```

#Create iterators
##Range
Create an iterator returning a sequence of numbers (they can also be infinite)
```js
const range = require('iter-tools/lib/range');
range(); // 0, 1, 2 ... Infinity
range(3); // 0, 1, 2
range({start: 3}); // 3, 4, 5, 6, 7 ... Infinity
range({start: 3, end: 6}); // 3, 4, 5
range({start: 3, end: 10, step: 3}); // 3, 6, 9
range({start: 9, end: 3, step: -3}); // 9, 6
```

##Count
An alias of range.
```js
const count = require('iter-tools/lib/count');
```

##Repeat
Create an iterator that returns the same value n times
```js
const repeat = require('iter-tools/lib/repeat');
repeat('x', 3); // 'x', 'x', 'x'
repeat('x'); // 'x', 'x', 'x' .... forever
```
##Cycle
It cycles the same iterable forever.
```js
const cycle = require('iter-tools/lib/cycle');
cycle(range(3)); // 0, 1, 2, 0, 1, 2, 0, 1, 2 ....
```

#Create iterators from strings
These generators take as a first argument a regular expression and as a second an iterable. If the second argument is omitted it automatically returns a curried function.

##Regexp Exec
It runs a regular expression on a string. Every iteration returns a new match. You should use a "global" regular expression to return multiple matches. The returned object type is the same one returned by the "RegExp.prototype.exec" method (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec).
* [0] the full string matching the reg exp
* [1] ... [n] the matching groups
* index: the 0 based index of the match
* input: the original string
```js
const regexpExec = require('iter-tools/lib/regexp-exec');
regexpExec(/[0-9]{4}/g, '10/2/2013, 03/03/2015 12/4/1997');
for (let [match] of iter) {
  console.log(match); // '2013', '2015', '1997'
}
```
Note:
* global regular expressions are mutable, you can't reuse the same object more than once
* the destructuring expression [match] extract only the first match

##Regexp Split
It splits a string. You can split by regular expression or string.
```js
const regexpSplit = require('iter-tools/lib/regexp-split');
regexpExec(/\s+/g, 'ab s   d');
for (let section of iter) {
  console.log(section); // ab, s, d
}
```
Note:
* the regular expression is automatically converted to "global"
* you can use a string (it will be internally transformed to global regExp)

#Transform a single iterator
These series of generators take as first argument a function and as a second an iterable. If the second argument is omitted it is automatically returnes a curried function. These functions can be composed:
```js
const compose = require('async-deco/utils/compose');

const iterator = compose(map(power2), filter(isEven));
iterator([ ...... ]);
```
This is more efficient of using array methods as it doesn't require to build intermediate arrays.

##Map
The equivalent of the array "map" function. But runs on an iterable and returns another iterable.
```js
const map = require('iter-tools/lib/map');
map(power2, range(4)); // 0, 1, 4, 9
```

##Filter
The equivalent of the array "filter" function. But runs on an iterable and returns another iterable.
```js
const filter = require('iter-tools/lib/filter');
filter(isEven, range(4)); // 0, 2
```

##Take While
It returns values as soon as the function is true. Then it stops.
```js
const takeWhile = require('iter-tools/lib/take-while');
takeWhile(isEven, range(4)); // 0
```

##Drop While
It starts returning values when the function is false. Then it keeps going until the iterator is exausted.
```js
const dropWhile = require('iter-tools/lib/drop-while');
dropWhile(isEven, range(4)); // 1, 2, 3
```

##Slice
It returns an iterator that returns a slice of an iterable.
```js
const slice = require('iter-tools/lib/slice');
slice(3, range(10)); // 0, 1, 2
slice({start: 2}, range(10)); // 2, 3, 4, 5, 6, 7, 8, 9
slice({start: 2, end: 6}, range(10)); // 2, 3, 4, 5
slice({start: 2, end: 6, step: 2}, range(10)); // 2, 4
```

##Reduce Iter
It returns an iterator that returns the progressively reduced value.
```js
const reduceIter = require('iter-tools/lib/reduce-iter');
reduceIter(function (acc, x) {
  return acc + x;
}, 0, [0, 1, 2, 3]); // [0, 0], [1, 1], [2, 3], [3, 6]
```

##Flat Map
It maps value of an iterable and flatten them.
```js
const flatMap = require('iter-tools/lib/flat-map');
flatMap(x => [x, x * x], range(4)); // 0, 0, 1, 1, 2, 4, 3, 9
```

#Combine multiple iterators

##Chain
It chains multiple iterables in a single one.
```js
const chain = require('iter-tools/lib/chain');
chain([3, 5, 6], [1, 1], [10]); // 3, 5, 6, 1, 1, 10
```

##Zip
It zips 2 or more iterables together. The iteration stops when the shortest iterable is exausted. The first argument is the placeholder used when an iterable is exausted.
```js
const zip = require('iter-tools/lib/zip');
zip([1, 2], [3, 4], [5, 6, 7]); // [1, 3, 5], [2, 4, 6]
```

##Zip longest
It zips 2 or more iterables together. The iteration stops when the longesest iterable is exausted.
```js
const zipLongest = require('iter-tools/lib/zip-longest');
zipLongest(null, [1, 2], [3, 4], [5, 6, 7]); // [1, 3, 5], [2, 4, 6], [null, null, 7]
```

##Enumerate
It is a shorthand for zipping an index to an iterable:
```js
const enumerate = require('iter-tools/lib/enumerate');
enumerate(repeat('x')); // [0, 'x'] [1, 'x'] [2, 'x'] ...
```

##Compress
This returns an iterable omitting items when the second iterable, at the same index, contains a falsy value.
```js
const compress = require('iter-tools/lib/compress');
compress(range(5), [0, 0, 1, 1]); // 2, 3
```

#Utilities returning multiple iterators

##GroupBy
On each iteration it returns a key and a sub-iterator of items with that key.
You can pass a function that returns a key, by default an identity function will be used.
When you iterate over the next group, the previous sub-iterator items will not be available anymore.
```js
const groupBy = require('iter-tools/lib/groupby');
groupby([1, 1, 1, 1, -1, -1, -1, 4]);
// It will return:
// 1, subiterator (1, 1, 1, 1)
// -1, subiterator (-1, -1, -1)
// 4, subiterator (4)

groupby([1, 1, 1, 1, 3, 3, 3, 4], (value) => {value * value});
// It will return:
// 1, subiterator (1, 1, 1, 1, -1, -1, -1)
// 16, subiterator (4)
```

##Tee
It returns 2 or more copies of an iterable. In reality they are not copies (it is not possible) they are distinct iterables sharing the original one and caching the values when one of the copy pull a new value from the original iterator.
```js
const tee = require('iter-tools/lib/tee');
tee(range(3)); // [iter1, iter2]
tee(range(3), 4); // [iter1, iter2, iter3, iter4]
```

#Utilities

##Reduce
This is an implementation of the reduce that consumes an iterable instead of an array.
It takes an arguments an iterable, a function and an initial value (default to undefined);
```js
const reduce = require('iter-tools/lib/reduce');
reduce(range(4), (acc, v) => acc += v, 0); // returns 6
```

##Iter
This tries to return an iterator from a value. This is useful for 2 reasons:
* you can consume the iterator using the "next" method without worrying if it is a string, array or an iterable etc.
* allows to iterate over a simple object

If the value is an object with a "Symbol.iterator" attribute: it initialise and return the iterator (arrays, maps, sets and strings for example).
If the value is already an iterator, it returns the generator itself.
If the value is a generator, it initialises it and returns the iterator.
If the value is an object, it returns an iterator iterating over attribute/value pairs.
```js
const iter = require('iter-tools/lib/iter');
iter([1, 2, 3]); // 1, 2, 3
iter("hello"); // h e l l o
iter(range(4)); // 0, 1, 2, 3
iter({p1: 1, p2: 2}); // ['p1', 1] ['p2', 2]
```

#Combinatory generators

##Product
This returns the cartesian product of 2 or more iterables. It is equivalent to a nested loop for every iterable.
```js
const product = require('iter-tools/lib/product');
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

##Permutations
It returns permutations of length n of an iterable. n defaults to the length of the iterable.
```js
const permutations = require('iter-tools/lib/permutations');
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

##Combinations
It returns combinations of length n of an iterable. n defaults to the length of the iterable.
```js
const combinations = require('iter-tools/lib/combinations');
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

##Combinations with replacement
It returns combinations with replacement of length n of an iterable. n defaults to the length of the iterable.
```js
const combinationsWithReplacement = require('iter-tools/lib/combinations-with-replacement');
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

##Issues and limitations
There are a couple of limitations that you need to be aware of.
First of all, when you consume an iterator object (using next or for..of) you are mutating the object for good.
Many of these tools rely on making an in memory copy of the output. For example: cycle, product or tee. They do that in a efficient lazy way. Still you need to consider that.
Also with the iterator protocol you can create infinite iterables (repeat, cycle, count etc.). These iterables can't be used by all generators. For example combinatory generators require finite iterables.

##Acknowledgements
Of course I give a lot of credit to the great itertools Python library.
It doesn't want to be a mere port, but a properly documented and resonably performant Javascript alternative.
