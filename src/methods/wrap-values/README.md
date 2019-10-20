Yields the items yielded by `valuesable.values()`. When passed `null` or `undefined`, yields nothing.

```js
// prettier-ignore
wrapValues(new Map([
  ['foo', 'bar'],
  ['fox', 'far']
])); // Iterable['bar', 'far']
```
