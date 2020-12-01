Returns `false` if `value` is iterable (has a `Symbol.iterator` property) and `true` otherwise. For more details see the method's inverse: [isIterable](#isiterable). Type-safe in typescript.

```js
notIterable({}); // true
notIterable(undefined); // true
notIterable(null); // true
notIterable((function* () {})()); // false
notIterable([]); // false
```
