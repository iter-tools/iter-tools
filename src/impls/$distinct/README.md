Yields only the first occurrance of each value from `source`. An optional `selector` can be used to specify a transform function which returns a key to distinguish the values.

```js
distinct([1, 2, 3, 2]); // Iterable[1, 2, 3]
distinct((x) => x[0], ['apple', 'apricot', 'blueberry']); // Iterable['apple', 'blueberry']
```
