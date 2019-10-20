Yields the items yielded by `entriesable.entries()`. When passed `null` or `undefined`, yields nothing.

```js
// prettier-ignore
wrapEntries(new Map([
  ['foo', 'bar'],
  ['fox', 'far']
])); // Iterable[['foo', 'bar'], ['fox', 'far']]
```
