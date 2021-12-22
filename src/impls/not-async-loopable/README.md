Returns `true` if `value` is [notIterable](#notiterable) and [notAsyncIterable](#notasynciterable), otherwise `false`. When `notAsyncLoopable(value)`, using value as the subject of a `for await..of` loop will throw an error.

```js
notAsyncLoopable((async function* () {})()); // false
notAsyncLoopable((function* () {})()); // false
notAsyncLoopable([]); // false
notAsyncLoopable(undefined); // true
notAsyncLoopable(null); // true
notAsyncLoopable({}); // true
```
