Transforms an `entries` iterable into an object. Each entry should be of the form `[key, value]`. Roughly equivalent to `Object.fromEntries`, except that it turns `null` and `undefined` into `{}`. An optional `prototype` will be passed to `Object.create` if specified.

```js
objectFrom([
  ['droids', ['R2', '3PO']],
  ['people', ['Luke', 'Leia', 'Han']],
]); // { droids: ['R2', '3PO'], people: ['Luke', 'Leia', 'Han'] }
objectFrom(null); // {}
```
