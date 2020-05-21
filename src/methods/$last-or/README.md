Returns the last value from `iterable`, or `whenEmpty` when `iterable` is empty.

Performance note: this requires consuming the entire iterable. If `iterable` is an array this method will do a lot of unnecessary work compared to `arrayLastOr(array, whenEmpty)`.

```js
lastOr(0, [1, 2, 3]); // 3
lastOr(0, []); // 0
```
