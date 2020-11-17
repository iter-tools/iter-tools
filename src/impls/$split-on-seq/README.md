Yields a [PartsIterable](#partsiterable) of parts from `source`, where `separatorSeq` is used to mark the boundary between parts in `source`. When `separatorSeq` is matched, all matched values are consumed from `source`. They will not appear in any `part`, nor may they be part of any other `separatorSeq` match. Each value in `separatorSeq` is compared using `===`.

```js
splitOnSeq([0, 0], [1, 0, 0, 2, 0, 0, 3]); // Iterable[[1], [2], [3]]

//`separatorSeq` is in the result because separators overlap in `source`.
splitOnSeq([0, 0], [0, 0, 0, 1, 2]); // Iterable[[], [0, 1, 2]]
```
