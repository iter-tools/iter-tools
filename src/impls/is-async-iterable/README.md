Returns `true` if `value` has a `Symbol.asyncIterator` property and `false` otherwise. Type-safe in typescript.

```js
isAsyncIterable((async function* () {})()); // true
isAsyncIterable((function* () {})()); // false
isAsyncIterable([]); // false
isAsyncIterable({}); // false
isAsyncIterable(undefined); // false
isAsyncIterable(null); // false
```
