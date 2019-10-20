Yields the items yielded by `keysable.keys()`. When passed `null` or `undefined`, yields nothing.

```js
// prettier-ignore
wrapKeys(new Map([
  ['foo', 'bar'],
  ['fox', 'far']
])); // Iterable['foo', 'fox']
```
