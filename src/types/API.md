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

An [Iterable](#iterable) which is also an iterator, which is to say that it has `next()`, `throw(error)`, and `return(value)` methods. It can be evaluated multiple times calling its `[Symbol.iterator]()` method repeatedly. Note that there is no guarantee that evaluating a result iterable more than once will produce the same items, unless the source iterable makes that guarantee.

### AsyncResultIterable

The async version of a [result iterable](#resultiterable). Instead of working as an [Iterable](#iterable) and an iterator, it behaves like an [AsyncIterable](#asynciterable) and an async iterator. The same caveats apply regarding evaluating this kind of result iterable more than once.
