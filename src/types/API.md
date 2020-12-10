Many APIs share types. These named types are used in the formal type definitions, but also throughout the documentation for consistency and clarify.

If you aren't already familiar with the technical definition of an iterable and an iterator, I strongly recommend you first read the MDN docs on [iterators and generators](https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Iterators_and_Generators) and [iteration protocols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols).

## Iterable Types

### Iterable

An object implementing the iterable protocol, which is to say possessing a `[Symbol.iterator]()` method.

### Wrappable

`null`, `undefined`, or [Iterable](#iterable).

### IterableIterator

An [Iterable](#iterable) which is also an iterator, which is to say that it has `next()`, `throw(error)`, and `return(value)` methods. It can be evaluated multiple times calling its `[Symbol.iterator]()` method repeatedly. Note that there is no guarantee that evaluating a result iterable more than once will produce the same values. The result will be repeatable only if any transformations are repeatable and the source iterable returns the same results on each iteration.

### SingletonIterableIterator

A single iterator with a `Symbol.iterator` implementation of `return this`. Once exhausted it will only ever produce empty results, which is a common source of errors.

### PartsIterable

An [IterableIterator](#IterableIterator) of [SingletonIterableIterators](#singletoniterableiterator) which represents the result of some method-specic algorithm for choosing split points in a `source`. Parts are thus non-overlapping subsequences of values from `source`, and each part is (under the hood). Parts are essentially decoration on a single iterator over `source`, so advancing to the next part will cause any attempt to take values from previous parts to throw an error. Working around this limitation is simple when needed: just store each part in an array with `map(toArray, partsIterable)`.

## Async Iterable Types

### AsyncIterable

An object implementing the async iterable protocol, which is to say possessing a `[Symbol.asyncIterator]()` method

### AsyncWrappable

`null`, `undefined`, [AsyncIterable](#asynciterable), or [Iterable](#iterable).

### AsyncIterableIterator

The async version of a [IterableIterator](#IterableIterator). Instead of working as an [Iterable](#iterable) and an iterator, it behaves like an [AsyncIterable](#asynciterable) and an async iterator. The same caveats apply regarding evaluating this kind of result iterable more than once.

### SingletonAsyncIterableIterator

A single async iterator with a `Symbol.asyncIterator` implementation of `return this`. Once exhausted it will only ever produce empty results.

### AsyncPartsIterable

The async version of a [PartsIterable](#partsiterable), which is to say an [AsyncIterableIterator](#asyncIterableIterator) of [SingletonAsyncIterableIterators](#singletonasynciterableiterator). As with `PartsIterable`, only one part can be active at a time.

## Other types

### Comparator

A comparator is used to determine sort order. Comparators in iter-tools exactly match the comparator API expected by `Array.prototype.sort`. Comparators are always sync functions, even when sorting async iterables.

#### The Default Comparator

The default comparator is the same as that used by `Array.prototype.sort`:

```js
(a, b) => (a > b ? 1 : b > a ? -1 : 0);
```

It will sort numbers by their value, and strings lexicographically.
