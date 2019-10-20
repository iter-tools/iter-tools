Returns the string names of the own properties of `obj`. When `obj` is `null` or `undefined` it yields nothing, but it is otherwise equivalent to `Object.keys`.

```js
keys({ foo: 'bar', fox: 'far' }); // Iterable['foo', 'fox'];
```
