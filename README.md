# iter-tools

[![build status](https://img.shields.io/github/workflow/status/iter-tools/iter-tools/verify)](https://github.com/iter-tools/iter-tools/actions?query=branch%3Atrunk+workflow%3Averify)
[![line coverage](https://codecov.io/gh/iter-tools/iter-tools/branch/trunk/graph/badge.svg)](https://codecov.io/gh/iter-tools/iter-tools)
[![npm version](https://img.shields.io/npm/v/iter-tools-es)](https://www.npmjs.com/package/iter-tools-es)
[![chat on gitter](https://img.shields.io/gitter/room/iter-tools/iter-tools?color=blue)](https://gitter.im/iter-tools/community)

`iter-tools` provides a comprehensive suite of utility methods for working with javascript iterables and async iterables. Iterables offer an abstraction for describing sequences of values. If you're not sure if `iter-tools` is the right library for you, check out our [features](#features).

### Usage

```js
// If your environment supports es2018:
import { filter } from 'iter-tools-es';
const { filter } = require('iter-tools-es');

// Otherwise you can use es5:
import { filter } from 'iter-tools';
const { filter } = require('iter-tools');
```

es5 consumers are responsible for loading `core-js` if their environment does not define `Symbol.iterator`.

## API

**Please read our [API docs](https://github.com/iter-tools/iter-tools/blob/v7.3.3/API.md)!**

Historical docs are markdown files on github. For 6.x docs look at tags on the history of [README.md](https://github.com/iter-tools/iter-tools/blob/6.x/README.md). For 7.x versions look at tags on the history of [API.md](https://github.com/iter-tools/iter-tools/blob/trunk/API.md).

## The high level

If you're not already familiar with what iterator tools can offer you and why you may want to use them, read on.

While I try to include the most important concepts here, additional content is present also in the github [wiki](https://github.com/iter-tools/iter-tools/wiki), including a [cookbook](https://github.com/iter-tools/iter-tools/wiki/the-cookbook) providing author and user-submitted examples of ways to use the library to accomplish common tasks.

### Why use iterables?

Iterables will never replace arrays, but they have several advantages which make them the future for high-level work in Javascript.

- Defining an API in terms of iterables frees you from needing to worry about how data is stored. If you only expect iterables your code will not break when the data you expect changes from being an `Array` to being a `Set` or a computed representation of values stored elsewhere (or not stored at all). When only the iterable contract is used you will also be freed from other worries like a callee unexpectedly mutating a caller's data.

- Iterables are lazy, which means they do work only when the results of that work are needed. Sometimes this can save you having to do any work! This also allows iterables to definite infinite sequences which are not possible to store in an array. `range()` for example returns the sequence of all positive integers.

- The use of small, short-lived objects with predictable shapes (like the `{ value, done }` object returned by `iterator.next()`) is preferable in situations where responsiveness is a bigger concern than raw speed, most notably web applications (and especially inside of tight loops such as mouse event handlers). This is because [generational garbage collectors](https://v8.dev/blog/trash-talk#generational-layout) are optimized for such objects, and can free their memory in imperceptably-fast minor GCs.

### What is iterable?

All javascript data types designed for the storage of data ([Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map), and [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)) are [iterable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterable_protocol), and any object or class can be made iterable by implementing a [Symbol.iterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/iterator) method which returns an [iterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol). For more reading on what is iterable and how to define iterables, see the docs for [isIterable](https://github.com/iter-tools/iter-tools/blob/trunk/API.md#isiterable).

### Using iterables

Iterables are usually consumed with the [for..of loop syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of) or the [destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) syntax (e.g. `const [a, b] = iterable`). They can also be consumed by `iter-tools` methods.

Some iterables are also iterators, earning them the name `IterableIterator`. Any iterables returned by `iter-tools` methods (e.g. [filter](https://github.com/iter-tools/iter-tools/blob/trunk/API.md#filter)) are iterable iterators because they are implemented using [generator functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*). This means they can be used in one of two ways:

```js
import { filter, notUndefined } from 'iter-tools-es';
// as an iterable:
for (const value of filter(notUndefined, iterable)) {
  /* ... */
}
// or as an iterator:
class SparseArray extends Array {
  [Symbol.iterator]() {
    return filter(notUndefined, this);
  }
}
```

## Features

`iter-tools` is one of a handful of libraries that offer some common functionality like `map` and `filter` methods. It offers these features in addition to the common functionality:

- It can eliminate a whole class of null pointer errors by treating `null` and `undefined` as empty iterables.
- Any `Iterable` returned is an `IterableIterator`.
- Methods support currying, making them ideal for usage with provided methods like [pipe](https://github.com/iter-tools/iter-tools/blob/trunk/API.md#pipe) or [compose](https://github.com/iter-tools/iter-tools/blob/trunk/API.md#compose), or [in a variety of other situations](https://hughfdjackson.com/javascript/why-curry-helps/).
- It provides a low-level `__` API for when speed is paramount.
- It provides a full API over both sync and [async](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/asyncIterator) iterables. These are implemented separately (for performance), but parity is guaranteed through the use of a custom build.
- It has type definitions checked in for Typescript (`>3.8.2`). These are validated on every PR.
- It is [semver](https://semver.org/) compliant, keeps a [changelog](https://github.com/iter-tools/iter-tools/blob/trunk/CHANGELOG.md), and has no runtime dependencies.
- `iter-tools` supports [tree-shaking](https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking), and is a [commonjs/esmodule dual package](https://nodejs.org/api/packages.html#packages_dual_commonjs_es_module_packages), meaning it can be loaded using `require()` as well as `import`.
- The library's sources are valid es module code. Node versions `>12.17.0` can execute them and web build systems that transpile code in `node_modules` can consume them as well. This makes it possible to use a github branch as a package, e.g. by putting `"dependencies": { "iter-tools-es": "gh-username/iter-tools" }` in your `package.json`. Correctly configured bundlers can use a `browserslist` to avoid shipping code that is slower, more cryptic, and harder to debug than it needs to be.

### Individual Methods

It is possible to import individual methods from the library. This will make the resulting program or application faster to initialize as it avoids the need to parse the whole library (including parts of it which may not be used). Note that this will not be nececssary for code which will be bundled prior to shipping, as modern versions of rollup and webpack will remove the unused code. Importing a single method looks like this:

```js
const notUndefined = require('iter-tools-es/methods/not-undefined');
```

### explode.macro

If you happen to be transpiling the code and have use of the fantastic `babel-plugin-macros`, you can generate single-method imports effortlessly like so:

```js
import { filter, map } from 'iter-tools-es/explode.macro';

// which transpiles to:
import filter from 'iter-tools-es/methods/filter';
import map from 'iter-tools-es/methods/map';
```

### \_\_methods

Methods whose names begin with `__` (double underscore) are safe to use – they are part of the library's public API. They are intended for use by extenders of the library and in tight loops where performance is critical.

There are some differences in the order in which arguments are passed, but these are documented along with the method's other overloads. Other less visible differences are:

`__` methods are not curried. You must pass all their arguments in a single call  
`__` methods (aside from `__wrap`) do not treat `null` and `undefined` as iterables.  
`__` methods do not permit sync iterables to be used in place of async iterables (this could change in the future).  
`__` methods return singleton iterable iterators. You can only loop over the results once.  
`__` methods may expose implementation internals which are not part of the documented public API. Code using undocumented APIs is subject to breakage in **any** release, in accordance with the [semver specification](https://semver.org/).  
`__` methods do not have type definitions.

## Roadmap

Some major improvements are still to come. They are:

- UMD support
- `@iter-tools/regex` for evaluating regular expressions against iterables
- `@iter-tools/unicode` for turning strings into iterables of graphemes or extended grapheme clusters
- Flow types

## Issues and limitations

Some methods in iter-tools consume an entire iterable, such as `arrayFrom`, `last`, or `cycle`. These methods will not terminate if you pass them an infinite iterable such as `range()`. Eventually we may have a better system for warning you in the circumstances when we know you've done something obviously wrong like `cycle(range())`, but this does not exist yet.

`iter-tools` does not aim to provide all possible operations. If a method only makes sense when its input or output is an array, `iter-tools` probably does not have an implementation. `groupBy` is probably the most common example of this. I may in the future create an `@iter-tools/array` package for such methods if there is sufficient demand.

## Acknowledgements

I give a lot of credit to the great itertools Python library. This package doesn't want to be a mere port, but rather aims to solve the same problems as Python's library.

Many thanks to Maurizio Lupo (sithmel) for doing the initial porting and development from Python's itertools, for being accepting of new contributors (and patient with us), and for eventually passing maintainership along.
