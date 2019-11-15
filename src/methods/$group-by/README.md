Yields `[key, group]` pairs, where `key` is a result of `getKey(value, idx)` and `group` is a subsequence of adjacent values from `source` which share the same `key` (as compared with `===`).

Note that you can iterate over just the keys or just the values using the `keys()` and `values()` iterators (or [getKeys](#getkeys) and [getValues](#getvalues) methods).

```js
const groups = groupBy(Math.abs, [1, 1, -1, -1, 4, -1]);
// Iterable [
//   [1, Iterable[1, 1, -1, -1]]
//   [4, Iterable[4]]
//   [1, Iterable[-1]]
// ]
groups.keys();
// Iterable[1, 4, 1]
groups.values();
// Iterable[
//   Iterable[1, 1, -1, -1]
//   Iterable[4]
//   Iterable[-1]
// ]
```
