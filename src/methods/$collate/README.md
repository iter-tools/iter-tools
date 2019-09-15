Collate takes multiple iterables and collates them in a single one. The manner or collation can be chosen by specifying either a number or a comparator function.

If a comparator function is specified, collate will compare the items available at the head of each iterable and pick the one which would be sorted to the lowest index. The comparator `(a, b) => { return -1 }` would indicate that a is always preferable to b. This is the same behavior comparators have when used in `Array.prototype.sort`.

If a number `n` is specified, collate will do a round-robin collation. This type of collation is parameterized on `start` and `step`. `collate` will first take from the `start` iterable, and will, next take from the `start + step` iterable, wrapping around back to the beginning if there are not that many iterables.

If no parameter is given the default is a round robin collation with a `start` of 0 and a `step` of one.
```js
collate([1, 3, 5], [2, 4, 6]) // 1, 2, 3, 4, 5, 6
collate(2, [1, 4], [3, 6], [2, 5]) // 1, 2, 3, 4, 5, 6
collate({ start: 1, step: 1 }, [2, 4, 6], [1, 3, 5]) // 1, 2, 3, 4, 5, 6
collate((a, b) => a - b, [1, 2, 5, 6], [3, 4]) // 1, 2, 3, 4, 5, 6
```
You can also curry it:
```js
collate((a, b) => a - b)([[1, 2, 5, 6], [3, 4]]) // 1, 2, 3, 4, 5, 6
```
