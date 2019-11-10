Returns the number of values in `iterable` by iterating over it. Will optimize by reading the `length` property if `iterable` is an array, or `size` if it is a `Map` or `Set`.

Note: the optimizations on `Map` and `Set` are not guaranteed to trigger, in particular because the `instanceof` check can be fragile [in certain circumstances](https://stackoverflow.com/questions/49832187/how-to-understand-js-realms).

```js
size([1, 2, 3]); // 3
```
