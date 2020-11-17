Returns the number of values in `iterable` **by iterating over it**. This is more work than is neccessary for any concrete type like `Array`, `Map`, or `Set`. If you know your data is one of those types, use [getSize](#getsize) instead.

```js
size([1, 2, 3]); // 3
```
