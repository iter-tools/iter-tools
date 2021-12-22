Returns `true` if `value` [notAsyncIterable](#notasynciterable), [notIterable](#notiterable), and [notNil](#notnil) (and `false` otherwise). When `notAsyncWrappable(value)`, passing `value` to [asyncWrap](#asyncwrap) (or any other method which expects a [AsyncWrappable](#asyncWrappable)) will throw an error.

```js
notAsyncWrappable([]); // false
notAsyncWrappable(undefined); // false
notAsyncWrappable(null); // false
notAsyncWrappable((function* () {})()); // false
notAsyncWrappable((async function* () {})()); // false
notAsyncWrappable({}); // true
notAsyncWrappable(4); // true
```
