Yields the items in its source iterable. Its main purposes include allowing potentially null iterables to be treated as non-null iterables, and to give non-iter-tools iterables iter-tools iterable semantics.
```js
const maybeIterable = Math.random() > 0.5 ? [1, 2, 3] : null;

[...wrap(maybeIterable)]; // [1, 2, 3] OR []
```

Async notes:
 -  Turns sync iterables into async iterables.
 -  Ensures async next queueing semantics
