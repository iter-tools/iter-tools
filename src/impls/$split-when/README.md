Yields a [PartsIterable](#partsiterable) of parts from `source`, a `value` from `source` for which the result of `predicate(value, idx)` is truthy is considered a separator, and will not occur in the output.

<!-- prettier-ignore -->
```js
splitWhen(
  x => x == null,
  [1, null, 2, undefined, 3]
); // Iterable[Iterable[1], Iterable[2], Iterable[3]]
splitWhen(',', 'foo,bar,baz'); // Iterable['foo', 'bar', 'baz']
splitWhen(/, /, 'foo, bar, baz'); // Iterable['foo', 'bar', 'baz']
```
