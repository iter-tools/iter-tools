See [wrap](#wrap)

Also turns sync iterables into async iterables and ensures async `next()` queueing semantics.

```js
await asyncWrap([1, 2, 3])[Symbol.asyncIterator]().next(); // { value: 1, done: false }
```
