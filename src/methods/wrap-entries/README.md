Yields the items yielded by `entriesable.entries()`. When passed `null` or `undefined`, yields nothing.

<!-- prettier-ignore -->
```js
wrapEntries(new Map([
  ['foo', 'bar'],
  ['fox', 'far']
])); // Iterable[['foo', 'bar'], ['fox', 'far']]
```
