Defaults:

- `same`: `Object.is`

Yields a [PartsIterable](#partsiterable) of parts from `source`, where `separatorSeq` is used to mark the boundary between parts in `source`. When `separatorSeq` is matched, all matched values are consumed from `source`. They will not appear in any `part`, nor may they be part of any other `separatorSeq` match. Two values are considered to be the same if the result of `same(a, b)` is truthy.

```js
splitOnSeq([0, 0], [1, 0, 0, 2, 0, 0, 3]); // Iterable[[1], [2], [3]]

//`separatorSeq` is in the result because separators overlap in `source`.
splitOnSeq([0, 0], [0, 0, 0, 1, 2]); // Iterable[[], [0, 1, 2]]
```
