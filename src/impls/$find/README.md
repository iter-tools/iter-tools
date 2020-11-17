Returns the first item in `iterable` for which `predicate(item, idx)` returns a truthy value. It is the equivalent of `Array.prototype.find`.

```js
find((animal) => animal.kind === 'dog', [
  { type: 'cat' },
  { type: 'dog' },
]); // {type: 'dog'}
```
