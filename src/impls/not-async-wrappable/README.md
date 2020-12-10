Returns `false` if `value` [isAsyncIterable](#isasynciterable), [isIterable](#isiterable), or [isNil](#isnil) (and `true` otherwise). When `notAsyncWrappable(value)`, passing `value` to [asyncWrap](#asyncwrap) (or any other method which expects a [AsyncWrappable](#asyncWrappable)) will throw an error.

```js
notAsyncWrappable([]); // false
notAsyncWrappable(undefined); // false
notAsyncWrappable(null); // false
notAsyncWrappable((function* () {})()); // false
notAsyncWrappable((async function* () {})()); // false
notAsyncWrappable({}); // true
notAsyncWrappable(4); // true
```
