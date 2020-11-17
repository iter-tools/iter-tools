Yields the `[key, value]` entries of own, iterable (in the object sense) properties of `obj`. When `obj` is `null` or `undefined` it yields nothing, but it is otherwise equivalent to `Object.keys`.

`objectEntries` is a great way to construct `Map` instances from objects!

```js
objectEntries({ foo: 'bar', fox: 'far' }); // Iterable[['foo': 'bar'], ['fox': 'far']]
new Map(objectEntries(obj)); // Map{foo => 'bar', fox => 'far'}
```
