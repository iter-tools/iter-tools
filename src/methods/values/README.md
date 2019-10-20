Returns the values of own properies of `obj`. When `obj` is `null` or `undefined` it yields nothing, but it is otherwise equivalent to `Object.values`.

```js
values({ foo: 'bar', fox: 'far' }); // Iterable['bar', 'far']
```
