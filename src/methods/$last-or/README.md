Returns the last value from `iterable`, or `whenEmpty` when `iterable` is empty. If `iterable` is not an array, this requires traversing the whole iterable.

```js
lastOr(0, [1, 2, 3]); // 3
lastOr(0, []); // 0
```
