Defaults:

- `same`: `Object.is`

Yields a [PartsIterable](#partsiterable) of parts from `source`, where `separatorValue` is used to mark the boundary between parts in `source`. `separatorValue` will not occur in the output. Two values are considered to be the same if the result of `same(a, b)` is truthy.

```js
splitOn(null, [1, null, 2, null, 3]); // Iterable[[1], [2], [3]]
```

Note: If `source` is a string you should instead use [splitOnSeq](#splitonseq). A warning will be emitted if you do not.
