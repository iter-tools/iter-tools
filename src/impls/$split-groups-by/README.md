Yields a [PartsIterable](#partsiterable) of [`key`, `group`] pairs from `source`, where `group` is a subsequence of `values` from `source` for which every `value` has the same `key` as returned by `getKey(value, idx)` (as compared with `===`).

```js
splitGroupsBy(Math.abs, [1, 1, -1, -1, 4, -1]);
// Iterable [
//   [1, Iterable[1, 1, -1, -1]]
//   [4, Iterable[4]]
//   [1, Iterable[-1]]
// ]
```
