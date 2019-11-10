Yields `part` subsequences of values from `source`, generating a new `part` each time the result of `predicate(value, idx)` is truthy. Values which match the `predicate` are consumed, and will not be in any `part`.

You may also specify a regex predicate, in which case the behavior will match `str.split(RegExp)`. This is the only situation in which you will be able to match more than one value from `source` at a time.

<!-- prettier-ignore -->
```js
splitWith(
  x => x == null,
  [1, null, 2, undefined, 3]
); // Iterable[Iterable[1], Iterable[2], Iterable[3]]
splitWith(',', 'foo,bar,baz'); // Iterable['foo', 'bar', 'baz']
splitWith(/, /, 'foo, bar, baz'); // Iterable['foo', 'bar', 'baz']
```
