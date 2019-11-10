For each value in `source`, yields each value in `predicate(value, idx)`. Equivalent to `Array.prototype.flatMap`.

```js
flatMap(x => [x - 1, x], [1, 3, 5]); // Iterable[0, 1, 2, 3, 4, 5]
```
