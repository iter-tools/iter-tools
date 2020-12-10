Returns `true` if `value` [isIterable](#isiterable) or `value` [isNil](#isnil) (and `false` otherwise). When `isWrappable(value)`, it is safe to pass value to [wrap](#wrap) (and any other method which exepects a [Wrappable](#Wrappable)). Type-safe in typescript.

```js
isWrappable([]); // true
isWrappable(undefined); // true
isWrappable(null); // true
isWrappable({}); // false
```
