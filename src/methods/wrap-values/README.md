Yields the items yielded by `valuesable.values()`. When passed `null` or `undefined`, yields nothing.

<!-- prettier-ignore -->
```js
wrapValues(new Map([
  ['foo', 'bar'],
  ['fox', 'far']
])); // Iterable['bar', 'far']
```
