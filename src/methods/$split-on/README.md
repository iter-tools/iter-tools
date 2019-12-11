Yields a [PartsIterable](#partsiterable) of parts from `source`, where `separatorValue` is used to mark the boundary between parts in `source`. `separatorValue` will not occur in the output. `separatorValue` is compared using `===`.

```js
splitOn(null, [1, null, 2, null, 3]); // Iterable[[1], [2], [3]]
```
