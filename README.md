Iter-tools
==========
[![Build Status](https://travis-ci.org/iter-tools/iter-tools.svg?branch=master)](https://travis-ci.org/iter-tools/iter-tools)
![coverage functions](coverage/badge-functions.svg?sanitize=true)
[![npm version](https://img.shields.io/npm/v/iter-tools.svg)](https://www.npmjs.com/package/iter-tools)
[![Gitter chat](https://badges.gitter.im/gitterHQ/gitter.png)](https://gitter.im/iter-tools/community)

iter-tools is designed to be a standard library of utilities for working with iterables. All javascript data types designed for the storage of data (namely Array, Map, and Set) are iterable, and iter-tools also includes some utilities that will help you work with objects. Working with iterables has powerful benefits:
- The functional style helps you eliminate null pointer errors
- It helps you use Maps and Sets, which otherwise have no tooling, yet offer attractive benefits like excellent performance, any-type keys, and the guarantee that prototype and data won't accidentally intermingle, causing difficult-to-find bugs.
- It helps you create applications whose memory usage can be more highly optimized, helping you avoid costly garbage collections.
- APIs which accept iterables are immediately compatible with almost any kind of data structure, including custom implementations such as those provided by Immutable.js

If you want even more ideas about how and when Iterables and iter-tools can help you out, take a look at [The Cookbook](https://github.com/iter-tools/iter-tools/blob/master/COOKBOOK.md).

## API docs

You can see the API docs on npm: https://www.npmjs.com/package/iter-tools. We are also in the process of building a documentation website that will be signficantly more usable.

## Why iter-tools?

Iter-tools is at present the only fully-featured library of its kind. Here is what it supports:

- **Isomorphic**: The tools run equally well in a browser and in node.js.

- **Currying/Partial Application**: iter-tools methods can be passed their arguments all at once, or can be incrementally configured. E.g. either `map(x => ++x)(iterable)` is valid. Omitting the iterable argument allows methods to be pipelined easily, as the output of one simple transform will be suitable as the only unbound argument for the next. Iter-tools provides `pipe` and `execPipe` functions for this kind of chaining.

- **null/undefined are empty iterables**: iter-tools methods treat both null and undefined as empty iterables. This allows you to write transforms on array-ish data without first needing to check whether the array exists.

- **Multiple iteration**: iter-tools transforms (as of v7.0.0) can be evluated multiple times if the source iterator can be. Not all iterables can be evaluated multiple times though: generator functions, notably, cannot be. Arrays, Maps, and Sets (and null/undefined) always can be. All iter-tools functions returning iterables (range, cycle for example), are designed to be iterated multiple times.

- **Iterator closing**: The iterator protocol specifies a `return()` method, which can be used to prematurely terminate iteration. If iteration is terminated by code external to the iterator, the iterator's return method gives it a chance to clean up, releasing any resources which it requested in order to do its iteration. Resources might include file handles, network sockets, or event handlers, for example. This behavior makes iter-tools the only library known to the authors which is entirely safe for working with these kinds of iterators.

- **Async/sync parity**: The tools are implemented for both synchronous and asynchronous iterables, and additionally the asynchronous versions can be used on sync iterables. It is not recommended however to ignore the sync versions, as they will be an order of magnitude faster on data which is really available synchronously.

- **Pay what you need on web**: Iter-tools is designed to be modular, meaning that only the methods you actually use end up being bundled and shipped if you are using a supported bundler. Webpack/uglify are capable of tree-shaking iter-tools, as is Rollup after v1.3.0. If you are not using a bundler that supports tree-shaking, you can still transpile an expression like `import { map, filter } from "iter-tools"` into imports of individual files: `iter-tools/es5/map` and `iter-tools/es5/filter`. To do this use the `iter-tools-explode-imports` package.

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
  [Symbol.iterator]: () => iterator
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


## Issues and limitations
There are a few limitations that you need to be aware of.
First of all, when you consume an iterator object (using next) you are mutating the object for good.
Some of these functions makes an in memory copy of the output. For example: cycle, product or fork. They do that in a efficient lazy way. Still you need to consider that.
Also with the iterator protocol you can create infinite iterables (repeat, cycle, count etc.). These iterables can't be used by all generators. For example combinatory generators require finite iterables.
Some of the obvious things you can do with arrays, are not efficients with iterables. For example: sorting, shuffling and in general all operations that rely on having the full array at your disposal. In that case the way to go is to convert the iterable in an array and use that.


## Acknowledgements
Of course I give a lot of credit to the great itertools Python library. It doesn't want to be a mere port, but a properly documented and resonably performant Javascript alternative.
