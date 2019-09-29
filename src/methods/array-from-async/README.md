Transform an async iterable to an array.

```js
await arrayFromAsync(asyncWrap(slice(0, 3, range()))); // [1, 2, 3]
await arrayFromAsync(null); // []
```
