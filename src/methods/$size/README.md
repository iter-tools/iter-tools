Returns the number of values in `iterable` by iterating over it. Will optimize by reading the `length` property if `iterable` is an array, or `size` if it is a `Map`, `Set` or some other type which has a `size` getter in its prototype chain. `size` will not access the `length` property on typed arrays, such as `Int8Array`.

```js
size([1, 2, 3]); // 3 (by accessing length)
size(new Set([1, 2, 3])); // 3 (by accessing size)
size(wrap([1, 2, 3])); // 3 (by iteration)
size(wrap(new Int8Array([1, 2, 3]))); // 3 (by iteration)
```
