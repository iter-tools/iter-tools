Yields `[key, group]` pairs, where `key` is a result of `getKey(value, idx)` and `group` is a subsequence of adjacent values from `source` which share the same `key` (as compared with `===`).

```js
groupBy(Math.abs, [1, 1, -1, -1, 4, -1]);
// Iterable [
//   [1, Iterable[1, 1, -1, -1]]
//   [4, Iterable[4]]
//   [1, Iterable[-1]]
// ]
```
