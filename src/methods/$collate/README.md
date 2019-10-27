Combines values from each `source` in `sources` into a single iterable, peserving the ordering of values within each `source`. Collate uses `comparator` to establish a partial ordering of items at the head of each `source`. At each step it yields the lowest value in the ordering then recomputes the ordering.

```js
collate([1, 2, 5, 6], [3, 4]); // Iterable[1, 2, 3, 4, 5, 6]
collate((a, b) => b - a, [6, 5, 2, 1], [4, 3]); // Iterable[6, 5, 4, 3, 2, 1]
```
