Yields only the first occurrance of each value from `source`. An optional `selector` can be used to specify a transform function which returns a key to distinguish the values.

```js
distinct([3, 1, 4, 1, 5, 9, 2, 6, 5, 3]); // Iterable[3, 1, 4, 5, 9, 2, 6]
distinct((x) => x % 7, [14, 21, 9, 777]); // Iterable[0, 2]
```
