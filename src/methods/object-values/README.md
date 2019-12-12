Yields the values of own, iterable (in the object sense) properies of `obj`. When `obj` is `null` or `undefined` it yields nothing, but it is otherwise equivalent to `Object.values`.

```js
objectValues({ foo: 'bar', fox: 'far' }); // Iterable['bar', 'far']
```
