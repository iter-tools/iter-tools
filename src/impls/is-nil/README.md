Returns `true` if `value` is `null` or `undefined` and `false` otherwise. Type-safe in typescript.

```js
isNil(undefined); // true
isNil(null); // true
isNil(0); // false
isNil({}); // false
isNil(NaN); // false
```
