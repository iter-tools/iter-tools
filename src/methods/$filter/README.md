Yields only values from `source` for which the result of `predicate(value, idx)` is truthy. Equivalent to `Array.prototype.filter`.

```js
filter(isEven, range(4)); // Iterable[0, 2]
filter(animal => animal.kind.slice(1) === 'at', [
  { type: 'cat' },
  { type: 'rat' },
  { type: 'dog' },
]); // Iterable[{type: 'cat'}, {type: 'rat'}]
```
