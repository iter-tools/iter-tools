Transform an async `entries` iterable (or a sync one) into an object. Each entry should be of the form `[key, value]`. An optional `prototype` will be passed to `Object.create` if specified.

```js
objectFromAsync(
  asyncWrap([
    ['droids', ['R2', '3PO']],
    [('people': ['Luke', 'Leia', 'Han'])],
  ]),
); // { droids: ['R2', '3PO'], people: ['Luke', 'Leia', 'Han'] }
await objectFromAsync(null); // []
```
