Returns `true` if `value` [isAsyncIterable](#isasynciterable), [isIterable](#isiterable), or [isNil](#isnil) (and `false` otherwise). When `isAsyncWrappable(value)`, it is safe to pass value to [asyncWrap](#asyncwrap) as well as other methods that take an [AsyncSourceIterable](#asyncsourceiterable), which is usually named `iterable` or `source`. Type-safe in typescript.

```js
isAsyncWrappable((async function* () {})()); // true
isAsyncWrappable((function* () {})()); // true
isAsyncWrappable([]); // true
isAsyncWrappable(undefined); // true
isAsyncWrappable(null); // true
isAsyncWrappable({}); // false
isAsyncWrappable(4); // false
```
