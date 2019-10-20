Returns the `[key, value]` entries of own properties of `obj`. When `obj` is `null` or `undefined` it yields nothing, but it is otherwise equivalent to `Object.keys`.

`entries` is a great way to construct `Map` instances from objects!

```js
entries({ foo: 'bar', fox: 'far' }); // Iterable[['foo': 'bar'], ['fox': 'far']]
new Map(entries(obj)); // Map{foo => 'bar', fox => 'far'}
```
