Returns `true` if `value` has a `Symbol.asyncIterator` or `Symbol.iterator` property and `false` otherwise. If `isAsyncLoopable(value)` then `value` may be used as the subject of a `for await..of` loop. Type-safe in typescript.

```js
isAsyncLoopable((async function* () {})()); // true
isAsyncLoopable((function* () {})()); // true
isAsyncLoopable([]); // true
isAsyncLoopable({}); // false
isAsyncLoopable(undefined); // false
isAsyncLoopable(null); // false
```
