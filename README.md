# Iter-tools

[![build status](https://img.shields.io/github/workflow/status/iter-tools/iter-tools/verify)](https://github.com/iter-tools/iter-tools/actions?query=branch%3Atrunk+workflow%3Averify)
[![line coverage](https://codecov.io/gh/iter-tools/iter-tools/branch/trunk/graph/badge.svg)](https://codecov.io/gh/iter-tools/iter-tools)
[![npm version](https://img.shields.io/npm/v/@iter-tools/es)](https://www.npmjs.com/package/@iter-tools/es)
[![chat on gitter](https://img.shields.io/gitter/room/iter-tools/iter-tools)](https://gitter.im/iter-tools/community)

iter-tools is designed to be a standard library of utilities for working with iterables. All javascript data types designed for the storage of data (namely Array, Map, and Set) are iterable, and iter-tools also includes some utilities that will help you work with objects. Working with iterables has powerful benefits:

- The functional style helps you eliminate null pointer errors
- It helps you use Maps and Sets, which otherwise have no tooling, yet offer attractive benefits like excellent performance, any-type keys, and the guarantee that prototype and data won't accidentally intermingle, causing difficult-to-find bugs.
- It helps you create applications whose memory usage can be more highly optimized, helping you avoid costly garbage collections.
- APIs which accept iterables are immediately compatible with almost any kind of data structure, including custom implementations such as those provided by Immutable.js

If you want even more ideas about how and when Iterables and iter-tools can help you out, take a look at [The Cookbook](https://github.com/iter-tools/iter-tools/blob/trunk/COOKBOOK.md).

## API docs

Please read our [API docs](https://github.com/iter-tools/iter-tools/blob/v7.0.0-rc.0/API.md)!

Historical docs are markdown files on github. For 6.x docs look at tags on the history of `README.md`. For 7.x versions look at tags on the history of `API.md`.

## Why iter-tools?

Iter-tools is at present the only fully-featured library of its kind. Here is what it supports:

- **Isomorphic**: The tools run equally well in a browser and in node.js.

- **Currying/Partial Application**: iter-tools methods can be passed their arguments all at once, or can be incrementally configured. E.g. either `map(x => ++x)(iterable)` is valid. Omitting the iterable argument allows methods to be pipelined easily, as the output of one simple transform will be suitable as the only unbound argument for the next. Iter-tools provides `pipe` and `execPipe` functions for this kind of chaining.

- **null/undefined are empty iterables**: iter-tools methods treat both null and undefined as empty iterables. This allows you to write transforms on array-ish data without first needing to check whether the array exists.

- **Stateless iterables**: iter-tools iterables (as of v7.0.0) are stateless if their source is, which is to say that each call to `[Symbol.iterator]()` returns a fresh iterator the consumption of which will not influence any other iterator. Not all iterables are stateless though: generator functions, notably, are stateful. Arrays, Maps, and Sets (and null/undefined) are stateless iterables. All iter-tools functions returning iterables (range, cycle for example), are stateless.

- **Iterator closing**: The iterator protocol specifies a `return()` method, which can be used to prematurely terminate iteration. If iteration is terminated by code external to the iterator, the iterator's return method gives it a chance to clean up, releasing any resources which it requested in order to do its iteration. Resources might include file handles, network sockets, or event handlers, for example. This behavior makes iter-tools the only library known to the authors which is entirely safe for working with these kinds of iterators.

- **Async/sync parity**: The tools are implemented for both synchronous and asynchronous iterables, and additionally the asynchronous methods can be used on sync iterables, though their output will always be asynchronous. Async methods which which take a callback argument allow the callback to be async, unless otherwise noted.

- **Pay what you need on web**: Iter-tools is designed to be modular, meaning that only the methods you actually use end up being bundled and shipped if you are using a supported bundler. See the [usage section](#usage) below.

#### Usage

Before you install the library you should consider whether you want `iter-tools` (an es5 package), or `@iter-tools/es` an es2018 package. We strongly recommend `@iter-tools/es` if you are able to use it. Iterators are not native to es5 and these tools are likely to run quite slowly (through correctly) in their transpiled form. Both packages are built from the same sources and, transpilation aside, work identically.

```js
const { take } = require('@iter-tools/es');
import { take } from '@iter-tools/es';
```

It is also possible to import individual files from the library. This will make the resulting program or application faster to initialize as it avoids the need to parse the whole library (including parts of it which may not be used). Note that this will not be nececssary for code which will be bundled prior to shipping, as modern versions of rollup and webpack will remove the unused code. Importing a single method looks like this:

```js
const takeWhile = require('@iter-tools/es/methods/take-while');
```

If you happen to be transpiling the code and have use of the fantastic `babel-plugin-macros`, you can generate single-method imports effortlessly like so:

```js
import { take, drop } from '@iter-tools/es/explode.macro';

// which transpiles to:
import take from '@iter-tools/es/methods/take';
import drop from '@iter-tools/es/methods/drop';
```

## Roadmap

Some major improvements are still to come. They are:

- Configurable equality comparators instead of forcing `===` comparison
- `@iter-tools/regex` for evaluating regular expressions against iterables
- `@iter-tools/unicode` for turning strings into iterables of graphemes or extended grapheme clusters
- Flow types
- More packages in the iter-tools org, such as `@iter-tools/read-dir` (an iterable of the contents of a directory), and `@iter-tools/read-lines` (an iterable of the lines in a file).

## Issues and limitations

Some methods in iter-tools consume an entire iterable, such as `arrayFrom`, `last`, or `cycle`. These methods will not terminate if you pass them an infinite iterable such as `range()`. Eventually we may have a better system for warning you in the circumstances when we know you've done something obviously wrong like `cycle(range())`, but this does not exist yet.

It is also important to note that iterables may be stateful or stateless (which is to say whether there is one or more than one underlying iterator), and there is no way that you can necessarily tell which is which. This is a limitation of the underlying technology, not iter-tools itself. Iter-tools iterables are themselves are stateless, except for `PartIterable` instances such as are yielded by methods like `splitOn`, and `groupBy`.

With transforms (like `map`) you are not guaranteed that each iterator returned by `[Symbol.iterator]()` will yield the same values. For example if the source for the transform was an Array, the values in the array may have mutated.

Finally, some of the obvious things you can do with arrays like sorting and shuffling are not possible to do on iterables unless you first store the values in an array. iter-tools will not offer you such methods, instead you should use, for example, `arrayFrom(iterable).sort()`.

## Acknowledgements

I give a lot of credit to the great itertools Python library. This package doesn't want to be a mere port, but rather aims to solve the same problems as Python's library.

Many thanks to Maurizio Lupo (sithmel) for doing the initial porting and development from Python's itertools, for being accepting of new contributors (and patient with us), and for eventually passing maintainership along.
