Many APIs share types. These named types are used in the formal type definitions, but also throughout the documentation for consistency and clarify.

If you aren't already familiar with the technical definition of an iterable and an iterator, I strongly recommend you first read the MDN docs on [iterators and generators](https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Iterators_and_Generators) and [iteration protocols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols).

### Iterable

An object implementing the iterable protocol, which is to say possessing a `[Symbol.iterator]()` method

### AsyncIterable

An object implementing the async iterable protocol, which is to say possessing a `[Symbol.asyncIterator]()` method

### SourceIterable

`null`, `undefined`, or [Iterable](#iterable).

### AsyncSourceIterable

`null`, `undefined`, [AsyncIterable](#asynciterable), or [Iterable](#iterable).

### ResultIterable

An [Iterable](#iterable) which is also an iterator, which is to say that it has `next()`, `throw(error)`, and `return(value)` methods. It can be evaluated multiple times calling its `[Symbol.iterator]()` method repeatedly. Note that there is no guarantee that evaluating a result iterable more than once will produce the same values. The result will be repeatable only if any transformations are repeatable and the source iterable guarantees that multiple iterations will have the same result (e.g. `Object.freeze(array)`).

### AsyncResultIterable

The async version of a [ResultIterable](#resultiterable). Instead of working as an [Iterable](#iterable) and an iterator, it behaves like an [AsyncIterable](#asynciterable) and an async iterator. The same caveats apply regarding evaluating this kind of result iterable more than once.

### PartsIterable

A [ResultIterable](#resultiterable) of [PartIterables](#partiterable) which represents the result of some method-specic algorithm for choosing split points in a `source`. Parts are non-overlapping, and the ordering of values is maintained from `source`. While a parts iterable yields multiple part iterables, only one part -- the most recently taken -- can be active at a time. Trying to take values from a part which is not active will trigger an error. Working around this limitation is simple when needed, you just need to store the parts as they are generated. This can be done with `map(toArray, partsIterable)`.

### PartIterable

An [Iterable](#iterable) iterator yielded from a [PartsIterable](#partsiterable). A `PartIterable` is stateful, meaning that you can only consume it once (and only before the next part becomes active).

### AsyncPartsIterable

The async version of a [PartsIterable](#partsiterable), which is to say an [AsyncResultIterable](#asyncresultiterable) of [AsyncPartIterables](#asyncpartiterable). As with `PartsIterabe`, only one part is active at a time.

### AsyncPartIterable

An [AsyncIterable](#asynciterable) iterator yielded from an [AsyncPartsIterable](#asyncpartsiterable). An `AsyncPartIterable` is stateful, meaning that you can only consume it once (and only before the next part becomes active).

### Comparator

A comparator is used to determine sort order. Comparators in iter-tools exactly match the comparator API expected by `Array.prototype.sort`. Comparators are always sync functions, even when sorting async iterables.

#### The Default Comparator

The default comparator is the same as that used by `Array.prototype.sort`:
```js
(a, b) => a > b ? 1 : b > a ? -1 : 0;
```
It will sort numbers by their value, and strings lexicographically.
