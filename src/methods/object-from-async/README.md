Transform an async `entries` iterable (or a sync one) into an object. Each entry should be of the form `[key, value]`.

```js
objectFromAsync(
  asyncWrap([
    ['droids', ['R2', '3PO']],
    [('people': ['Luke', 'Leia', 'Han'])],
  ]),
); // { droids: ['R2', '3PO'], people: ['Luke', 'Leia', 'Han'] }
await objectFromAsync(null); // []
```
