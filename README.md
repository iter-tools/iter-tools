# iter-tools

[![build status](https://img.shields.io/github/workflow/status/iter-tools/iter-tools/verify)](https://github.com/iter-tools/iter-tools/actions?query=workflow%3Averify)
[![line coverage](https://codecov.io/gh/iter-tools/iter-tools/branch/master/graph/badge.svg)](https://codecov.io/gh/iter-tools/iter-tools)
[![npm version](https://img.shields.io/npm/v/@iter-tools/es)](https://www.npmjs.com/package/@iter-tools/es)
[![chat on gitter](https://img.shields.io/gitter/room/iter-tools/iter-tools)](https://gitter.im/iter-tools/community)

`iter-tools` is designed to be a standard library of utilities for working with iterables. All javascript data types designed for the storage of data ([Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map), and [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)) are [iterable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterable_protocol), and any class can be made iterable by implementing a [Symbol.iterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/iterator) method which returns an [iterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol). Iterables are usually consumed with the [for..of loop syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of). They can also be consumed by `iter-tools` methods. Some iterables are also iterators, earning them the name `IterableIterator`. Any iterables returned by `iter-tools` methods (e.g. [filter](#filter)) are iterable iterators because they are implemented using [generator functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*). This means they can be used in one of a few ways:

```js
import { filter, notUndefined } from '@iter-tools/es';
// as an iterable:
for (const value of filter(notUndefined, iterable)) { /* ... */ }
// or as an iterator:
class extends Array {
  [Symbol.iterator]() {
    return filter(notUndefined, this);
  }
}
```

Having iterator tools in your project empowers you to gain the well-documented advantages of es6 [Sets](https://dev.to/katkelly/ditching-dupes-with-a-set-4cf3) and [Maps](https://dev.to/katkelly/advantages-of-a-javascript-map-cen). `iter-tools` can help you construct a collection (e.g. `new Map(objectEntries(obj))`, transform it (e.g. `new Set(map(([key]) => key, myMap))`), or consume it (e.g. `objectFrom(myMap)`).

Also the use of small, short-lived objects with predictable shapes (like the `{ value, done }` object returned by `iterator.next()`) is preferable in situations where responsiveness is a bigger concern than raw speed, most notably web applications (and especially inside of tight loops such as mouse event handlers).

## Features

`iter-tools` is one of a handful of libraries that offer some common functionality like `map` and `filter` methods. It offers these features in addition to the common functionality:

- It can eliminate a whole class of null pointer errors by treating `null` and `undefined` as empty iterables.
- Any `Iterable` returned is an `IterableIterator`.
- Methods support currying, making them ideal for usage with provided methods like [pipe](#pipe) or [compose](#compose), or [in a variety of other situations](https://hughfdjackson.com/javascript/why-curry-helps/).
- It provides a full API over both sync and [async](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/asyncIterator) iterables. These are implemented separately (for performance), but parity is guaranteed through the use of a custom build.
- It has type definitions checked in for Typescript. These are validated on every PR.
- It is [semver](https://semver.org/) compliant, keeps a [changelog](https://github.com/iter-tools/iter-tools/blob/master/CHANGELOG.md), and has no runtime dependencies.
- `iter-tools` supports [tree-shaking](https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking), and is a [commonjs/esmodule dual package](https://nodejs.org/api/packages.html#packages_dual_commonjs_es_module_packages), meaning it can be loaded using `require()` as well as `import`.
- The library's sources are valid es module code. Node versions `>12.17.0` can execute them and web build systems that transpile code in `node_modules` can consume them as well. This makes it possible to use a github branch as a package, e.g. by putting `"dependencies": { "@iter-tools/es": "gh-username/iter-tools" }` in your `package.json`. Correctly configured bundlers can use a `browserslist` to avoid shipping code that is slower, more cryptic, and harder to debug than it needs to be.

## Documentation

Please read our [API docs](https://github.com/iter-tools/iter-tools/blob/v7.0.0-rc.0/API.md)!

Historical docs are markdown files on github. For 6.x docs look at tags on the history of `README.md`. For 7.x versions look at tags on the history of `API.md`.

### Usage

Before you install the library you should consider whether you want `iter-tools` (an es5 package), or `@iter-tools/es` an es2018 package. We strongly recommend `@iter-tools/es` if you are able to use it. Iterators are not native to es5 and these tools are likely to run quite slowly (through correctly) in their transpiled form. Both packages are built from the same sources and, transpilation aside, work identically.

```js
const { take } = require('@iter-tools/es');
import { take } from '@iter-tools/es';
```

#### Individual Methods

It is also possible to import individual methods from the library. This will make the resulting program or application faster to initialize as it avoids the need to parse the whole library (including parts of it which may not be used). Note that this will not be nececssary for code which will be bundled prior to shipping, as modern versions of rollup and webpack will remove the unused code. Importing a single method looks like this:

```js
const takeWhile = require('@iter-tools/es/methods/take-while');
```

#### explode.macro

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

## Issues and limitations

Some methods in iter-tools consume an entire iterable, such as `arrayFrom`, `last`, or `cycle`. These methods will not terminate if you pass them an infinite iterable such as `range()`. Eventually we may have a better system for warning you in the circumstances when we know you've done something obviously wrong like `cycle(range())`, but this does not exist yet.

It is also important to note that iterables may be stateful or stateless (which is to say whether there is one or more than one underlying iterator), and there is no way that you can necessarily tell which is which. This is a limitation of the underlying technology, not iter-tools itself. Iter-tools iterables are themselves are stateless, except for `PartIterable` instances such as are yielded by methods like `splitOn`, and `groupBy`.

With transforms (like `map`) you are not guaranteed that each iterator returned by `[Symbol.iterator]()` will yield the same values. For example if the source for the transform was an Array, the values in the array may have mutated.

Finally, some of the obvious things you can do with arrays like sorting and shuffling are not possible to do on iterables unless you first store the values in an array. iter-tools will not offer you such methods, instead you should use, for example, `arrayFrom(iterable).sort()`.

## Acknowledgements

I give a lot of credit to the great itertools Python library. This package doesn't want to be a mere port, but rather aims to solve the same problems as Python's library.

Many thanks to Maurizio Lupo (sithmel) for doing the initial porting and development from Python's itertools, for being accepting of new contributors (and patient with us), and for eventually passing maintainership along.
