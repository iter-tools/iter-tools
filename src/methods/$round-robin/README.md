Defaults:

- `start`: `0`
- `step`: `1`

Combines values from each `source` in `sources` into a single iterable, peserving the ordering of values within each `source`. First yields a value from the `source` with index `start`, then one from the `source` with index `start + step`, and so on, wrapping the indexes of sources using `% sources.length`.

```js
roundRobin([1, 3, 5], [2, 4, 6]); // Iterable[1, 2, 3, 4, 5, 6]
roundRobin(2, [1, 4], [3, 6], [2, 5]); // Iterable[1, 2, 3, 4, 5, 6]
roundRobin({ start: 1, step: 1 }, [2, 4, 6], [1, 3, 5]); // Iterable[1, 2, 3, 4, 5, 6]
```
