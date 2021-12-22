Returns `true` if `typeof value` is not `'string'` and `false` otherwise. Type-safe in typescript.

```js
notString(4); // true
notString(undefined); // true
notString('foo'); // false
notString(''); // false
```
