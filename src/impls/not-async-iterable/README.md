Returns `false` if `value` has a `Symbol.asyncIterator` property and `true` otherwise. Type-safe in typescript.

```js
notAsyncIterable((async function* () {})()); // false
notAsyncIterable((function* () {})()); // true
notAsyncIterable([]); // true
notAsyncIterable({}); // true
notAsyncIterable(undefined); // true
notAsyncIterable(null); // true
```
