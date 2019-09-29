Transform an iterable to an array. arrayFrom is implemented as `Array.from`. It is included for consistency since `Array.from` has no counterpart for use with async iterators.

```js
arrayFrom(slice(0, 3, range())); // [1, 2, 3]
arrayFrom(null); // []
```
