Iter-tools
==========
iter-tools is an utility toolbox that allows you to unleash the power and expressiveness of iterators.

Create iterators
* [Range](#range)
* [Repeat](#repeat)

Transform a single iterator
* [Map](#map)
* [Filter](#filter)
* [Take While](#take-while)
* [Drop while](#drop-while)
* [Slice](#slice)

Combine multiple iterators
* [Chain](#chain)
* [Zip](#zip)
* [Zip Longest](#zip-longest)

Utilities returning one of multiple iterators
* [Compress](#compress)
* [Cycle](#cycle)
* [GroupBy](#groupby)
* [Tee](#tee)

Utilities
* [Reduce](#reduce)
* [Iter](#iter)

Combinatory iterators
* [Products](#products)
* [Permutations](#permutations)
* [Combinations with replacement](#combinations-with-replacement)
* [Combinations](#combinations)

##Design principles
#### Pay only what you eat
This package is designed to import only what you need. So if you use them in the browser you don't need to load unneccessary code.
```js
var chain = require('iter-tools/lib/chain');
```
You can also import the whole library if you find it convenient:
```js
var iterTools = require('iter-tools');
iterTools.chain(iterable1, iterable2);
```

#### ESX - ES5 compatible
Every module is available from 2 different folders 'lib' and 'es5'. The latter contains already transpiled code, ready to be used in older browsers (or version of node).
```js
var chain_es6 = require('iter-tools/lib/chain');
```
or
```js
var chain_es5 = require('iter-tools/es5/chain');
```

#Create iterators
##Range
Create an iterator returning a sequence of numbers (they can also be infinite)
```js
var range = require('iter-tools/lib/range');
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
var count = require('iter-tools/lib/count');
```

##Repeat
Create an iterator that returns the same value n times
```js
var repeat = require('iter-tools/lib/repeat');
repeat('x', 3); // n, n, n
repeat('x'); // n, n, n .... forever
```

#Transform a single iterator
These series of iterators takes as first argument a function and as a second an iterable. If the second argument is omitted it is automatically returnes a curried function. These functions can be composed:
```js
var compose = require('async-deco/utils/compose');

var iterator = compose(map(power2), filter(isEven));
iterator([ ...... ]);
```
This is more efficient of using array methods as it doesn't require to build intermediate arrays.

##Map
The equivalent of the array map function. But runs on an iterable and returns another iterable.
```js
var map = require('iter-tools/lib/map');
map(power2, range(4)); // 0, 1, 4, 9
```

##Filter
The equivalent of the array filter function. But runs on an iterable and returns another iterable.
```js
var filter = require('iter-tools/lib/filter');
map(isEven, range(4)); // 0, 2
```

##Take While
It returns values as soon as the function is true. Then it stops.
```js
var takeWhile = require('iter-tools/lib/take-while');
takeWhile(isEven, range(4)); // 0
```

##Drop While
It starts returning values when the function is false. Then it keep going until the iterator is exausted.
```js
var dropWhile = require('iter-tools/lib/drop-while');
dropWhile(isEven, range(4)); // 1, 2, 3
```

##Slice
It returns a slice of an iterable.
```js
var slice = require('iter-tools/lib/slice');
slice(3, range(10)); // 0, 1, 2
slice({start: 2}, range(10)); // 2, 3, 4, 5, 6, 7, 8, 9
slice({start: 2, end: 6}, range(10)); // 2, 3, 4, 5
slice({start: 2, end: 6, step: 2}, range(10)); // 2, 4
```

#Combine multiple iterators

##Chain
```js
var chain = require('iter-tools/lib/chain');
```

##Zip
```js
var zip = require('iter-tools/lib/zip');
```

##Zip longest
```js
var zipLongest = require('iter-tools/lib/zip-longest');
```

#Utilities returning one of multiple iterators

##Compress
```js
var compress = require('iter-tools/lib/compress');
```

##Cycle
```js
var cycle = require('iter-tools/lib/cycle');
```

##GroupBy
```js
var groupBy = require('iter-tools/lib/groupby');
```

##Tee
```js
var tee = require('iter-tools/lib/tee');
```

#Utilities

##Reduce
```js
var reduce = require('iter-tools/lib/reduce');
```

##Iter
```js
var iter = require('iter-tools/lib/iter');
```

#Combinatory iterators

##Product
```js
var product = require('iter-tools/lib/product');
```

##Permutations
```js
var permutations = require('iter-tools/lib/permutations');
```

##Combinations
```js
var combinations = require('iter-tools/lib/combinations');
```

##Combinations with replacement
```js
var combinationsWithReplacement = require('iter-tools/lib/combinations-with-replacement');
```
