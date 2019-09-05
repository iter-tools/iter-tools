It expects to receive an iterable of iterables to be joined, and a separator item. It yields all items of each joined iterable, with the separator in between. It is the inverse of `splitWith`.

```js
joinWith(null, [[1], [2], [3]]) // Iterable[1, null, 2, null, 3]
```
