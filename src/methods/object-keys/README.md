Yields the string names of the own, iterable (in the object sense) properties of `obj`. When `obj` is `null` or `undefined` it yields nothing, but it is otherwise equivalent to `Object.keys`.

```js
objectKeys({ foo: 'bar', fox: 'far' }); // Iterable['foo', 'fox'];
```
