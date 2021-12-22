Returns `!Array.isArray(value)`. Type-safe in typescript.

```js
notArray(4); // true
notArray(undefined); // true
notArray(['foo']); // false
notArray([]); // false
```
