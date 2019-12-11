Yields a [PartsIterable](#partsiterable) of parts from `source`, where `separatorSubseq` is used to mark the boundary between parts in `source`. When `separatorSubseq` is matched, all matched values are consumed from `source`. They will not appear in any `part`, nor may they be part of any other `separatorSubseq` match. Each value in `separatorSubseq` is compared using `===`.

```js
splitOnSubseq([0, 0], [1, 0, 0, 2, 0, 0, 3]); // Iterable[[1], [2], [3]]

//`separatorSubseq` is in the result because separators overlap in `source`.
splitOnSubseq([0, 0], [0, 0, 0, 1, 2]); // Iterable[[], [0, 1, 2]]
```
