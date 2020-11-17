Returns `true` if the values in `iterable` are sorted in ascending order according to `comparator`, and `false` otherwise.

```js
isSorted([1, 2, 3]); // true
isSorted((a, b) => b - a, [3, 2, 1]); // true
```
