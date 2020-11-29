Defaults:

- `comparator`: [default comparator](#the-default-comparator)

Returns `n` values from `source`, sorted in ascending order according to `comparator`. The function is both space efficient (only stores `n` values) and fast (`O(m log n)`), given `m` as the total number of values in `iterable`. It uses a heap internally.

```js
takeSorted(3, [4, 5, 2, 3, 1]); // Iterable[1, 2, 3]
takeSorted([4, 5, 2, 3, 1]); // Iterable[1, 2, 3, 4, 5]
takeSorted(3, (a, b) => b - a, [4, 5, 2, 3, 1]); // Iterable[5, 4, 3]
```
