Defaults:

- `same`: `Object.is`

Yields a [PartsIterable](#partsiterable) of parts from `source`, where `separatorValues` are used to mark the boundary between parts in `source`. None of the `separatorValues` will not occur in the output. Two values are considered to be the same if the result of `same(a, b)` is truthy.

```js
splitOnAny([null, undefined], [1, null, 2, undefined, 3]); // Iterable[[1], [2], [3]]
```

Note: If `source` is a string you should instead use [splitOnAnySeq](#splitonanyseq). A warning will be emitted if you do not.
