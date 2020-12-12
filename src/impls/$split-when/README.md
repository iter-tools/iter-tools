Yields a [PartsIterable](#partsiterable) of parts from `source`, a `value` from `source` for which the result of `predicate(value, idx)` is truthy is considered a separator, and will not occur in the output. If `source` is a string you may also specify a regex predicate, in which case the behavior will match `str.split(RegExp)`. This is the only situation in which you will be able to match more than one value from `source` at a time.

<!-- prettier-ignore -->
```js
splitWhen(
  x => x == null,
  [1, null, 2, undefined, 3]
); // Iterable[Iterable[1], Iterable[2], Iterable[3]]
splitWhen(',', 'foo,bar,baz'); // Iterable['foo', 'bar', 'baz']
splitWhen(/, /, 'foo, bar, baz'); // Iterable['foo', 'bar', 'baz']
```
