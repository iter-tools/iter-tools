Transform `source` into an array. Roughly equivalent to `Array.from`, except that it turns `null` and `undefined` into `[]`. Since arrays are iterable, this method can also be thought of as a way to cache all values in an iterable.

```js
arrayFrom(slice(0, 3, range())); // [1, 2, 3]
arrayFrom(null); // []
```
