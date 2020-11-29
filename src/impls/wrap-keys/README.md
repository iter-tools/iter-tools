Yields the values yielded by `keysable.keys()`. When passed `null` or `undefined`, yields nothing.

<!-- prettier-ignore -->
```js
wrapKeys(new Map([
  ['foo', 'bar'],
  ['fox', 'far']
])); // Iterable['foo', 'fox']
```
