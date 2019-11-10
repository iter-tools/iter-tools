Yields `part` subsequences of `source`, generating a new `part` each time it encounters a subsequence of values matching `separatorSubseq`. Each value in `separatorSubseq` must match using `===`. When `separatorSubseq` is matched, all matched values are consumed from `source`. They will not appear in any `part`, nor may they be part of any other `separatorSubseq` match.

```js
splitOnSubseq([0, 0], [1, 0, 0, 2, 0, 0, 3]); // Iterable[[1], [2], [3]]
splitOnSubseq([0, 0], [0, 0, 0, 1, 2]); // Iterable[[], [0, 1, 2]]
```
