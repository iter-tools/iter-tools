Returns the last value from `iterable`, or `undefined` when `iterable` is empty.

Performance note: this requires consuming the entire iterable. If `iterable` is an array this method will do a lot of unnecessary work compared to `arrayLast(array)`.

```js
last([1, 2, 3]); // 3
last([]); // undefined
```
