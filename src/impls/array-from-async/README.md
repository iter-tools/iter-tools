Transform an async `source` into an array. Since arrays are valid inputs to async methods, can also be thought of as a way to cache all values in an async iterable.

```js
await arrayFromAsync(asyncWrap(slice(0, 3, range()))); // [1, 2, 3]
await arrayFromAsync(null); // []
```
